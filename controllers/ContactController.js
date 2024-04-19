const ContactModel = require("../models/ContactModel");
const { responseReturn } = require("../utiles/response");

class ContactController {
  async AddContact(req, res) {
    try {
      const { name, email, phone, address, picture } = req.body;
      if (!name || !phone || !address || !picture) {
        return res
          .status(400)
          .json({ error: "name and phone, address,picture are required" });
      }
      const newTask = new ContactModel({
        name,
        email,
        phone,
        address,
        picture,
      });

      const savedTask = await newTask.save();

      res.status(201).json(savedTask);
    } catch (error) {
      console.error("Error creating Contact:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getContact(req, res) {
    const { page = 1, searchValue, parPage = 5 } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    const tasksQuery = {};
    if (searchValue) {
      tasksQuery.$or = [
        { name: { $regex: searchValue, $options: "i" } },
        { email: { $regex: searchValue, $options: "i" } },
        { phone: { $regex: searchValue, $options: "i" } },
        { address: { $regex: searchValue, $options: "i" } },
      ];
    }

    try {
      const tasks = await ContactModel.find(tasksQuery)
        .skip(skipPage)
        .limit(parPage)
        .sort({ createdAt: -1 });
      const totalTasks = await ContactModel.countDocuments(tasksQuery);
      responseReturn(res, 200, { totalTasks, tasks });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  }

  async getContactById(req, res) {
    try {
      const contactId = req.params.id;
      const contact = await ContactModel.findById(contactId);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateContactById(req, res) {
    try {
      const contactId = req.params.id;
      const { name, email, phone, address, picture } = req.body;

      const contact = await ContactModel.findById(contactId);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      contact.address = address;
      contact.picture = picture;

      await contact.save();

      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteContact(req, res) {
    try {
      const id = req.params.id;

      const deletedContact = await ContactModel.findByIdAndDelete(id);

      if (!deletedContact) {
        return res
          .status(404)
          .json({ status: "fail", message: "Contact not found" });
      }

      res.status(200).json({ status: "success", data: deletedContact });
    } catch (error) {
      res.status(500).json({ status: "fail", message: error.message });
    }
  }
}

module.exports = new ContactController();
