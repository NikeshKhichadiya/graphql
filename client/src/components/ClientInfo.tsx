import React, { Fragment } from 'react'
import { FaIdBadge, FaEnvelope, FaPhone } from 'react-icons/fa'
import { ClientModel } from '../models/ClientModel'

const ClientInfo: React.FC<ClientModel> = (props) => {
    return (
        <Fragment>
            <h5>Client Information</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <FaIdBadge className="icon" /> {props.name}
                </li>
                <li className="list-group-item">
                    <FaEnvelope className="icon" /> {props.email}
                </li>
                <li className="list-group-item">
                    <FaPhone className="icon" /> {props.name}
                </li>
            </ul>

        </Fragment>
    )
}

export default ClientInfo