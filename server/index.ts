import express, { Express } from "express";
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema/schema';
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(cors())

// Connect to database
connectDB();

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!"
  },
}

// GraphQL endpoint
app.all('/graphql', createHandler({ schema: schema, rootValue: root }));

app.listen(port, () => console.log(`server running omn port ${port}`));

