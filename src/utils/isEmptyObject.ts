const isEmptyObject = (value: {}) => {
  return typeof value !== 'object' || Array.isArray(value) || !Object.keys(value).length;
};

export default isEmptyObject;
