const Person = require('../../models/Person');

// Get all people
exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: people });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single person
exports.getPerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, error: 'Person not found' });
    }
    res.status(200).json({ success: true, data: person });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create person
exports.createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.status(201).json({ success: true, data: person });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update person
exports.updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!person) {
      return res.status(404).json({ success: false, error: 'Person not found' });
    }
    res.status(200).json({ success: true, data: person });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete person
exports.deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, error: 'Person not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};