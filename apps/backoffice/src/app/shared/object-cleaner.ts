export function cleanObj<T>(obj: T): Partial<T> {
  if (!obj) {
    return null;
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value == null) {
      return { ...acc };
    }
    if(Array.isArray(value)) {
      if (value?.length) {
        return { ...acc, [key]: value };
      }
      return {...acc}
    }
    if (typeof value === 'object') {
      const nestedObject = cleanObj(value);
      if (nestedObject && Object.keys(nestedObject).length) {
        return { ...acc, [key]: nestedObject };
      }
      return { ...acc };
    }
    return { ...acc, [key]: value };
  }, {});
}
