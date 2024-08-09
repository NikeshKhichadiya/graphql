export interface ProjectModel {
    id?: string;
    name: string;
    status: string;
}

export interface GetProjectsResponse {
    projects: ProjectModel[];
}

export interface GetProjectData {
    project: {
        id: string;
        name: string;
        description: string;
        status: string;
        client: {
            id: string;
            name: string;
            email: string;
            phone: string;
        };
    };
}

export interface AddProject {
    clientId: string;
    name: string;
    description: string;
    status: string;
}

export interface DeleteProject {
    id: string
}