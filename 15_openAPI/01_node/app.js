import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

// here it passes the body as header ?
app.use(express.json());

import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);

const swaggerDefinition = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Users API",
            version: "0.0.1"
        },
    },
    apis: ["./routers/*Router.js"]
}
// the apis , 2 lines up, is really inportent

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routers/*Router.js"]
};

import swaggerUi from "swagger-ui-express";
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("server is running on port", PORT));

