const express = require('express');
const router = express.Router();
const personController = require('../../controllers/ui/personUiController');

router.get('/person', personController.getAllPeople);
router.get('/person/new', personController.showCreateForm);
router.post('/person', personController.createPerson);
router.get('/person/:id/edit', personController.showEditForm);
router.put('/person/:id', personController.updatePerson);
router.get('/person/:id/delete', personController.showDeleteForm);
router.delete('/person/:id', personController.deletePerson);

module.exports = router;