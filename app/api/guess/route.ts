import { guessPlantById } from "@/utils/server/search";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const idParam = searchParams.get("_id");
    if (!idParam) {
        return NextResponse.json({
            error: true,
            message: "Missing _id"
        });
    }

    const guessRes = await guessPlantById(idParam);
    const rerr = guessRes.anticipate();

    if (rerr.error) {
        return NextResponse.json(rerr);
    } else {
        return NextResponse.json({
            error: false,
            message: rerr.message,
            value: guessRes.unwrap()
        });
    }
};