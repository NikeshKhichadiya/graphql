import { useQuery } from '@apollo/client';
import React, { Fragment } from 'react'
import { GET_PROJECT } from '../queries/projectQueries';
import { GetProjectData } from '../models/ProjectModel';
import { Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';

const Project: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery<GetProjectData>(GET_PROJECT, { variables: { id } });

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return (

        <Fragment>
            {
                (!!data && !!data.project) &&

                <div className="mx-auto w-75 card p-5">

                    <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
                        Back
                    </Link>

                    <h1>{data?.project.name}</h1>
                    <p>{data?.project.description}</p>

                    <h5 className='mt-3'>Project Status</h5>
                    <p className='lead'>{data?.project.status}</p>

                    <ClientInfo {...data.project.client} />

                    <DeleteProjectButton id={data.project.id} />

                </div>
            }
        </Fragment>

    )
}

export default Project;