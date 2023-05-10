const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Semicolon API",
  },
  host: process.env.PORT,
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routers/auth.router.ts",
  "./routers/global.router.ts",
  "./routers/log.router.ts",
  "./routers/participant.router.ts",
  "./routers/user.router.ts",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
