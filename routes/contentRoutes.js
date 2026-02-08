// backend/routes/contentRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/contentController");

// Standardized tourism endpoints
router.get("/:type", controller.getAll);
router.post("/:type", controller.createOne);
router.put("/:type/:id", controller.updateOne);
router.delete("/:type/:id", controller.deleteOne);

module.exports = router;