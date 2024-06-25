import { Router } from 'express';
import ctrlWrapper from '../utils/wrapper.js';
import {
  getAllContactsController,
  createContactController,
  getContactByIdController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import validateMongoId from '../middlewares/validateMongoId.js';
import validateBody from '../middlewares/validateBody.js';
import {createContactSchema,updateContactSchema,} from '../validation/schemas/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', validateMongoId);

contactsRouter.use('/', authenticate);

contactsRouter.get('', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;