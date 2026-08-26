import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../src/models/user.model.js";
import {
    registerUserService,
    loginUserService,
    getCurrentUserService,
} from "../../src/services/auth.service.js";

process.env.JWT_SECRET = "test-secret";

describe("Auth Services", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("registerUserService", () => {
        it("should register a new user successfully", async () => {
            sinon.stub(User, "findOne").resolves(null);
            sinon.stub(User.prototype, "save").resolves();

            const result = await registerUserService({
                name: "John",
                email: "john@example.com",
                password: "password123",
            });

            expect(result.message).to.equal("User registered successfully");
            expect(result.user.name).to.equal("John");
            expect(result.user.email).to.equal("john@example.com");
            expect(result.token).to.be.a("string");
        });

        it("should reject registration when email already exists", async () => {
            sinon.stub(User, "findOne").resolves({
                _id: "existing-user",
                email: "john@example.com",
            });

            try {
                await registerUserService({
                    name: "John",
                    email: "john@example.com",
                    password: "password123",
                });

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal(
                    "User with this email already exists"
                );
                expect(error.statusCode).to.equal(400);
            }
        });
    });

    describe("loginUserService", () => {
        it("should login successfully with valid credentials", async () => {
            const hashedPassword = await bcrypt.hash("password123", 10);

            const user = {
                _id: "user123",
                name: "John",
                email: "john@example.com",
                password: hashedPassword,
            };

            const selectStub = sinon.stub().resolves(user);
            sinon.stub(User, "findOne").returns({
                select: selectStub,
            });

            const result = await loginUserService(
                "john@example.com",
                "password123"
            );

            expect(result.message).to.equal("Login successful");
            expect(result.user.name).to.equal("John");
            expect(result.user.email).to.equal("john@example.com");
            expect(result.token).to.be.a("string");
        });

        it("should reject login when user does not exist", async () => {
            const selectStub = sinon.stub().resolves(null);

            sinon.stub(User, "findOne").returns({
                select: selectStub,
            });

            try {
                await loginUserService(
                    "unknown@example.com",
                    "password123"
                );

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal(
                    "Invalid email or password"
                );
                expect(error.statusCode).to.equal(401);
            }
        });

        it("should reject login when password is incorrect", async () => {
            const hashedPassword = await bcrypt.hash("correct-password", 10);

            const user = {
                _id: "user123",
                name: "John",
                email: "john@example.com",
                password: hashedPassword,
            };

            const selectStub = sinon.stub().resolves(user);

            sinon.stub(User, "findOne").returns({
                select: selectStub,
            });

            try {
                await loginUserService(
                    "john@example.com",
                    "wrong-password"
                );

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal(
                    "Invalid email or password"
                );
                expect(error.statusCode).to.equal(401);
            }
        });
    });

    describe("getCurrentUserService", () => {
        it("should return the current user", async () => {
            const user = {
                _id: "user123",
                name: "John",
                email: "john@example.com",
            };

            sinon.stub(User, "findById").resolves(user);

            const result = await getCurrentUserService("user123");

            expect(result.id).to.equal("user123");
            expect(result.name).to.equal("John");
            expect(result.email).to.equal("john@example.com");
        });

        it("should reject when user is not found", async () => {
            sinon.stub(User, "findById").resolves(null);

            try {
                await getCurrentUserService("unknown");

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal("User not found");
                expect(error.statusCode).to.equal(404);
            }
        });
    });
});