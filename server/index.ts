import express, { Express } from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import { createHandler } from "graphql-http/lib/use/express";
// import  schema  from './schema/schema.ts';

dotenv.config();

const app: Express = express();

// Connect to database
connectDB();

// app.all(
//     "/graphql",
//     createHandler({
//       schema: schema
//     })
//   )

const port = process.env.PORT;
app.listen(port, () => console.log(`server running omn port ${port}`))

