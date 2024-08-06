import { Document, model, Schema, Types } from "mongoose";

export interface Project extends Document {
    name: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    clientId: Types.ObjectId;
}

const ProjectSchema = new Schema<Project>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
});

const ProjectModel = model<Project>('Project', ProjectSchema);

export default ProjectModel;
