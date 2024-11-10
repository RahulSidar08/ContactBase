const express = require("express");
const router = express.Router();
const {getContact,getContactwithId, createContact,updateContact,deleteContact} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");


// router.get("/", getContact)
// router.get("/:id",getContactwithId);
// router.post("/",createContact);
// router.put("/:id",updateContact);
// router.delete("/:id",deleteContact);

router.use(validateToken)
router.get("/", getContact).post("/",createContact);
router.get("/:id",getContactwithId).put("/:id",updateContact).delete("/:id",deleteContact);

module.exports = router;

