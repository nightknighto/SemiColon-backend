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
    {
      name: "Participants",
      description: "Participants Endpoints",
    },
    {
      name: "Log",
      description: "Log Endpoints",
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
    Log: {
      $adminId: "",
      $adminPhone: "01xxxxxxxxx",
      $participantId: "",
      $action: "add",
    },
  },
  servers: [
    {
      url: "https://semicolon-registration-backend.onrender.com/",
    },
  ],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./api.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
//https://blog.logrocket.com/documenting-express-js-api-swagger/
//https://github.com/davibaltar/example-swagger-autogen-with-router/tree/main
