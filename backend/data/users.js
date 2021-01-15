import bcrypt from 'bcryptjs';


const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync('123456',10),
    isAdmin: true,
  },
  {
    name: "Kuntal Das",
    email: "kuntal@example.com",
    password: bcrypt.hashSync('123456',10),
  },
  {
    name: "Rahul Das",
    email: "rahul@example.com",
    password: bcrypt.hashSync('123456',10),
  },
];

export default users
