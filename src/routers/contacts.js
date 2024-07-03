import { Router } from 'express';
import {ctrlWrapper} from '../utils/wrapper.js';
import {getAllContactsController,
        getContactsByIdController,
        postNewContactController,
        patchContactsByIdController,
        deleteContactsByIdController} from '../controllers/contacts.js';
import {validateBody} from '../middlewares/validateBody.js';
import {createContactSchema,updateContactSchema,} from '../validation/schemas/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();


contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactid', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/', validateBody(createContactSchema),ctrlWrapper(postNewContactController));

contactsRouter.patch('/:contactid', validateBody(updateContactSchema), ctrlWrapper(patchContactsByIdController));

contactsRouter.delete('/:contactid',ctrlWrapper(deleteContactsByIdController));

export default contactsRouter;