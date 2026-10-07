import { logoutFromOrvella } from "../authService";

export const signOut = async () => {
  await logoutFromOrvella();
  return true;
};
