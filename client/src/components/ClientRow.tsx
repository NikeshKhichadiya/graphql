import React from 'react';
import { ClientModel } from '../models/ClientModel';
import { FaTrash } from 'react-icons/fa';

const ClientRow: React.FC<ClientModel> = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>

                <button className="btn btn-danger btn-sm">
                    <FaTrash />
                </button>

            </td>
        </tr>
    )
}

export default ClientRow;