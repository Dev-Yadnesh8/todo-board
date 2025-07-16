export const DB_NAME = "todo_board";

export const CORS_ORIGIN_DEV = [
  "http://localhost:2025",
  process.env.CLIENT_URL
];

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "PROD",
};
