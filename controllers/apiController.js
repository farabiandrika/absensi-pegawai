const Attendant = require("../model/Attendant");
const Employee = require("../model/Employee");

module.exports = {
  absen: async (req, res) => {
    try {
      const { username, keterangan } = req.body;
      const employee = await Employee.findOne({ username: username });
      if (!employee) {
        res.status(422).json({ message: `User ${username} not found` });
      }
      const attendant = await Attendant.create({
        status: keterangan.toLowerCase(),
        employeeId: employee.id,
      });

      employee.attendantId.push({ _id: attendant._id });
      await employee.save();

      res.status(201).json({ message: "Absensi Sukses", attendant });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },
  laporan: (req, res) => {
    Employee.aggregate([
      {
        $lookup: {
          from: "attendants",
          let: { employeeId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$employeeId", "$$employeeId"] },
              },
            },
            {
              $group: { _id: "$status", jumlah: { $sum: 1 } },
            },
            { $sort: { status: 1 } },
          ],
          as: "absensi",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          absensi: "$absensi",
        },
      },
    ]).exec((err, result) => {
      if (err) {
        res.status(500).json({ message: "Error", err });
      }
      if (result) {
        res.status(200).json({ message: "Success Getting Data", result });
      }
    });
  },
  laporanCustom: (req, res) => {
    const keterangan = req.params.keterangan;

    Employee.aggregate([
      {
        $lookup: {
          from: "attendants",
          let: { employeeId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$employeeId", "$$employeeId"] },
                status: keterangan,
              },
            },
          ],
          as: "jumlah",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          jumlah: { $size: "$jumlah" },
        },
      },
    ]).exec((err, result) => {
      if (err) {
        res.status(500).json({ message: "Error", err });
      }
      if (result) {
        res.status(200).json({ message: "Success Getting Data", result });
      }
    });
  },
};
