import { ApolloCache, useMutation } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { ClientModel } from '../models/ClientModel';
import { GET_CLIENTS } from '../queries/clientQueries';


const AddClientModel: React.FC = () => {

    const [show, setShow] = useState(false);
    const [addClientData, setAddClientData] = useState<ClientModel>({ name: '', phone: '', email: '' })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addClient] = useMutation<{ addClient: ClientModel }, ClientModel>(ADD_CLIENT, {
        update(cache: ApolloCache<{ clients: ClientModel[] }>, { data }) {
            if (!data) return; // Ensure data is not undefined

            const existingClients = cache.readQuery<{ clients: ClientModel[] }>({ query: GET_CLIENTS });

            if (existingClients) {
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: {
                        clients: [...existingClients.clients, data.addClient] // Spread the existing clients and add the new one
                    },
                });
            }
        }
    });

    const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

        e.preventDefault();

        if (addClientData.name === '' || addClientData.email === '' || addClientData.phone === '') {

            alert('All fields are required')

        }

        try {

            await addClient({ variables: addClientData });
            setAddClientData({ ...addClientData, name: '', email: '', phone: '' });
            setShow(false);

        } catch (error: unknown) { console.error('Error adding client:', error); }

    }

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <FaUser className='icon' />
                    Add Client
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Client</Modal.Title>
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAddClientData({ ...addClientData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name='email'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAddClientData({ ...addClientData, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name='phone'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAddClientData({ ...addClientData, phone: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddClientModel