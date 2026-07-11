import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
    privateKey: process.env.imageKitPrivateKey,
})

const uploadFile = async (file: Buffer, fileName: string) => {
    const result = await client.files.upload({
        file: file.toString("base64"),
        fileName,
    });

    return result;
}

const deleteFile = async (fileId: string) => {
    return await client.files.delete(fileId);
}

export default {
    uploadFile,
    deleteFile,
};
