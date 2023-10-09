const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // check file type
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (!extname || !mimetype) {
            return cb(new Error('Only support jpeg, jpg and png files'));
        }

        cb(null, 'public/images');
    },
    filename(req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err);
            }
            cb(null, buf.toString('hex') + path.extname(file.originalname));
        })
    }
});

// multer error handling
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept a file
        cb(null, true);
    } else {
        cb(new Error('Only support jpeg, jpg and png files'), false);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
    fileFilter,
});

upload.fields([
    {
        name: 'files',
        maxCount: 10,
    },
]);

const uploadImages = (req, res, next) => {
    upload.array('files', 10)(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(400).json({ message: `Too many files uploaded in ${err.field}` });
                } else if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ message: `File size should be less than 1MB.` });
                }
            } else if (err) {
                return res.status(500).json({ message: err.message || 'Unknown error occurred.' });
            }
        }
        next();
    });
}

module.exports = uploadImages;