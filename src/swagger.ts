const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Semicolon API",
  },
  host: process.env.PORT,
};

const outputFile = "./build/swagger_output.json";
const endpointsFiles = ["./src/api.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
