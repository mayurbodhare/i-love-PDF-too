import NodeClam from "clamscan";

export const scanPdf = async (path: string): Promise<boolean> => {
	console.log(path);
	try {
		const clamscan = await new NodeClam().init({});
		const { file, isInfected, viruses } = await clamscan.isInfected(path);
		return !isInfected;
	} catch (error) {
		console.log("scan error", error);
		return false;
	}
};
