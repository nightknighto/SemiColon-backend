import superTest from "supertest";
import { Types } from "mongoose";

import { connectMONGODB, disconnectMONGODB } from "../../services/mongodb";
import { participant as ParticipantType, updateParticipant } from "../../types/participant";
import api from "../../api";
import { dbAddParticipant, dbDeleteParticipantByEmail } from "../../models/participant/participant.model";
import configs from "../../config/config";

beforeAll(async () => {
    await connectMONGODB();
    // console.log("DB TEST URL",configs.DB_URL);
});

afterAll(async () => {
    await disconnectMONGODB();
});
describe("GET /participant endpoint", () => {
    beforeAll(async () => {
        const participant1 : updateParticipant = {
            name: "Test_participant1",
            phone: "01111211111",
            email: "testuser1@gmail.com",
            firstPreference: "webDev",
            secondPreference: "webDev2",
        };
        await dbAddParticipant(participant1);

    });

    afterAll(async () => {
        await dbDeleteParticipantByEmail("testuser1@gmail.com")
    });

    test("Get all participants", async () => {
        const response = await superTest(api).get("/participants");
        expect(response.statusCode).toBe(200);
    });
});

describe("POST /participant endpoint", () => {
    test("Add a new participants", async () => {
        const participant2 : updateParticipant = {
            name: "Test_participant2",
            phone: "01111111111",
            email: "testuser2@gmail.com",
            firstPreference: "webDev",
            secondPreference: "webDev2",
        };
        const response = await superTest(api)
        .post("/participants")
        .send({participant: participant2});
        expect(response.statusCode).toBe(200);
    });

    test("Add an already added participant", async () => {
        const participant2 : updateParticipant = {
            name: "Test_participant33",
            phone: "01111111111",
            email: "testuser2@gmail.com",
            firstPreference: "webDev",
            secondPreference: "webDev2",
        };
        const response = await superTest(api)
        .post("/participants")
        .send({participant: participant2});
        expect(response.statusCode).toBe(200);
        expect(response.body.data.name).toBe("Test_participant33");
    });
    afterAll(async () => {
        await dbDeleteParticipantByEmail("testuser2@gmail.com");
    });

});

describe("PATCH /participant endpoint", () => {
    beforeAll(async () => {
        const participant2 : updateParticipant = {
            name: "Test_participant3",
            phone: "01111111411",
            email: "testuser3@gmail.com",
            firstPreference: "webDev",
            secondPreference: "webDev2",
        };
        await dbAddParticipant(participant2);
    });
    afterAll(async () => {
        await dbDeleteParticipantByEmail("testuser3@gmail.com");
    });
    test("Update a non-existing participant ", async () => {
        const response = await superTest(api)
        .patch("/participants")
        .send({email: "testuser665@gmail.com", update: {status:"accepted"}});
        expect(response.statusCode).toBe(404);
    });
    test("Update a existing participant status ", async () => {
        const response = await superTest(api)
        .patch("/participants")
        .send({email: "testuser3@gmail.com", update: {status:"accepted"}});
        expect(response.statusCode).toBe(200);
    });
    test("Update a existing participant emailed status ", async () => {
        const response = await superTest(api)
        .patch("/participants")
        .send({email: "testuser3@gmail.com", update: {emailed:"true"}});
        expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /participant endpoint", () => {
    beforeAll(async () => {
        const participant4 : updateParticipant = {
            name: "Test_participant4",
            phone: "01111111411",
            email: "testuser4@gmail.com",
            firstPreference: "webDev",
            secondPreference: "webDev2",
        };
        await dbAddParticipant(participant4);
    });
    // afterAll(async () => {
    //     await dbDeleteParticipantByEmail("testuser4@gmail.com");
    // });

    test("Delete a non-existing participant ", async () => {
        const response = await superTest(api)
        .delete("/participants")
        .send({email: "testuser65434@gmail.com"});
        expect(response.statusCode).toBe(404);
    });
    test("Delete an existing participant ", async () => {
        const response = await superTest(api)
        .delete("/participants")
        .send({email: "testuser4@gmail.com"});
        expect(response.statusCode).toBe(200);
    });
});