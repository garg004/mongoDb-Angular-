const Person = require('../models/Person');

exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find().sort({ createdAt: -1 });
    res.render('list', { people });
  } catch (error) {
    res.status(500).render('error', { error: 'Error fetching people' });
  }
};

exports.showCreateForm = (req, res) => {
  res.render('create');
};

exports.createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.redirect('/person');
  } catch (error) {
    res.status(400).render('create', { error: 'Error creating person' });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).render('error', { error: 'Person not found' });
    }
    res.render('edit', { person });
  } catch (error) {
    res.status(500).render('error', { error: 'Error fetching person' });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!person) {
      return res.status(404).render('error', { error: 'Person not found' });
    }
    res.redirect('/person');
  } catch (error) {
    res.status(400).render('edit', { error: 'Error updating person' });
  }
};

exports.showDeleteForm = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).render('error', { error: 'Person not found' });
    }
    res.render('delete', { person });
  } catch (error) {
    res.status(500).render('error', { error: 'Error fetching person' });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).render('error', { error: 'Person not found' });
    }
    res.redirect('/person');
  } catch (error) {
    res.status(500).render('error', { error: 'Error deleting person' });
  }
};