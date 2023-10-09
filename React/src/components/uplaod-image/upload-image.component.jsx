import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from "react-bootstrap";

const UploadImage = () => {
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // Filter the selected files to allow only JPG, JPEG, and PNG
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        const maxSize = 1048576; // 1 MB = 1048576 bytes

        const filteredFiles = selectedFiles.filter((file) => {
            if (!allowedTypes.includes(file.type)) {
                setErrorMessage("Unsupported file format. Please select JPG, JPEG, or PNG files.");
                return false;
            }
            if (file.size > maxSize) {
                setErrorMessage("File size exceeds 1 MB limit.");
                return false;
            }
            return true;
        });

        setImages(filteredFiles);
    };

    const handleSubmit = (e) => {
        setUploading(true);
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('files', images[i]);
        }

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const loaded = event.loaded;
                const total = event.total;
                const progress = Math.floor((loaded / total) * 100);
                setProgress(progress);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                setImages([]);
                setProgress(0);
                setUploadComplete(true);
                setUploading(false);
            } else {
                console.error('File upload error:', xhr.status);
                setUploading(false);
            }
        });

        xhr.open('POST', 'http://localhost:4000/api/images/upload', true);
        xhr.send(formData);
    };

    return (
        <Container>
            <Row>
                <Col md={{ span: 7, offset: 3 }}>
                    <h2 className="text-center">Upload Image</h2>
                    {uploadComplete ? (
                        <div>
                            <h2>Upload Complete!</h2>
                            <Button variant="primary" onClick={() => setUploadComplete(false)}>
                                Upload Another Image
                            </Button>

                            <Button variant="primary" href="/" >
                                View Images
                            </Button>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="file" multiple onChange={handleImageChange} disabled={uploading}/>
                            </Form.Group>
                            <br />
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            <Button variant="primary" type="submit" disabled={!images.length || uploading }>
                                Submit
                            </Button>
                            <br />
                            
                            {uploading && (
                                <div>
                                    <h2>Uploading...</h2>
                                    <ProgressBar now={progress} label={`${progress}%`} />
                                </div>
                            )}
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default UploadImage;
