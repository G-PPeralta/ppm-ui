export const formatEmail = (email: string) =>
  email.replace(/[^a-zA-Z0-9@.]/g, "");
