import config from "config";

export const PORT: number = config.get("port");

export const SESSION_SECRET: string = config.get("sessionSecret");

export const COOKIE_NAME = "qid";

export const COOKIE_AGE = 1000 * 60 * 60 * 24 * 7 * 365; // 7 years

export const SALT_ROUNDS = 12;

export const FRONT_END_URL: string = config.get("frontEndURL");

export const MONGO_URI: string = config.get("mongoURI");
