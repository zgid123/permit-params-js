const isObjectType = (value: any) => { // eslint-disable-line
  return !!value && typeof value === 'object';
};

export default isObjectType;
