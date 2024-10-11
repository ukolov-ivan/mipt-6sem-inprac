import React, { useEffect } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getIssuesForProject } from "../features/projects/issueSlice";
import { getProject } from "../features/projects/projectSlice";

const ISSUE_STATUS = {
    "P": { label: "Pending", color: "red" },
    "IP": { label: "In Progress", color: "yellow" },
    "D": { label: "Done", color: "green" },
};

const ProjectPage = () => {
    const { projectId } = useParams();
    const { currentProject, isLoading: isLoadingProject, isError: isErrorProject, message: messageProject } = useSelector(
        (state) => state.projects
    );

    const { issues, isLoading: isLoadingIssues, isError: isErrorIssues, message: messageIssues } = useSelector(
        (state) => state.issues
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isErrorProject) {
            toast.error(messageProject, { icon: "😭" });
        }
        if (isErrorIssues) {
            toast.error(messageIssues, { icon: "😭" });
        }
        dispatch(getIssuesForProject(projectId));
        dispatch(getProject(projectId));
    }, [dispatch, isErrorProject, isErrorIssues, messageProject, messageIssues, projectId]);

    if (isLoadingProject || isLoadingIssues) {
        return <Spinner />;
    }
    return (
        <Container>
            <Row>
                {/* <h1>{currentProject.name}</h1> */}
                {/* <p>{currentProject.description}</p> */}
                {/* <h2>Issues</h2> */}
                <Col className="mg-top text-center">
                    {/* placeholder */}
                    <hr className="hr-text" />
                </Col>
            </Row>
            <Row>
                <h1>{currentProject.name}</h1>
                <p>{currentProject.description}</p>
            </Row>
            <Row>
                <Button
                    variant="primary"
                    as={Link}
                    to={`/projects/${projectId}/contributors/`}
                >
                    See Contributors
                </Button>
                <Button
                    variant="primary"
                    as={Link}
                    to={`/projects/${projectId}/issues/create/`}
                >
                    Create New Issue
                </Button>
            </Row>
            {/* <Row>
                <h2>Issues</h2>
            </Row> */}
            <div>
                {issues.length > 0 ? (
                    <ListGroup>
                        {issues.map((issue) => {
                            const statusInfo = ISSUE_STATUS[issue.status] || { label: "Unknown", color: "gray" };
                            return (
                                <ListGroup.Item
                                    key={issue.id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h3>{issue.title}</h3>
                                        <p>{issue.description}</p>
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '5px 10px',
                                            backgroundColor: statusInfo.color,
                                            color: 'white',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}>
                                            {statusInfo.label}
                                        </div>
                                        <p>
                                            <strong>Created At:</strong> {new Date(issue.created_at).toLocaleString()}&nbsp;&nbsp;&nbsp;&nbsp;
                                            <strong>Updated At:</strong> {new Date(issue.updated_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <Button
                                        variant="primary"
                                        as={Link}
                                        to={`/projects/${projectId}/issues/${issue.id}/edit/`}
                                    >
                                        Edit
                                    </Button>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                ) : (
                    <p>This project doesn't have any issues.</p>
                )}
            </div>
        </Container>
    );
};

export default ProjectPage;
