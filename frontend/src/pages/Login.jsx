import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Failed to login");
            }

            localStorage.setItem("token", data.token);

            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl min-h-[670px] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">

        {/* leftt */}
        <div className="w-full md:w-1/2 bg-pastel-pink p-8 md:p-14 flex flex-col">

          <div className="flex items-center gap-3 text-pastel-text">
            <span className="text-2xl font-display font-bold">
              Petal Notes
            </span>
          </div>

          <div className="mt-28 max-w-lg">
            <h1 className="font-display text-5xl font-extrabold leading-tight text-pastel-text">
              A little space,
              <br />
              for your thoughts.
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-pastel-muted">
              Small thoughts, ideas, reminders : all in one place.
            </p>
          </div>

          <div className="mt-4 md:mt-auto flex gap-5">
            <div className="w-14 h-14 rounded-full bg-pastel-blue" />
            <div className="w-14 h-14 rounded-full bg-pastel-green" />
            <div className="w-14 h-14 rounded-full bg-pastel-yellow" />
            <div className="w-14 h-14 rounded-full bg-pastel-purple" />
          </div>

        </div>


        {/* right*/}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 p-8 md:p-14 flex flex-col justify-center">

          <div className="flex bg-pink-50 rounded-2xl p-1 mb-12">
            <button className="w-1/2 py-3 rounded-2xl bg-white text-pastel-text font-display font-semibold shadow-sm">
              Log in
            </button>

            <button className="w-1/2 py-3 text-pastel-muted font-display font-semibold">
              Sign up
            </button>
          </div>


          <div className="mb-10">
            <h2 className="font-display text-4xl font-bold text-pastel-text">
              Welcome back!
            </h2>

            <p className="mt-3 text-lg text-pastel-muted">
              Log in to open your notes.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-3 text-sm font-semibold tracking-wide text-pastel-muted">
                EMAIL
              </label>

              <div className="flex items-center border border-pink-200 bg-pink-50 rounded-2xl overflow-hidden">
                <div className="px-5">
                  <Mail size={22} className="text-pastel-muted" />
                </div>

                <input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-pastel-button text-pastel-text"
                />
              </div>
            </div>


            <div className="mb-8">
              <label className="block mb-3 text-sm font-semibold tracking-wide text-pastel-muted">
                PASSWORD
              </label>

              <div htmlFor="password" className="flex items-center border border-pink-200 bg-pink-50 rounded-2xl overflow-hidden">
                <div className="px-5">
                  <Lock size={22} className="text-pastel-muted" />
                </div>

                <input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-pastel-button text-pastel-text"
                />
              </div>
            </div>

            {error && (
                <p
                    role="alert"
                    className="mb-6 text-sm text-red-500"
                >
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-pastel-button hover:brightness-95 transition py-4 rounded-2xl text-pastel-text font-display text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-60"
            >
                {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

export default Login;