import React from "react";
import { Card, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Project = ({ project }) => {
	return (
		<Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<LinkContainer to={`/projects/${project.id}/`}>
				<Nav.Link>
					{project.name}
					{project.description}
				</Nav.Link>
			</LinkContainer>
			<p>
				<strong>Created At:</strong> {new Date(project.created_at).toLocaleDateString()}
			</p>
		</Card>
	);
};

export default Project;
