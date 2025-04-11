const express = require("express");
const router = express.Router();

router.get("http://localhost:5000/home",homeController);
router.get("http://localhost:5000/commercial",commercialController);
router.get("http://localhost:5000/hospitality",hospitallityController);

router.get("http://localhost:5000/home/:id",homeController);
router.get("http://localhost:5000/commercial/:id",commercialController);
router.get("http://localhost:5000/hospitality/:id",hospitallityController);

router.add("http://localhost:5000/home",addHome);
router.add("http://localhost:5000/home",addCommercial);
router.add("http://localhost:5000/home",addHospitality);

router.put("http://localhost:5000/home/:id",deleteHome);
router.put("http://localhost:5000/home/:id",deleteCommercial);
router.put("http://localhost:5000/home/:id",deleteHospitality);



module.exports = router; 