export type AuthParams = { email: string; password: string };
export type UserAuth = ({ email, password }: AuthParams) => Promise<void> | null;
