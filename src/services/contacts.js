import { ContactsCollection } from '../db/models/contact.js';

export async function createContact(payload) {
  return await ContactsCollection.create(payload);
}

export async function getAllContacts() {
  return await ContactsCollection.find();
}

export async function getContactById(contactId) {
  return await ContactsCollection.findById(contactId);
}

export async function updateContact(contactId, payload, options = {}) {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
}

export async function deleteContact(contactId) {
  return await ContactsCollection.findByIdAndDelete(contactId);
}