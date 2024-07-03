import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {ContactCollection} from '../db/models/contact.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
export const getAllContacts = async ({page=1, perPage=10, sortBy="_id", sortOrder="asc", userId}) => {
  const count = await ContactCollection.countDocuments({ userId });
  const paginationInformation = createPaginationInformation(page, perPage, count);
  
  const dataContacts = await ContactCollection
      .find({ userId })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec();

  return {
      data: dataContacts,
      ...paginationInformation
  };
}
export const getContactsById = async ({id, userId}) => {
  const idobj = { _id: id, userId };
  if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError(404, 'invalid ID');
    }



    const contactsfound = await ContactCollection.find(idobj);

    if (!contactsfound || contactsfound.length === 0) {
      throw createHttpError(404, `Contact with id ${id} not found!`);
  }
  return contactsfound;
}


export const createNewContact = async (payload, userId) => {

  const newContact = await ContactCollection.create({...payload, userId:userId});
  return newContact;
}


export const patchContactsById = async (id, payload, userId, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(404, 'Invalid ID');
  }

  const updateObj = { _id: id, userId };
  const patchedContact = await ContactCollection.findOneAndUpdate(
    updateObj,
    payload,
    { new: true, ...options }
  );

  if (!patchedContact) {
    throw createHttpError(404, `Contact with id ${id} not found or does not belong to the user!`);
  }

  return patchedContact;
};


export const deleteContactsById = async (id, userId) => {
  const idObj = { _id: id, userId };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(404, 'Invalid ID');
  }

  const contactDeleted = await ContactCollection.findOneAndDelete(idObj);

  if (!contactDeleted) {
    throw createHttpError(404, `Contact with id ${id} not found or does not belong to the user!`);
  }
  return contactDeleted;
};