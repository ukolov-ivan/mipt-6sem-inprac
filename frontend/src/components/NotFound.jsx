import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <h1 className="notfound">404 Not Found</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
