const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Semicolon API",
  },
  tags: [
    {
      name: "User",
      description: "User Endpoints",
    },
    {
      name: "Auth",
      description: "Authentication Endpoints",
    },
  ],
  definitions: {
    User: {
      $username: "Ahmed Atwa",
      $phone: "01xxxxxxxxx",
      $password: "********",
      $role: "admin",
      $active: "true",
    },
    Participant: {
      $name: "Omar Fahmy",
      $email: "Omar_Fahmy@gmail.com",
      $phone: "01xxxxxxxxx",
      $firstPreference: "Web Development (ReactJS)",
      $secondPreference: "Web Development (NodeJS)",
      $firstPrefReason: "",
      $firstPrefKnowledge: "",
      $secondPrefReason: "",
      $pastExperience: "",
      $collegeId: "18xxxxx",
      $year: "Junior",
      $acceptanceStatus: "accepted",
      $emailedStatus: "true",
    },
  },
  host: process.env.PORT,
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./api.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
