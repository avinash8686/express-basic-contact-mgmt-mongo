const Contacts = require("../model/Contacts");

// Fn for get api
const getContacts = async (req, res) => {
  try {
    const todos = await Contacts.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fn for posts api
const createAContact = async (req, res) => {
  try {
    const contact = await Contacts.find({
      phone: req.body.phone,
    });
    if (contact.length > 0) throw Error("Contact exists already!");
    const newContact = Contacts.create({
      name: req.body.name,
      phone: req.body.phone,
      user: req.user._id,
    });
    if (!newContact) throw Error("Something went wrong while saving the post");
    res.status(200).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fn for delete api
const deleteAContact = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) throw Error("Something went wrong while deleting the post");
    const deletedTodo = await Contacts.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fn for update
const updateAContact = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) throw Error("Something went wrong while updating the post");
    const updatedTodo = await Contacts.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  createAContact,
  deleteAContact,
  updateAContact,
};
