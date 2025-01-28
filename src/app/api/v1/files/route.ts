import { storageService } from "@/lib/storage/factory";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const files = await storageService.listFiles();
        return NextResponse.json({ files }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileId = await storageService.uploadFile(buffer, file.name);

        return NextResponse.json({ id : fileId }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}