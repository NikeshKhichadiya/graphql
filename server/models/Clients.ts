import { model, Schema, Document } from "mongoose";

export interface Client extends Document {
    name: string;
    email: string;
    phone: string;
}

const ClientSchema = new Schema<Client>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

const ClientModel = model<Client>('Client', ClientSchema);

export default ClientModel;