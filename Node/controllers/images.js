

const { getAllImagesFromS3, uploadImageOnS3, getSignedUrl} = require('../utils/aws');

exports.getAllImages = async (req, res) => {
    try {
        const data = await getAllImagesFromS3();
        if (!data) {
            throw new Error('No images found');
        }

        // get url for each image that is open to public
        let images = [];
        for (let i = 0; i < data.Contents.length; i++) {
            const url = await getSignedUrl(data.Contents[i].Key);
            images.push({url, name: data.Contents[i].Key});
        }

        //make image access

        res.status(200).json({
            success: true,
            images,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
// multiple images
exports.uploadImages = async (req, res) => {
    try {
        const files = req.files;

        if (!files) {
            throw new Error('No files found');
        }

        let images = [];
        for (let i = 0; i < files.length; i++) {
            const data = await uploadImageOnS3(files[i]);
            const url = await getSignedUrl(data.Key);
            images.push({url, name: files[i].originalname})
        }

        res.status(200).json({
            success: true,
            images,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

