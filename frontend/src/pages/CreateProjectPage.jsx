import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProject, reset } from '../features/projects/projectSlice';

const CreateProjectPage = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, message } = useSelector(
        (state) => state.projects,
    );

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = { name, description };
        dispatch(createProject(projectData));
    };

    React.useEffect(() => {
        if (isError) {
            toast.error(message, { icon: '😭' });
            dispatch(reset());
        }
    }, [isError, message, dispatch]);

    return (
        <Container>
            <Row>
                <Col className="mg-top text-center">
                    <h1>Create New Project</h1>
                    <hr className="hr-text" />
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="projectName" className="mb-3">
                            <Form.Label>Project Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="projectDescription"
                            className="mb-3"
                        >
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                            link
                        >
                            {isLoading ? 'Creating...' : 'Create Project'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProjectPage;
