const express = require("express");
const router = express.Router();
const {
  getContacts,
  createAContact,
  deleteAContact,
  updateAContact,
} = require("../Controller/contacts");
const verify = require("../middleware/privateRoute");

router.get("/", verify, getContacts);
router.post("/", verify, createAContact);
router.delete("/:id", verify, deleteAContact);
router.put("/:id", verify, updateAContact);

module.exports = router;
