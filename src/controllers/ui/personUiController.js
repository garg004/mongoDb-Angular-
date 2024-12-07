const Person = require('../../models/Person');

exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find().sort({ createdAt: -1 });
    res.render('list', { people });
  } catch (error) {
    res.render('error', { error: error.message });
  }
};

exports.showCreateForm = (req, res) => {
  res.render('create');
};

exports.createPerson = async (req, res) => {
  try {
    await Person.create(req.body);
    res.redirect('/ui/person');
  } catch (error) {
    res.render('create', { error: error.message });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.render('error', { error: 'Person not found' });
    }
    res.render('edit', { person });
  } catch (error) {
    res.render('error', { error: error.message });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!person) {
      return res.render('error', { error: 'Person not found' });
    }
    res.redirect('/ui/person');
  } catch (error) {
    res.render('edit', { error: error.message });
  }
};

exports.showDeleteForm = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.render('error', { error: 'Person not found' });
    }
    res.render('delete', { person });
  } catch (error) {
    res.render('error', { error: error.message });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.render('error', { error: 'Person not found' });
    }
    res.redirect('/ui/person');
  } catch (error) {
    res.render('error', { error: error.message });
  }
};