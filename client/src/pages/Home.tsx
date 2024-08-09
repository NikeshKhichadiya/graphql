import React, { Fragment } from 'react'
import Projects from '../components/Projects'
import Clients from '../components/Clients'
import AddClientModel from '../components/AddClientModel'
import AddProjectModel from '../components/AddProjectModel'

const Home: React.FC = () => {
    return (
        <Fragment>
            <div className="d-flex gap-3 mb-3">
                <AddClientModel />
                <AddProjectModel />
            </div>
            <Projects />
            <Clients />
        </Fragment>
    )
}

export default Home;