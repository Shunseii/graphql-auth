import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";

import { COOKIE_NAME } from "../constants.js";
import UserModel, { User, UserDocument } from "../models/user.model.js";
import Context from "../types/Context.js";
import { ValidatedRegisterUserInput } from "./types.js";

@Resolver()
export default class HelloResolver {
  @Authorized()
  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello world!";
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<UserDocument | null> {
    const user = await UserModel.findById(ctx.req.session.userId);
    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, password }: ValidatedRegisterUserInput
  ): Promise<UserDocument> {
    const user = await UserModel.create({ email, password });

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<UserDocument | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const isValid = await user.comparePassword(password);
    if (!isValid) return null;

    ctx.req.session.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((resolve, reject) =>
      ctx.req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }

        ctx.res.clearCookie(COOKIE_NAME);
        return resolve(true);
      })
    );
  }
}
