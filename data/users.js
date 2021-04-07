import bcrypt from "bcryptjs";

const User = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mary Jates",
    email: "mary@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Payton User",
    email: "payton@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
