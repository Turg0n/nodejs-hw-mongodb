function parseNumber(unknownValue, defaultValue) {
    const isString = typeof unknownValue === 'string';
    if (!isString) return defaultValue;
  
    const number = parseInt(unknownValue);
    if (Number.isNaN(number)) return defaultValue;
  
    return number;
  }
  
  export default function parsePaginationParams(query) {
    const { page, perPage } = query;
  
    return {
      page: parseNumber(page, 1),
      perPage: parseNumber(perPage, 10),
    };
  }