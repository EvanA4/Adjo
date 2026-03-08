import { IImage } from "@/types/imagedb";
import { APIResult } from "@/types/results";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  const in_fd = await req.formData();
  in_fd.append("password", process.env.IMAGEDB_PASS!);
  const rawRes = await fetch(`${process.env.IMAGEDB_HOST}/images`, {
    method: "POST",
    body: in_fd,
  });
  const res = await rawRes.json() as APIResult<IImage[]>;
  return NextResponse.json(res);
};

export const DELETE = async function (req: NextRequest) {
  const rawRes = await fetch(
    `${process.env.IMAGEDB_HOST}/images${req.nextUrl.search}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        password: process.env.IMAGEDB_PASS,
      }),
      headers: {
        "Content-Type": "application/json", // Not including this causes NGINX to ignore DELETE requests' bodies
      },
    },
  );
  const res = await rawRes.json() as APIResult<IImage>;
  return NextResponse.json(res);
};