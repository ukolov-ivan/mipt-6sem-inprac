import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { createIssue } from '../features/projects/issueSlice';

const CreateIssuePage = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const { isLoading, isError, message } = useSelector(
        (state) => state.projects,
    );

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const issueData = { title, description };
        dispatch(createIssue({ projectId, issueData }));
    };

    React.useEffect(() => {
        if (isError) {
            toast.error(message, { icon: '😭' });
            // dispatch(reset());
        }
    }, [isError, message, dispatch]);
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Container>
            <Row>
                <Col className="mg-top text-center">
                    <h1>Create New Issue</h1>
                    <hr className="hr-text" />
                </Col>
            </Row>
            <Row className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Issue Title:</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Issue'}
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default CreateIssuePage;
