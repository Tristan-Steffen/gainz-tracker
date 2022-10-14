import { UserData } from "lib/types";
import { CreateUserSchema } from "lib/validators";
import { send } from "./core";

export async function registerUser(user: CreateUserSchema) {
  return send<UserData>("/api/user", { body: user });
}
