// Define the Client interface
export interface ClientModel {
    id?: string;
    name: string;
    email: string;
    phone: string;
}

// Define the response structure
export interface GetClientsResponse {
    clients: ClientModel[];
}