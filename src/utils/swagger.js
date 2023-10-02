import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from '../config.js';

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "E-commerce application",
            description: "This in an e-commerce app",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
  };

  export const specs = swaggerJSDoc(swaggerOptions);