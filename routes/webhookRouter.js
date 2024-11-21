const express = require("express");
const router = express.Router();
const fbController = require("../controllers/facebookController");

router.get("/facebook", fbController.getFbWebhook);
router.post("/facebook", fbController.postFbWebhook);

module.exports = router;
