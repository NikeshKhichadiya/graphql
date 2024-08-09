import React from 'react'
import { ProjectModel } from '../models/ProjectModel';
import { Link } from 'react-router-dom';

const ProjectCard: React.FC<ProjectModel> = (props) => {
    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{props.name}</h5>
                        <Link className="btn btn-light" to={`/project/${props.id}`}>
                            View
                        </Link>
                    </div>
                    <p className="small">
                        Status: <strong>{props.status}</strong>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default ProjectCard;