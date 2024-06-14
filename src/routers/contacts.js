import { Router } from 'express';
import Wrapper from '../utils/wrapper.js';
import {
  getAllContactsController,
  postContactController,
  getContactByIdController,
  patchContactController,
  deleteContactController,
} from '../contrContact/controlls.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', Wrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  Wrapper(getContactByIdController),
);

contactsRouter.post('/contacts', Wrapper(postContactController));

contactsRouter.patch(
  '/contacts/:contactId',
  Wrapper(patchContactController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  Wrapper(deleteContactController),
);

export default contactsRouter;