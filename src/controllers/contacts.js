import createHttpError from 'http-errors';
import {
  createContact,
  getAllContacts,
  getContactById,  
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const {
    user: { _id: userId },
  } = req;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const {
    params: { id: contactId },
    user: { _id: userId },
  } = req;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact whith id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const {
    body,
    user: { _id: userId },
  } = req;

  const contact = await createContact(...body, userId);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const {
    body,
    params: { id: contactId },
    user: { _id: userId },
  } = req;

  const result = await updateContact(contactId, userId, body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const {
    params: { id: contactId },
    user: { _id: userId },
  } = req;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  
  res.sendStatus(204);
};