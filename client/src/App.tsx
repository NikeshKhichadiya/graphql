import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const App: React.FC = () => {
  return (
    <Fragment>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  )
}

export default App;