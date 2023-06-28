const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');


// Routes
router.get('/getPersons', personController.getPersons);

router.post('/add-person', personController.createPerson);

router.put('/edit-person', personController.editPerson);

router.delete('/delete-person', personController.DeletePerson);




module.exports = router;
