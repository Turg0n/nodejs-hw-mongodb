import { getAllContacts, getContactById } from '../services/contacts.js';

export async function allContacts(req, res) {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: contacts.length
      ? 'Successfully found contacts!'
      : 'No contacts yet.',
    data: contacts,
  });
}

export async function contactById(req, res) {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  if (contact === null) {
    res.status(404).json({
      status: 404,
      message: `Contact with ${contactId} does not exist`,
    });
  } else {
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  }
}