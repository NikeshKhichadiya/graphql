import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Client from './components/Client';

const App: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <div className='container'>
        <Client />
      </div>
    </Fragment>
  )
}

export default App;