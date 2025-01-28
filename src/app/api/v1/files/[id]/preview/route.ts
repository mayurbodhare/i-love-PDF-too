import { storageService } from "@/lib/storage/factory";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params} : {params : {id : string}}) {
    const fileId = params.id;
    try {
        const file = await storageService.getFilePreview(fileId, 200, 300);
        return NextResponse.json({ file }, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({ error: "Failed to get file preview" }, { status: 500 }); 
    }
}