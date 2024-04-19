const { model, Schema } = require("mongoose");

const DataSchema = Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true 
  },
  address: {
    type: String,
    required: true 
  },
  picture: {
    type: String,
    required: true 
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  }
}, { versionKey: false });

const ContactsModel = model("Contacts", DataSchema);

module.exports = ContactsModel;
