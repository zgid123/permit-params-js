import isObjectType from './utils/isObjectType';
import isEmptyObject from './utils/isEmptyObject';

interface IParams {
  [key: string]: any; // to support all interfaces
}

type TSchema = (string | string[] | { [key: string]: TSchema })[];

const permitParams = <T extends unknown>(params: IParams, ...schema: TSchema): T => {
  return schema.reduce<T>((strongParams, paramKey) => {
    if (typeof paramKey === 'string') {
      if (!Object.prototype.hasOwnProperty.call(params, paramKey) || isObjectType(params[paramKey])) {
        return strongParams;
      }

      Object.assign(strongParams, { [paramKey]: params[paramKey] });
    } else {
      const permittedObject = Object.entries(paramKey).reduce((result, [key, val]) => {
        const currentParamValues = params[key];

        if (!isObjectType(currentParamValues)) {
          return result;
        }

        if (Array.isArray(currentParamValues)) {
          let permittedValues;
          const objectElements = currentParamValues.filter(e => isObjectType(e)) as IParams[];

          if (val.length && objectElements.length) {
            permittedValues = objectElements.reduce((result: IParams[], currentParamValue: IParams) => {
              const permittedObjectValue = permitParams<IParams>(currentParamValue, ...val);

              if (isEmptyObject(permittedObjectValue)) {
                return result;
              }

              result.push(permittedObjectValue);

              return result;
            }, []);
          } else if (!val.length && !objectElements.length) {
            permittedValues = currentParamValues;
          } else {
            return result;
          }

          if (!permittedValues.length) {
            return result;
          }

          Object.assign(result, { [key]: permittedValues });
        } else {
          if (Array.isArray(val) && !val.length) {
            return result;
          }

          const permittedValues = permitParams(currentParamValues as IParams, ...val);

          if (isEmptyObject(permittedValues)) {
            return result;
          }

          Object.assign(result, { [key]: permittedValues });
        }

        return result;
      }, {});

      Object.assign(strongParams, permittedObject);
    }

    return strongParams;
  }, {} as T);
};

export default permitParams;
