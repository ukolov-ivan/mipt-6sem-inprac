import React, { useEffect } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Project from '../components/Project';
import Spinner from '../components/Spinner';
import { deleteProject, getProjects } from '../features/projects/projectSlice';

const ProjectsPage = () => {
    const { projects, isLoading, isError, message } = useSelector(
        (state) => state.projects,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message, { icon: '😭' });
        }
        dispatch(getProjects());
    }, [dispatch, isError, message]);

    const handleDelete = (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            dispatch(deleteProject(projectId));
            dispatch(getProjects());
        }
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Container>
            <Row>
                <Col className="mg-top text-center">
                    <h1>Your Projects</h1>
                    <hr className="hr-text" />
                </Col>
            </Row>
            <Row>
                <Col className="text-center mb-3">
                    <Button
                        variant="primary"
                        as={Link}
                        to={`/projects/create/`}
                    >
                        Create New Project
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {projects.map((project) => (
                            <ListGroup.Item
                                key={project.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Project project={project} />
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    Delete
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProjectsPage;
