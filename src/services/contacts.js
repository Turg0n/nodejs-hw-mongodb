import { ContactsCollection } from '../db/models/contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../const/sortOrder.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  type,
  isFavourite,
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsList = ContactsCollection.find();

  if (type) {
    contactsList.where('contactType').equals(type);
  }

  if (isFavourite) {
    contactsList.where('isFavourite').equals(isFavourite);
  }

  const [contantsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsList).countDocuments(),
    contactsList
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contantsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(contactId) {
  return await ContactsCollection.findById(contactId);
}

export async function createContact(payload) {
  return await ContactsCollection.create(payload);
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