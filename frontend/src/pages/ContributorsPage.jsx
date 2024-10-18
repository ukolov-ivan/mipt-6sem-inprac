import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import projectAPIService from '../api';
import {
    addContributor,
    getContributors,
    removeContributor,
    reset,
} from '../features/projects/contributorSlice';

import { getProject } from '../features/projects/projectSlice';

const ContributorsPage = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const [contributorsDetails, setContributorsDetails] = useState([]);

    const { isError: isErrorProject, message: messageProject } = useSelector(
        (state) => state.projects,
    );

    const { isError: isErrorContributors, message: messageContributors } =
        useSelector((state) => state.contributors);

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const userIds = await dispatch(
                    getContributors(projectId),
                ).unwrap();
                const users = await Promise.all(
                    userIds.map(projectAPIService.getUser),
                );
                setContributorsDetails(users);
            } catch (error) {
                toast.error(error.message || 'Failed to fetch contributors.', {
                    icon: '😭',
                });
            }
        };

        fetchContributors();
        dispatch(getProject(projectId));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, projectId]);

    useEffect(() => {
        if (isErrorProject) {
            toast.error(messageProject, { icon: '😭' });
        }
        if (isErrorContributors) {
            toast.error(messageContributors, { icon: '😭' });
        }
    }, [
        isErrorProject,
        isErrorContributors,
        messageProject,
        messageContributors,
    ]);

    const [userIdToAdd, setUserIdToAdd] = useState('');

    const handleAddContributor = async () => {
        if (userIdToAdd) {
            try {
                dispatch(addContributor({ projectId, userId: userIdToAdd }));
                setUserIdToAdd('');

                const userIds = await dispatch(
                    getContributors(projectId),
                ).unwrap();
                const users = await Promise.all(
                    userIds.map(projectAPIService.getUser),
                );
                setContributorsDetails(users);
            } catch (error) {
                toast.error(error.message || 'Failed to add contributor.', {
                    icon: '😭',
                });
            }
        } else {
            toast.error('Please enter a user ID to add.');
        }
    };

    const handleRemoveContributor = async (userId) => {
        dispatch(removeContributor({ projectId, userId }));

        const userIds = await dispatch(getContributors(projectId)).unwrap();
        const users = await Promise.all(userIds.map(projectAPIService.getUser));
        setContributorsDetails(users);
    };

    // if (isLoadingContributors) {
    //     return <Spinner />;
    // }

    return (
        <Container>
            <Row>
                <Col className="mg-top text-center">
                    <h1>Edit Collaborators</h1>
                    <hr className="hr-text" />
                </Col>
            </Row>
            {/* <Row>
                <Col>
                    <h2>{currentProject.name}</h2>
                    <p>{currentProject.description}</p>
                </Col>
            </Row> */}
            <Row className="mt-3">
                <Col md={8}>
                    <Form inline>
                        <Form.Control
                            type="text"
                            value={userIdToAdd}
                            onChange={(e) => setUserIdToAdd(e.target.value)}
                            placeholder="Enter User ID to add"
                            className="mr-2"
                        />
                        <Button
                            variant="primary"
                            onClick={handleAddContributor}
                        >
                            Add Contributor
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    {contributorsDetails.length > 0 ? (
                        <ListGroup>
                            {contributorsDetails.map((contributor) => (
                                <ListGroup.Item
                                    key={contributor.pkid}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    {contributor.first_name}{' '}
                                    {contributor.last_name} (
                                    {contributor.username})
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() =>
                                            handleRemoveContributor(
                                                contributor.pkid,
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>This project has no contributors.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ContributorsPage;
