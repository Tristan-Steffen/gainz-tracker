declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      admin?: boolean;
    };
  }
}
