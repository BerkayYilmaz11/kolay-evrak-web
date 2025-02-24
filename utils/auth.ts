import { tokenStorage } from "./tokenStorage";

export const auth = {
  login: (token: string): void => {
    // TODO: Make it api call
    // Simulating a JWT token
    const temptoken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vQGV4YW1wbGUuY29tIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMn0";
    tokenStorage.set(temptoken);
  },

  logout: async (): Promise<void> => {
    tokenStorage.remove();
  },

  getToken: (): string | null => {
    return tokenStorage.get();
  },

  isAuthenticated: (): boolean => {
    return tokenStorage.exists();
  },
};
