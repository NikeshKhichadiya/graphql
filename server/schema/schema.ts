import { handleError } from '../config/errorHandler';
import { models, Client, Project } from '../models/';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLFieldConfigMap,
    GraphQLList,
    GraphQLEnumType,
    GraphQLNonNull
} from 'graphql';

// Define the GraphQL type for Client
const ClientType: GraphQLObjectType<Client, any> = new GraphQLObjectType({
    name: 'Client',
    fields: (): GraphQLFieldConfigMap<Client, any> => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});


const ProjectType: GraphQLObjectType<Project, any> = new GraphQLObjectType({
    name: 'Project',
    fields: (): GraphQLFieldConfigMap<Project, any> => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve: async (parent: Project) => {
                return await models.ClientSchema.findById(parent.clientId).exec();
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // Projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: async (): Promise<Project[]> => {

                try {
                    const projects = await models.ProjectSchema.find().exec();
                    return projects;
                } catch (error: unknown) { return handleError(error, 'Clients'); }

            },
        },

        // Project
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args): Promise<Project | null> => {

                try {
                    const project = await models.ProjectSchema.findById(args.id).exec();
                    if (!project) { throw new Error('Project not found'); }
                    return project;
                } catch (error: unknown) { return handleError(error, 'Clients'); }

            }
        },

        // Clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve: async (): Promise<Client[]> => {

                try {
                    const clients = await models.ClientSchema.find().exec();
                    return clients;
                } catch (error: unknown) { return handleError(error, 'Clients'); }

            },
        },

        // client
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args): Promise<Client | null> => {

                try {
                    const client = await models.ClientSchema.findById(args.id).exec();
                    if (!client) { throw new Error('client not found'); }
                    return client;
                } catch (error: unknown) { return handleError(error, 'client') }

            }
        }

    },
});

// mutations
const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args): Client | null => {

                try {
                    const client = new models.ClientSchema({
                        name: args.name,
                        email: args.email,
                        phone: args.phone
                    });
                    client.save();
                    return client
                } catch (error: unknown) { return handleError(error, 'client') }

            }
        },

        //Delete the client
        deleteClient: {

            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args): Promise<Client | null> => {

                try {
                    const client = await models.ClientSchema.findOneAndDelete({ _id: args.id });
                    return client
                } catch (error: unknown) { return handleError(error, 'client') }

            }

        },

        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Not Started' }
                        },

                    })
                },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args): Project | null => {

                try {

                    const project = new models.ProjectSchema({
                        name: args.name,
                        description: args.description,
                        status: args.status,
                        clientId: args.clientId
                    });
                    project.save();
                    return project

                } catch (error: unknown) { return handleError(error, 'project') }

            }
        },

        // delete a project
        deleteProject: {

            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args): Promise<Project | null> => {

                try {
                    const project = await models.ProjectSchema.findOneAndDelete({ _id: args.id });
                    return project
                } catch (error: unknown) { return handleError(error, 'project') }

            }

        },

        // delete a project
        updateProject: {

            type: ProjectType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Not Started' }
                        },
                    })
                },
            },
            resolve: async (parent, args): Promise<Project | null> => {

                try {

                    const project = await models.ProjectSchema.findByIdAndUpdate(args.id, {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        },
                    },
                        {
                            new: true
                        }
                    );
                    return project

                } catch (error: unknown) { return handleError(error, 'project') }

            }

        }

    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});