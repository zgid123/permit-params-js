import isObjectType from './utils/isObjectType';
import isEmptyObject from './utils/isEmptyObject';

type TParams = string | boolean | number | null | undefined;

interface IParams {
  [key: string]: IParams | TParams | (IParams | TParams)[];
}

type TSchema = (string | string[] | { [key: string]: TSchema })[];

const permitParams = <T extends IParams>(params: IParams, ...schema: TSchema): T => {
  return schema.reduce((strongParams, paramKey) => {
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
              const permittedObjectValue = permitParams(currentParamValue, ...val);

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
