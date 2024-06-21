import { Router } from 'express';
import ctrlWrapper from '../utils/wrapper.js';
import {
  getAllContactsController,
  postContactController,
  getContactByIdController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import validateMongoId from '../middlewares/validateMongoId.js';
import validateBody from '../middlewares/validateBody.js';
import {createContactSchema,updateContactSchema,} from '../validation-schemas/contacts.js';

const contactsRouter = Router();

contactsRouter.use('/contacts/:contactId', validateMongoId);
contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(postContactController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;