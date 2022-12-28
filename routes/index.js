const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');


router.get("/", homeController.home);

router.post("/upload", homeController.uploadFile);

router.get("/data/:csv", homeController.getData);


module.exports = router;