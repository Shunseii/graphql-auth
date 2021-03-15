import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

import { IsEmailInUse } from "../decorators/IsEmailInUse.js";

@InputType()
export class ValidatedRegisterUserInput {
  @Field()
  @IsEmail()
  @IsEmailInUse({ message: "Email already in use." })
  email!: string;

  @Field()
  password!: string;
}
