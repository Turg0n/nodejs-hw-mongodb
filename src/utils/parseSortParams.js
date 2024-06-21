import { SORT_ORDER } from '../const/sortOrder.js';

function parseSortOrder(sortOrder) {
    const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if (isKnownOrder) return sortOrder;
    return SORT_ORDER.ASC;
  }

function parseSortBy(sortBy) {
  const keysOfStudent = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
  ];

  if (keysOfStudent.includes(sortBy)) return sortBy;
  return '_id';
}



export default function parseSortParams(query) {
  const { sortBy, sortOrder } = query;
  return {
    sortBy: parseSortBy(sortBy),
    sortOrder: parseSortOrder(sortOrder),
  };
}