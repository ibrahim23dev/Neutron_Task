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
    const { page = 1, searchValue, parPage = 5} = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

   
    const tasksQuery = {};
    if (searchValue) {
      // Add search condition for name, email, phone, or address
      tasksQuery.$or = [
        { name: { $regex: searchValue, $options: "i" } },
        { email: { $regex: searchValue, $options: "i" } },
        { phone: { $regex: searchValue, $options: "i" } },
        { address: { $regex: searchValue, $options: "i" } },
      ];
    }

    try {
      // Use the tasksQuery object directly in the find query
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

      // Check if the contact exists
      const contact = await ContactModel.findById(contactId);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      // Update the contact fields
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      contact.address = address;
      contact.picture = picture;

      // Save the updated contact
      await contact.save();

      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteContact(req, res) {
    try {
      const id = req.params.id;

      // Use findByIdAndDelete to find and delete the contact in a single operation
      const deletedContact = await ContactModel.findByIdAndDelete(id);

      if (!deletedContact) {
        // If deletedContact is null, the contact was not found
        return res
          .status(404)
          .json({ status: "fail", message: "Contact not found" });
      }

      // Return a success message along with the deleted contact data
      res.status(200).json({ status: "success", data: deletedContact });
    } catch (error) {
      // Catch any errors that occur during the deletion process
      res.status(500).json({ status: "fail", message: error.message });
    }
  }
}

module.exports = new ContactController();
