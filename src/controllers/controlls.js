import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import {
  createContact,
  getAllContacts,
  getContactById,  
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getAllContactsController(req, res) {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: contacts.length
      ? 'Successfully found contacts!'
      : 'No contacts yet.',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const contactId = req.params.contactId;

  if (!isValidObjectId(contactId)) {
    next(
      createHttpError(
        400,
        'Invalid contactId. Must be a 24 character hex string, 12 byte Uint8Array, or an integer at new ObjectId',
      ),
    );
    return;
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}

export async function postContactController(req, res) {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function patchContactController(req, res, next) {
  const contactId = req.params.contactId;

  if (!isValidObjectId(contactId)) {
    next(
      createHttpError(
        400,
        'Invalid contactId. Must be a 24 character hex string, 12 byte Uint8Array, or an integer at new ObjectId',
      ),
    );
    return;
  }

  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.contact,
  });
}

export async function deleteContactController(req, res, next) {
  const contactId = req.params.contactId;

  if (!isValidObjectId(contactId)) {
    next(
      createHttpError(
        400,
        'Invalid contactId. Must be a 24 character hex string, 12 byte Uint8Array, or an integer at new ObjectId',
      ),
    );
    return;
  }

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  res.status(204).send();
}