import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export default function validateMongoId(req, res, next) {
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

  next();
}