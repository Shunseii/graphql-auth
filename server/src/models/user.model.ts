import {
  DocumentType,
  getModelForClass,
  pre,
  prop,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";
import { HookNextFunction } from "mongoose";

import { SALT_ROUNDS } from "../constants.js";

@pre<User>("save", function save(next: HookNextFunction) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
})
@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id?: number;

  @Field()
  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  public comparePassword(
    this: DocumentType<User>,
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export interface UserDocument extends DocumentType<User> {}

export default getModelForClass(User);
