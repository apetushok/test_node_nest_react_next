import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStringArray(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsStringArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(valueArray: Array<string>, args: ValidationArguments) {
          try {
            if (!Array.isArray(valueArray) || valueArray === null) {
              return false;
            }

            return valueArray.every((item: any) => {
              return typeof item === 'string';
            });
          } catch (e) {
            console.log(e);
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array with values as string`;
        },
      },
    });
  };
}
