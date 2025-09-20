import { login, register } from "../../controllers/authControllers";

export async function POST(req) {
  const { searchParams } = new URL(req.url);

  const isLogin = searchParams.get("login");
  const isSignup = searchParams.get("sign");

  if (isLogin) {
    return await login(req);
  }
  if (isSignup) {
    return await register(req);
  }
}
