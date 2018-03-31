const express = require("express");
const router = express.Router();

const testController = require("../controllers/test");

router.get("/", testController.get_test);

module.exports = router;