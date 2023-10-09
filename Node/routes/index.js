const router = require('express').Router();

const { getAllImages, uploadImages } = require('../controllers/images');
const uploadImage = require('../middleware/file-upload');

router.get('/images', getAllImages);
router.post('/images/upload', uploadImage,uploadImages);


module.exports = router;