import dbcon from "../lib/db";
import { NextResponse } from "next/server";
import { User } from "../../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req) {
  const { name, email, password } = await req.json();

  await dbcon();
  console.log("connect h");

  //for find
  const user = await User.findOne({ email });
  if (user) {
    return NextResponse.json({ mes: "user alredy exist" });
  }

  const hasedPass = await bcrypt.hash(password, 10);
  const data = await User.create({ name, email, password: hasedPass });

  return NextResponse.json({ mes: data });
}

export async function login(req) {
  const { email, password } = await req.json();
  await dbcon();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ mes: "No user found. Sign up." });
  }

  const passcheck = await bcrypt.compare(password, user.password);
  if (!passcheck) {
    return NextResponse.json({ mes: "password wrong" });
  }
  if (passcheck) {
    const token = jwt.sign({ id: user.email }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({ mes: `welcome ${user.name}`, user });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60,
    });
    return res;
  }
}
