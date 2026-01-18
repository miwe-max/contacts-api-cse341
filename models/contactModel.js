// Description: This module handles MongoDB operations for the contacts collection.
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db('contactsDB');
    console.log('Connected to MongoDB Atlas');
    await db.command({ ping: 1 });
    console.log('Pinged contactsDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}


// Validate contact data
function validateContactData(contactData) {
  const { firstName, lastName, email, favoriteColor, birthday } = contactData;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    throw new Error('All fields (firstName, lastName, email, favoriteColor, birthday) are required');
  }
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
}

// Get all contacts
async function getAllContacts() {
  try {
    return await db.collection('contacts').find().toArray();
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
}

// Get contact by ID
async function getContactById(id) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid contact ID');
    }
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

// Create a contact
async function createContact(contactData) {
  try {
    validateContactData(contactData);
    const result = await db.collection('contacts').insertOne(contactData);
    return { _id: result.insertedId, ...contactData };
  } catch (error) {
    throw new Error(error.message || 'Failed to create contact');
  }
}

// Update a contact
async function updateContact(id, contactData) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid contact ID');
    }
    validateContactData(contactData);
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: contactData }
    );
    if (result.matchedCount === 0) {
      throw new Error('Contact not found');
    }
    return { message: 'Contact updated' };
  } catch (error) {
    throw error;
  }
}

// Delete a contact
async function deleteContact(id) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid contact ID');
    }
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('Contact not found');
    }
    return { message: 'Contact deleted' };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};