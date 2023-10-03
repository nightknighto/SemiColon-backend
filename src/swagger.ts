const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })
require('dotenv').config()

const doc = {
    info: {
        title: 'Semicolon API',
    },
    basePath: '/',
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'User',
            description: 'User Endpoints',
        },
        {
            name: 'Auth',
            description: 'Authentication Endpoints',
        },
        {
            name: 'Participants',
            description: 'Participants Endpoints',
        },
        {
            name: 'Log',
            description: 'Log Endpoints',
        },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    definitions: {
        User: {
            $_id: '64583be0090f575e810b0999',
            $username: 'Ahmed Atwa',
            $role: 'admin',
            $active: true,
            $updatedAt: '2021-07-01T00:00:00.000Z',
            $phone: '01xxxxxxxxx',
        },
        Participant: {
            $_id: 'xxxxx',
            $name: 'Omar Fahmy',
            $email: 'Omar_Fahmy@gmail.com',
            $phone: '01xxxxxxxxx',
            $firstPreference: 'Web Development (ReactJS)',
            $secondPreference: 'Web Development (NodeJS)',
            $firstPrefReason: '',
            $firstPrefKnowledge: '',
            $secondPrefReason: '',
            $pastExperience: '',
            $collegeId: '18xxxxx',
            $year: 'Junior',
            $acceptanceStatus: 'accepted',
            $emailedStatus: 'true',
            $createdAt: '2021-07-01T00:00:00.000Z',
            $updatedAt: '2021-07-01T00:00:00.000Z',
            InterviewerNote: {
                $interviewNotes: {
                    Teamwork: {
                        rating: 4,
                        note: 'Very good teamwork skills',
                        _id: '64ca1de9f25c1d1689368202',
                    },
                },
                $interviewerId: {
                    _id: '64b14d016067b13617b1acf3',
                    phone: '01113629376',
                    role: 'admin',
                    username: 'Atwa',
                },
                $date: '2023-08-02T09:12:09.848Z',
                $_id: '64ca1de9f25c1d1689368201',
            },
        },
        Log: {
            $adminId: '',
            $adminPhone: '01xxxxxxxxx',
            $participantId: '',
            $action: 'add',
        },
        UserUpdate: {
            username: 'Ahmed Atwa',
            role: 'hr',
            active: true,
            phone: '01xxxxxxxxx',
        },
        LoginData: {
            $phone: '01xxxxxxxxx',
            $password: '********',
        },
        LoginResponse: {
            $status: 'success',
            $data: {
                $username: 'Ahmed Atwa',
                $role: 'admin',
                $token: 'xxxxxxx',
            },
        },
        AllPars: {
            $status: 'success',
            $data: [
                {
                    $ref: '#/definitions/Participant',
                },
            ],
        },
        AllUsers: {
            $status: 'success',
            $data: [
                {
                    $ref: '#/definitions/User',
                },
            ],
        },
    },
    servers:
        process.env.NODE_ENV === 'development'
            ? [
                  {
                      url: `http://localhost:${process.env.PORT}`,
                  },
                  {
                      url: 'https://semicolon-registration-backend.onrender.com/',
                  },
              ]
            : [
                  {
                      url: 'https://semicolon-registration-backend.onrender.com/',
                  },
              ],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
//https://blog.logrocket.com/documenting-express-js-api-swagger/
//https://github.com/davibaltar/example-swagger-autogen-with-router/tree/main
