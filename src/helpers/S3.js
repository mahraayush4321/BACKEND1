const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');


class S3Service {
    constructor(){
       this.s3 = new S3Client({     
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
         }
       });
    }

    uploadFile = async (file) => {
        const { originalname, mimetype, buffer } = file; 
        try {
            const BucketName = process.env.AWS_S3_BUCKET_NAME;
            console.log('Bucket Name:', BucketName);
            const params = {
                Bucket: BucketName ,
                Key: originalname,
                Body: buffer, 
                ContentType: mimetype,
                ACL: 'public-read',
            };
            const uploadResult = await this.s3.send(new PutObjectCommand(params));
            console.log('the result of uploadFile',uploadResult);
            return {
                url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${originalname}`,
                name: originalname,
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    };

    downloadFile = async (fileId, res) => {
        try {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileId,
            };

            const data = await this.s3.send(new GetObjectCommand(params));
            res.status(200).send(data.Body);
        } catch (error) {
            console.error('Error downloading file:', error);
            throw new Error('Failed to download file');
        }
    };

    deleteFile = async (fileId) => {
        try {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileId,
            };

            await this.s3.send(new DeleteObjectCommand(params));
        } catch (error) {
            console.error('Error deleting file:', error);
            throw new Error('Failed to delete file');
        }
    };
}

module.exports = new S3Service();