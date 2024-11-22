const express = require("express");
const { route } = require("../routes/contactRoutes");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const contactmodel = require("../models/contactModel");

module.exports.getContact = asyncHandler(async function (req, res) {
  const allContacts = await contactmodel.find({user_id:req.user.id});
  res.send(allContacts);
});

module.exports.getContactwithId = asyncHandler(async function (req, res) {
  const cont = await contactmodel.findById(req.params.id);
  if (!cont) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(cont);
});

module.exports.createContact = asyncHandler(async function (req, res) {
  let { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory!");
  }
  let createdContact = await contactmodel.findOne({ email });
  if (createdContact) {
    res.status(201).json({ message: "contact already created" });
    return;
  }
  let contact = await contactmodel.create({
    user_id: req.user.id,
    name,
    email,
    phone
  });
  res.status(201).json(contact);
});

module.exports.updateContact = asyncHandler(async function (req, res) {
  let contact = await contactmodel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id)
  {
    res.status(403)
    throw new Error("User dont have permission to access other user contact")
  }

  const updatedContact = await contactmodel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

module.exports.deleteContact = asyncHandler(async function (req, res) {
  let contact = await contactmodel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id)
    {
      res.status(403)
      throw new Error("User dont have permission to access other user contact")
    }

  await contactmodel.deleteOne({_id:req.params.id});
  res.status(200).json(contact);
});


