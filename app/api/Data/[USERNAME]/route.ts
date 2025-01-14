import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);

    const pathParts = url.pathname.split('/');
    const username = pathParts[pathParts.length - 1];
    const requrl = "http://localhost:5500/api/getMatch/" + username;
    console.log(requrl);

    try {
        const data = await fetch(requrl);

        if (!data.ok) {
            throw new Error("Fetch failed with status: " + data.status);
        }

        const json = await data.json();
        console.log(json);

        return NextResponse.json(json);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
