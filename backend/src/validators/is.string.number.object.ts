import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStringNumberObject(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsStringNumberObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(valueObject: Object, args: ValidationArguments) {
          try {
            if (
              typeof valueObject !== 'object' ||
              Array.isArray(valueObject) ||
              valueObject === null
            ) {
              return false;
            }

            for (const [key, value] of Object.entries(valueObject)) {
              console.log(key, value);
              console.log(typeof key !== 'string' || typeof value !== 'number');
              if (typeof key !== 'string' || typeof value !== 'number') {
                return false;
              }
            }

            return true;
          } catch (e) {
            console.log(e);
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an object with keys as string and values as number`;
        },
      },
    });
  };
}
