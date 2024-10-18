import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { getIssue, updateIssue } from '../features/projects/issueSlice';

const EditIssuePage = () => {
    const { projectId, issueId } = useParams();

    const dispatch = useDispatch();
    const { currentIssue, isLoading, isError, message } = useSelector(
        (state) => state.issues,
    );

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const issueData = { title, description, assignee, status }; // Include status in the update
        console.log(issueData);
        dispatch(updateIssue({ projectId, issueId, issueData }));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message, { icon: '😭' });
            // dispatch(reset());
        }
    }, [isError, message, dispatch]);

    useEffect(() => {
        dispatch(getIssue({ projectId, issueId }));
    }, [dispatch, projectId, issueId]);

    useEffect(() => {
        if (currentIssue) {
            setTitle(currentIssue.title);
            setDescription(currentIssue.description);
            setAssignee(currentIssue.assignee || '');
            setStatus(currentIssue.status || '');
        }
    }, [currentIssue]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <Row>
                <Col className="mg-top text-center">
                    <h1>Edit Issue</h1>
                    <hr className="hr-text" />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
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
                        <Form.Group controlId="assignee">
                            <Form.Label>Assignee:</Form.Label>
                            <Form.Control
                                type="text"
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status:</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select status</option>
                                <option value="P">Pending</option>
                                <option value="IP">In Progress</option>
                                <option value="D">Done</option>
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Save Issue'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditIssuePage;
