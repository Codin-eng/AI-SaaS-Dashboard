const express = require("express");

const {
  generateInsights,
} = require("../ai/ai.controller");

const 
  protect
 = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/insights",
  protect,
  generateInsights
);

module.exports = router;