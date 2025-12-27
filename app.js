import { hash } from "bcryptjs";

const password = "";

const hashed = await hash(password, 10);

console.log("Hashed password:", hashed);
