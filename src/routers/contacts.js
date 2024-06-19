import { Router } from 'express';
import ctrlWrapper from '../utils/wrapper.js';
import {
  getAllContactsController,
  postContactController,
  getContactByIdController,
  patchContactController,
  deleteContactController,
} from '../controllers/controlls.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post('/contacts', ctrlWrapper(postContactController));

contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;