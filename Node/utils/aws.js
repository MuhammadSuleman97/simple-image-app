const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const getAllImagesFromS3 = async () => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
    };

    const data = await s3.listObjects(params).promise();

    return data;
}

const uploadImageOnS3 = async (file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: fs.createReadStream(file.path),
        ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();

    return data;
}

const getSignedUrl = (key) =>{
    return new Promise((resolve, reject) => {
        let params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        };
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                console.log(`Error getting signed url for ${key} from AWS S3`);
                reject(err);
            }
            console.log(`Successfully got signed url for ${key} from AWS S3`);
            resolve(url);
        })
    }).catch((err) => {
        console.log("AWS S3 Error", err);
    })
}

module.exports = {
    getAllImagesFromS3,
    uploadImageOnS3,
    getSignedUrl
}