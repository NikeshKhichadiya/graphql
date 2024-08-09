import React from 'react';
import { ClientModel } from '../models/ClientModel';
import { FaTrash } from 'react-icons/fa';
import { useMutation, ApolloCache } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

const ClientRow: React.FC<ClientModel> = (props) => {

    const [deleteClient] = useMutation<{ deleteClient: { id: string } }, { id: string }>(DELETE_CLIENT, {
        update(cache: ApolloCache<{ clients: ClientModel[] }>, { data }) {
            const existingClients = cache.readQuery<{ clients: ClientModel[] }>({ query: GET_CLIENTS });

            if (existingClients && data) {
                const newClients = existingClients.clients.filter(client => client.id !== data.deleteClient.id);
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: { clients: newClients },
                });
            }
        },
    });

    const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = async () => {

        try {
            await deleteClient({ variables: { id: !!props.id ? props.id : '' } });
            console.log('Client deleted successfully');
        } catch (error: unknown) {
            console.error('Error deleting client:', error);
        }

    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>

                <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
                    <FaTrash />
                </button>

            </td>
        </tr>
    )
}

export default ClientRow;