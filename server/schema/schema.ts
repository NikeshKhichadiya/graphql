import { handleError } from '../config/errorHandler';
import { models, Client, Project } from '../models/';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLFieldConfigMap,
    GraphQLList,
    GraphQLResolveInfo,
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

export const schema = new GraphQLSchema({
    query: RootQuery,
});