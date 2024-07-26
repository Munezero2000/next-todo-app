import { SignJWT } from "jose";

const key = new TextEncoder().encode(process.env.NEXT_AUTH_SECRET!);

export async function encrypt(payload: any) {
  // this function will encrypt the pay load and give a token back
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "H256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function login(formData: FormData) {
  // talk to the database and get user data
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // calculate session expration time and set the variable
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });
}
