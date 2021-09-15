const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.post("/absen", apiController.absen);
router.post("/user/add", apiController.addUser);
router.get("/laporan", apiController.laporan);
router.get("/laporan/:keterangan", apiController.laporanCustom);
router.get("/detail", apiController.detail);

module.exports = router;
