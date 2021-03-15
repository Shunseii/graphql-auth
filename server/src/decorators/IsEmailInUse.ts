import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import UserModel from "../models/user.model.js";

@ValidatorConstraint({ async: true })
export class IsEmailInUseConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    return UserModel.findOne({ email }).then((user) => {
      if (user) return false;

      return true;
    });
  }
}

export function IsEmailInUse(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailInUseConstraint,
    });
  };
}
