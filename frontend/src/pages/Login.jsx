import { Heart, Mail, Lock } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-sky-100 to-pink-200 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl min-h-[670px] bg-white rounded-[42px] overflow-hidden shadow-xl flex flex-col md:flex-row">

        {/* leftt */}
        <div className="w-full md:w-1/2 bg-pastel-pink p-8 md:p-14 flex flex-col">

          <div className="flex items-center gap-3 text-pastel-text">
            <Heart size={30} />
            <span className="text-2xl font-display font-bold">
              Petal Notes
            </span>
          </div>

          <div className="mt-28 max-w-lg">
            <h1 className="font-display text-5xl font-extrabold leading-tight text-pastel-text">
              Your thoughts,
              <br />
              wrapped in pastels.
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-pastel-muted">
              Write little notes and keep everything in one little corner of the internet.
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

          <div className="flex bg-pink-50 rounded-full p-1 mb-12">
            <button className="w-1/2 py-3 rounded-full bg-white text-pastel-text font-display font-semibold shadow-sm">
              Log in
            </button>

            <button className="w-1/2 py-3 text-pastel-muted font-display font-semibold">
              Sign up
            </button>
          </div>


          <div className="mb-10">
            <h2 className="font-display text-4xl font-bold text-pastel-text">
              Welcome back..
            </h2>

            <p className="mt-3 text-lg text-pastel-muted">
              Log in to open your notes.
            </p>
          </div>


          <div className="mb-6">
            <label htmlFor="email" className="block mb-3 text-sm font-semibold tracking-wide text-pastel-muted">
              EMAIL
            </label>

            <div className="flex items-center border border-pink-200 bg-pink-50 rounded-full overflow-hidden">
              <div className="px-5">
                <Mail size={22} className="text-pastel-muted" />
              </div>

              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-pastel-button text-pastel-text"
              />
            </div>
          </div>


          <div className="mb-8">
            <label className="block mb-3 text-sm font-semibold tracking-wide text-pastel-muted">
              PASSWORD
            </label>

            <div htmlFor="password" className="flex items-center border border-pink-200 bg-pink-50 rounded-full overflow-hidden">
              <div className="px-5">
                <Lock size={22} className="text-pastel-muted" />
              </div>

              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-pastel-button text-pastel-text"
              />
            </div>
          </div>


          <button className="w-full bg-pastel-button hover:brightness-95 transition py-4 rounded-full text-pastel-text font-display text-lg font-bold flex items-center justify-center gap-2">
            Log in
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;