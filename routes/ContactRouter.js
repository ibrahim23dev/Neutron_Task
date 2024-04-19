const router = require('express').Router();

const ContactController = require('../controllers/ContactController')

router.post('/create-contact',  ContactController.AddContact);
router.get('/get-Contact', ContactController.getContact);
router.get('/get-contact/:id', ContactController.getContactById);
router.delete('/delete-contact/:id', ContactController.deleteContact);

router.post('/update-contact/:id', ContactController.updateContactById);

module.exports = router;