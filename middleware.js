import { NextResponse } from "next/server";
// import {jwtVerify} from "jose";
// import { User } from "../../model/user"

// const secret = new TextEncoder().encode(process.env.JWT_TOKEN)

export async function middleware(request) {
  const isPrivatePath = "/profile";

  const token = request.cookies.get("token")?.value || "";

  // const {payload} = await jwtVerify(token, secret);
  // console.log(payload.id)
  //  const user = await User.findOne({payload.id});
  // if(!user){
  //  return NextResponse.redirect(new URL("/", request.url));
  // }

  if (isPrivatePath) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/profile",
};
