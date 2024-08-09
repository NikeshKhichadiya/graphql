import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Spinner } from 'react-bootstrap';
import ClientRow from './ClientRow';
import type { ClientModel, GetClientsResponse } from '../models/ClientModel';

const Clients: React.FC = () => {

    const { loading, error, data } = useQuery<GetClientsResponse>(GET_CLIENTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return (
        <table className='table table-hover mt-3'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {(!!data && Array.isArray(data?.clients) && data.clients.length > 0) &&
                    data.clients.map((client: ClientModel) => <ClientRow key={client.id} {...client} />)
                }
            </tbody>
        </table>
    )

}

export default Clients;