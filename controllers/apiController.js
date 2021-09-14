const Attendant = require("../model/Attendant");
const Employee = require("../model/Employee");
const moment = require("moment");

module.exports = {
  absen: async (req, res) => {
    try {
      const { username, keterangan } = req.body;

      // Find Employee
      const employee = await Employee.findOne({ username: username });

      // Checking employee if exist or not
      if (!employee) {
        return res.status(422).json({ message: `User ${username} not found` });
      }

      // Init start of day
      const today = moment().startOf("day");

      // Find attendance exist or not for this day
      const attendance = await Attendant.find({
        employeeId: employee.id,
        date: {
          $gte: today,
          $lte: moment(today).endOf("day").toDate(),
        },
      });

      // Checking if attendance exist
      if (attendance.length > 0) {
        return res.status(405).json({ message: `Sudah melakukan absen` });
      }

      // Create new attendance record
      const attendant = await Attendant.create({
        status: keterangan.toLowerCase(),
        employeeId: employee.id,
      });

      // Push new attendant id to employee fid column
      employee.attendantId.push({ _id: attendant._id });

      // Saving
      await employee.save();

      // return success response
      return res.status(201).json({ message: "Absensi Sukses", attendant });
    } catch (error) {
      // if error return error response
      return res.status(500).json({ message: "Internal Server Error", error });
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
            { $sort: { _id: 1 } },
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
        return;
      }
      if (result) {
        res.status(200).json({ message: "Success Getting Data", result });
        return;
      }
    });
  },
  laporanCustom: (req, res) => {
    const keterangan = req.params.keterangan;

    if (keterangan === "telat") {
      Employee.aggregate([
        {
          $lookup: {
            from: "attendants",
            let: { employeeId: "$_id" },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ["$employeeId", "$$employeeId"] } },
                    { status: "hadir" },
                  ],
                },
              },
              {
                $project: {
                  status: 1,
                  tanggal: {
                    $dateToString: {
                      date: { $add: ["$date", 7 * 60 * 60 * 1000] },
                      format: "%Y-%m-%d",
                    },
                  },
                  waktu: {
                    $dateToString: {
                      date: { $add: ["$date", 7 * 60 * 60 * 1000] },
                      format: "%H:%M",
                    },
                  },
                },
              },
              {
                $match: { waktu: { $gte: "08:01", $lte: "24:00" } },
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
            absensi: "$jumlah",
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
      return;
    }

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
            {
              $project: {
                status: 1,
                tanggal: {
                  $dateToString: {
                    date: { $add: ["$date", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d",
                  },
                },
                waktu: {
                  $dateToString: {
                    date: { $add: ["$date", 7 * 60 * 60 * 1000] },
                    format: "%H:%M",
                  },
                },
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
          absensi: "$jumlah",
        },
      },
    ]).exec((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error", err });
      }
      if (result) {
        return res
          .status(200)
          .json({ message: "Success Getting Data", result });
      }
    });
  },

  detail: (req, res) => {
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
              $project: {
                _id: 1,
                status: 1,
                date: {
                  $dateToString: {
                    date: { $add: ["$date", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d %H:%M:%S",
                  },
                },
              },
            },
            {
              $sort: { date: 1 },
            },
          ],
          as: "absensi",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          absensi: 1,
        },
      },
    ]).exec((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error", err });
      }
      if (result) {
        return res
          .status(200)
          .json({ message: "Success Getting Data", result });
      }
    });
  },
};
