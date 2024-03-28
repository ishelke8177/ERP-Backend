const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        secretAccessKey: 'V5vZ9KklrtwBb2N6UVW13leGhlYcyDjnE1ULLUls',
        accessKeyId: 'AKIAW3MEC3BFP5Y6JGXW',
    }
});

function uploadFile(fileBuffer, fileName, mimetype) {
    const client = new Upload({
        client: s3,
        params: {
            Bucket: 'my-new-bucket-s3-node',
            Body: fileBuffer,
            Key: fileName,
            ContentType: mimetype
        },
    });
    
    return client.done()
}

function deleteFile(fileName) {
    const deleteParams = {
        Bucket: 'my-new-bucket-s3-node',
        Key: fileName,
    }
  
    return s3.send(new DeleteObjectCommand(deleteParams));
}

module.exports = { uploadFile, deleteFile }