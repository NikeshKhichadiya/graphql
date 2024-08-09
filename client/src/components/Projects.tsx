import { useQuery } from '@apollo/client';
import React from 'react'
import { GetProjectsResponse, ProjectModel } from '../models/ProjectModel';
import { GET_PROJECTS } from '../queries/projectQueries';
import { Spinner } from 'react-bootstrap';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {

    const { loading, error, data } = useQuery<GetProjectsResponse>(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) return <p>ASomething went wrong</p>;

    return (
        <div>
            {(!!data && Array.isArray(data?.projects) && data.projects.length > 0) &&
                data.projects.map((project: ProjectModel) => <ProjectCard key={project.id} {...project} />)
            }
        </div>
    )
}

export default Projects;