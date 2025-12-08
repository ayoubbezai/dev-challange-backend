import { hash } from "bcryptjs";

const password = "correct-flag-for-testing";

const hashed = await hash(password, 10);

console.log("Hashed password:", hashed);
