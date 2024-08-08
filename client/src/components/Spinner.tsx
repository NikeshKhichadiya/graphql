import React from 'react'

const Spinner: React.FC = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div className="spinner-border" role='status'>
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default Spinner;