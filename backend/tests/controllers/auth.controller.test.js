import { expect } from "chai";
import sinon from "sinon";
import esmock from "esmock";

describe("Auth Controllers", () => {
    let registerUser;
    let loginUser;
    let getCurrentUser;

    let registerUserService;
    let loginUserService;
    let getCurrentUserService;

    beforeEach(async () => {
        try {
            registerUserService = sinon.stub();
            loginUserService = sinon.stub();
            getCurrentUserService = sinon.stub();

            ({
                registerUser,
                loginUser,
                getCurrentUser,
            } = await esmock("../../src/controllers/auth.controller.js", {
                "../../src/services/auth.service.js": {
                    registerUserService,
                    loginUserService,
                    getCurrentUserService,
                },
            }));
        } catch (error) {
            throw new Error(
                `Failed to set up auth controller tests: ${error.message}`,
                { cause: error }
            );
        }
    });

    function createResponse() {
        return {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
        };
    }

    describe("registerUser", () => {
        it("should reject registration when required fields are missing", async () => {
            const req = {
                body: {
                    name: "",
                    email: "",
                    password: "",
                },
            };

            const res = createResponse();

            await registerUser(req, res);

            expect(res.status.calledWith(400)).to.equal(true);
            expect(
                res.json.calledWith({
                    message: "Name, email and password are required",
                })
            ).to.equal(true);

            expect(registerUserService.called).to.equal(false);
        });

        it("should return 201 when registration succeeds", async () => {
            const result = {
                message: "User registered successfully",
                token: "test-token",
            };

            registerUserService.resolves(result);

            const req = {
                body: {
                    name: "John",
                    email: "john@example.com",
                    password: "password123",
                },
            };

            const res = createResponse();

            await registerUser(req, res);

            expect(res.status.calledWith(201)).to.equal(true);
            expect(res.json.calledWith(result)).to.equal(true);
        });
    });

    describe("loginUser", () => {
        it("should reject missing email or password", async () => {
            const req = {
                body: {
                    email: "",
                    password: "",
                },
            };

            const res = createResponse();

            await loginUser(req, res);

            expect(res.status.calledWith(400)).to.equal(true);
            expect(
                res.json.calledWith({
                    message: "Email and password are required",
                })
            ).to.equal(true);
        });

        it("should return 200 when login succeeds", async () => {
            const result = {
                message: "Login successful",
                token: "test-token",
            };

            loginUserService.resolves(result);

            const req = {
                body: {
                    email: "john@example.com",
                    password: "password123",
                },
            };

            const res = createResponse();

            await loginUser(req, res);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.json.calledWith(result)).to.equal(true);
        });
    });

    describe("getCurrentUser", () => {
        it("should return the current user", async () => {
            const user = {
                id: "user123",
                name: "John",
                email: "john@example.com",
            };

            getCurrentUserService.resolves(user);

            const req = {
                user: {
                    userId: "user123",
                },
            };

            const res = createResponse();

            await getCurrentUser(req, res);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(
                res.json.calledWith({ user })
            ).to.equal(true);
        });
    });
});