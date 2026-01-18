// routes/contacts.js
// Description: API routes for managing contacts
const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../models/contactModel');

// Input validation middleware
const validateContact = (req, res, next) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
};

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    res.json(contact);
  } catch (error) {
    if (error.message === 'Invalid contact ID') {
      res.status(400).json({ error: error.message });
    } else if (error.message === 'Contact not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Create a contact
router.post('/', validateContact, async (req, res) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json({ id: newContact._id, ...newContact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a contact CRUD
router.put('/:id', validateContact, async (req, res) => {
  try {
    const result = await updateContact(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Invalid contact ID') {
      res.status(400).json({ error: error.message });
    } else if (error.message === 'Contact not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteContact(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Invalid contact ID') {
      res.status(400).json({ error: error.message });
    } else if (error.message === 'Contact not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;