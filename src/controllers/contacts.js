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

export async function getAllContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { type, isFavourite } = parseFilterParams(req.query);
  const userId = req.user._id;
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId, req.user._id);
  
  if (!contact) {
    return next(createHttpError(404, `Contact not found`));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const {
    body,
    user: { _id: userId },
  } = req;

  const contact = await createContact({ ...body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function patchContactController(req, res, next) {
  const contactId = req.params.contactId;

  const contact = await updateContact(contactId, req.user._id, req.body);

  if (!contact) {
    return next(createHttpError(404, `Contact not found`));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.contact,
  });
}

export async function deleteContactController(req, res, next) {
  const contactId = req.params.contactId;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    return next(createHttpError(404, `Contact not found`));
  }

  res.status(204).send();
}