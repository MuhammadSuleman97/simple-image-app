import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";

const CardList = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.images.length > 0) {
            setLoading(false);
        }
    }, [props.images]);

    return (
        <div style={{ position: "relative" }}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "300px", // Set a minimum height for the loading container
                    }}
                >
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                </div>
            ) : (
                <Row xs={1} md={3} className="g-4">
                    {props.images.length ? props.images.map((image, index) => (
                        <Col key={index}>
                            <Card>
                                <Card.Img variant="top" src={image.url} />
                                <Card.Title>{image.name}</Card.Title>
                            </Card>
                        </Col>
                    )) : <h2 className="Information-title">Oops!! No Image Found</h2>}
                </Row>
            )}
        </div>
    );
}

export default CardList;
