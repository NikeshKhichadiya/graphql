// Mongoose schema
import ClientSchema from "./Clients";
import ProjectSchema from "./Project";

// interface
import { Client } from './Clients';
import { Project } from './Project';

export const models = { ClientSchema, ProjectSchema }
export type { Client, Project }