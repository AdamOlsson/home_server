const express = require("express");
const router = express.Router();

const elasticController = require("../controllers/elasticsearch");

router.get("/", elasticController.help);
//router.post("/". esController.post);
router.post("/", elasticController.post);

module.exports = router;