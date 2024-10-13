import React from "react";
import { Card, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from 'prop-types';

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

Project.propTypes = {
	project: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		created_at: PropTypes.string.isRequired,
	}).isRequired,
};

export default Project;
