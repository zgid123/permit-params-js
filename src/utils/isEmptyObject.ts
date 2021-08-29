const isEmptyObject = (value: unknown): boolean => {
  return typeof value !== 'object' || Array.isArray(value) || !Object.keys(value as Record<string, unknown>).length;
};

export default isEmptyObject;
