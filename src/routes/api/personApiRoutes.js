const express = require('express');
const router = express.Router();
const personController = require('../../controllers/api/personApiController');

router.get('/person', personController.getAllPeople);
router.get('/person/:id', personController.getPerson);
router.post('/person', personController.createPerson);
router.put('/person/:id', personController.updatePerson);
router.delete('/person/:id', personController.deletePerson);

module.exports = router;