const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Semicolon API",
  },
  host: process.env.PORT,
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./api.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
