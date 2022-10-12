import { UserData } from "./lib/types";

declare module "iron-session" {
  interface IronSessionData {
    user?: UserData;
  }
}
