const isObjectType = (value: unknown): boolean => {
  return !!value && typeof value === 'object';
};

export default isObjectType;
