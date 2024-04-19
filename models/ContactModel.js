const { model, Schema } = require("mongoose");

const DataSchema = Schema({
  name: {
    type: String,
    required: true // Corrected from require to required
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true // Corrected from require to required
  },
  address: {
    type: String,
    required: true // Corrected from require to required
  },
  picture: {
    type: String,
    required: true // Corrected from require to required
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  }
}, { versionKey: false });

const ContactsModel = model("Contacts", DataSchema);

module.exports = ContactsModel;
