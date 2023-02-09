const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');


router.get("/", homeController.home);

router.post("/upload", homeController.uploadFile);

router.delete('/delete/:filename', homeController.deleteFile);

router.get("/data/:csv", homeController.getData);


module.exports = router;