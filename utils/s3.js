const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config()

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    }
});

function uploadFile(fileBuffer, fileName, mimetype) {
    const client = new Upload({
        client: s3,
        params: {
            Bucket: process.env.S3_BUCKET,
            Body: fileBuffer,
            Key: fileName,
            ContentType: mimetype
        },
    });
    
    return client.done()
}

function deleteFile(fileName) {
    const deleteParams = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
    }
  
    return s3.send(new DeleteObjectCommand(deleteParams));
}

module.exports = { uploadFile, deleteFile }