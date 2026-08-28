import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../pages/Login";

const mockNavigate = jest.fn();

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useNavigate: () => mockNavigate,
// }));
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));


beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});

test("renders login form", () => {
    render(<Login />);

    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    expect(screen.getByLabelText("EMAIL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
});

test("allows user to enter email and password", async () => {
    const user = userEvent.setup();

    render(<Login />);

    const email = screen.getByPlaceholderText("Email address");
    const password = screen.getByPlaceholderText("Password");

    await user.type(email, "test@example.com");
    await user.type(password, "password123");

    expect(email).toHaveValue("test@example.com");
    expect(password).toHaveValue("password123");
});

test("logs in successfully and stores token", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            token: "test-token",
        }),
    });

    render(<Login />);

    await user.type(
        screen.getByPlaceholderText("Email address"),
        "test@example.com"
    );

    await user.type(
        screen.getByPlaceholderText("Password"),
        "password123"
    );

    await user.click(screen.getByRole("button", { name: "Log in"  }));

    expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth/login"),
        expect.objectContaining({
            method: "POST",
        })
    );

    expect(localStorage.getItem("token")).toBe("test-token");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
});

test("displays login error when request fails", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
            message: "Invalid email or password",
        }),
    });

    render(<Login />);

    await user.type(
        screen.getByPlaceholderText("Email address"),
        "wrong@example.com"
    );

    await user.type(
        screen.getByPlaceholderText("Password"),
        "wrongpassword"
    );

    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(
        await screen.findByRole("alert")
    ).toHaveTextContent("Invalid email or password");

    expect(mockNavigate).not.toHaveBeenCalled();
});

test("switches to registration mode", async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(screen.getByText("Create your account!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: "Create account" })
    ).toBeInTheDocument();
});