import { ApolloCache, useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaUser } from 'react-icons/fa';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { AddProject, ProjectModel } from '../models/ProjectModel';
import { Spinner } from 'react-bootstrap';
import { ClientModel, GetClientsResponse } from '../models/ClientModel';
import { GET_PROJECTS } from '../queries/projectQueries';


const AddProjectModel: React.FC = () => {

    const [show, setShow] = useState(false);
    const [addProjectData, setAddProjectData] = useState<AddProject>({ name: '', description: '', clientId: '', status: 'new' })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Get clients for select
    const { loading, error, data } = useQuery<GetClientsResponse>(GET_CLIENTS);

    const [addProject] = useMutation<{ addProject: AddProject }, ProjectModel>(ADD_PROJECT, {
        update(cache: ApolloCache<{ projects: ProjectModel[] }>, { data }) {
            if (!data) return;

            const existingProjects = cache.readQuery<{ projects: ProjectModel[] }>({ query: GET_PROJECTS });

            if (existingProjects) {
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: {
                        projects: [...existingProjects.projects, data.addProject]
                    },
                });
            }
        }
    });

    const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

        e.preventDefault();

        console.log(addProjectData)

        if (addProjectData.name === '' || addProjectData.description === '' || addProjectData.status === '' || addProjectData.clientId === '') {

            return alert('All fields are required')

        }

        try {

            await addProject({ variables: addProjectData });
            setAddProjectData({ ...addProjectData, name: '', description: '', status: '', clientId: '' });
            setShow(false);

        } catch (error: unknown) { console.error('Error adding project:', error); }

    }

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return (
        <Fragment>
            <Button variant="secondary" onClick={handleShow}>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <FaUser className='icon' />
                    Add Project
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name='name'
                                value={addProjectData['name']}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAddProjectData({ ...addProjectData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name='description'
                                value={addProjectData['description']}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAddProjectData({ ...addProjectData, description: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                name="status"
                                id="status"
                                className='form-select'
                                value={addProjectData['status']}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setAddProjectData({ ...addProjectData, status: e.target.value })}>
                                <option value="new">Not Started</option>
                                <option value="progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="clients" className="form-label">Clients</label>
                            <select
                                name="clients"
                                id="clients"
                                className='form-select'
                                value={addProjectData['clientId']}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setAddProjectData({ ...addProjectData, clientId: e.target.value })}>
                                <option value="">Select Clients</option>
                                {
                                    (!!data && Array.isArray(data.clients))
                                    &&
                                    data?.clients.map((client: ClientModel) => <option value={client.id} key={client.id}> {client.name} </option>)
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

export default AddProjectModel;