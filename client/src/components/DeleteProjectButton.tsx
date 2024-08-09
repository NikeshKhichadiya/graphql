import { useMutation } from '@apollo/client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { DeleteProject } from '../models/ProjectModel';
import { GET_PROJECTS } from '../queries/projectQueries';

interface DeleteProjectData {
    deleteProject: {
        id: string;
    };
}

const DeleteProjectButton: React.FC<DeleteProject> = (props) => {

    const navigate = useNavigate();

    const [deleteProject] = useMutation<DeleteProjectData, DeleteProject>(DELETE_PROJECT, {
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECTS }]
    });

    const handleClick = async (): Promise<void> => {

        try {
            await deleteProject({ variables: { id: props.id } });
        } catch (error) { console.error('Error deleting project:', error); }

    };

    return (
        <div className='d-flex mt-5 ms-auto'>
            <button className="btn btn-danger m-2" onClick={() => handleClick()}>
                <FaTrash className='icon' /> Delete Project
            </button>
        </div>
    )
}

export default DeleteProjectButton;