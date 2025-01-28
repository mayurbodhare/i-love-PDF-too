import { storageService } from "@/lib/storage/factory";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	const fileId = params.id;
	try {
        const file = await storageService.getFileUrl(fileId);
        return NextResponse.json({ file }, { status: 200 });
	} catch (error) {
        return NextResponse.json({ error: "Failed to get file" }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, {params} : {params : {id : string}}) {

    const fileId = params.id;
    try {
        await storageService.deleteFile(fileId);
        return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }

}