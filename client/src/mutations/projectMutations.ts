import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
    mutation AddProject($name:String!, $status:ProjectStatus!, $description:String!, $clientId:ID!){
        addProject(name:$name, status:$status, description:$description, clientId:$clientId){
            id
            name
            description
            status
            client{
                name
                id
                email
                phone
            }
        }
    }
`

export const DELETE_PROJECT = gql`
    mutation DeleteProject($id:ID!){
        deleteProject(id:$id){
            id
        }
    }
`