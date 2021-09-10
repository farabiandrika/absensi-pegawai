const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.post("/absen", apiController.absen);
router.get("/laporan", apiController.laporan);
router.get("/laporan/:keterangan", apiController.laporanCustom);

module.exports = router;