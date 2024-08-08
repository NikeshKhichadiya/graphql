import React from 'react';
import logo from './assets/logo.svg';

const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-light bg-light mb-4 p-0">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <div className="d-flex">
                        <img src={logo} alt="logo" className="mr-2" />
                        <div>ProjectMgmt</div>
                    </div>
                </a>
            </div>
        </nav>
    );
};

export default Header;