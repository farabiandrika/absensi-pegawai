const Attendant = require("../model/Attendant");
const Employee = require("../model/Employee");

module.exports = {
    absen: async (req,res) => {      
        try {
            const { username, keterangan } = req.body;    
            const employee = await Employee.findOne({username: username});    
            if (!employee || !(keterangan.toLowerCase() == 'hadir' || keterangan.toLowerCase() == 'cuti' || keterangan.toLowerCase() == 'izin')) {        
                res.status(422).json({ message: "Something went wrong"});
            }
            const attendant = await Attendant.create({
                status: keterangan.toLowerCase(),
                employeeId: employee.id
            })
    
            employee.attendantId.push({ _id: attendant._id });
            await employee.save()
    
            res.status(201).json({ message: "Absensi Sukses", attendant });   
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" }); 
        }    
    },
    laporan: (req,res) => {
        Employee.aggregate([
            {
                $lookup: {
                    from: "attendants",
                    let: {employeeId: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{$eq:['$employeeId', '$$employeeId']},
                                status: 'hadir'
                            }
                        }
                    ],                    
                    as: "hadir",
                }
            },
            {
                $lookup: {
                    from: "attendants",
                    let: {employeeId: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{$eq:['$employeeId', '$$employeeId']},
                                status: 'izin'
                            }
                        }
                    ],                    
                    as: "izin",
                }
            },
            {
                $lookup: {
                    from: "attendants",
                    let: {employeeId: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{$eq:['$employeeId', '$$employeeId']},
                                status: 'cuti'
                            }
                        }
                    ],                    
                    as: "cuti",
                }
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    name: 1,
                    jumlah_hadir: {"$size":"$hadir"},
                    jumlah_izin : {"$size":"$izin"},
                    jumlah_cuti : {"$size":"$cuti"},
                }
            }
        ]).exec((err,result) => {
            if (err) {
                res.status(500).json({ message: "Error", err });                 
            }
            if (result) {
                res.status(200).json({ message: "Success Getting Data", result });                 
            }
        })
    },
    laporanCustom: (req,res) => {
        const keterangan = req.params.keterangan

        if (!(keterangan.toLowerCase() == 'hadir' || keterangan.toLowerCase() == 'cuti' || keterangan.toLowerCase() == 'izin')) {
            res.status(500).json({ message: "Internal Server Error" });                         
        }

        Employee.aggregate([
            {
                $lookup: {
                    from: "attendants",
                    let: {employeeId: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr:{$eq:['$employeeId', '$$employeeId']},
                                status: keterangan
                            }
                        }
                    ],                    
                    as: 'jumlah',
                }
            },        
            {
                $project: {
                    _id: 1,
                    username: 1,
                    name: 1,
                    jumlah: {"$size":"$jumlah"},
                }
            }
        ]).exec((err,result) => {
            if (err) {
                res.status(500).json({ message: "Error", err });                 
            }
            if (result) {
                res.status(200).json({ message: "Success Getting Data", result });                 
            }
        })
    },
};
