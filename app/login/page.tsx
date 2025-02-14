"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [providers, setProviders] = useState<Record<string, { id: string; name: string }> | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      const provs = await getProviders();
      setProviders(provs);
    };
    fetchProviders();
    if (session) {
      router.push("/home");
    }
  }, [router, session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="bg-primarybg h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 shadow-xl p-10 rounded-xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          {/* Email Input */}
          <label className="form-control w-full">
            <div className="label">
              <span className="text-white">Email</span>
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* Password Input */}
          <label className="form-control w-full">
            <div className="label">
              <span className="text-white">Password</span>
            </div>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-full hover:bg-primary-focus transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="divider text-gray-400">OR</div>

        {/* Social Login Buttons */}
        {providers &&
              Object.values(providers).map((provider) =>
                provider.id !== "credentials" ? (
                  <button
                    className="px-12 py-4 rounded-xl text-black text-lg bg-white hover:bg-gray-300"
                    key={provider.id}
                    onClick={() => {
                      signIn(provider.id, { callbackUrl: "/home" });
                    }}
                  >
                    Sign up with {provider.name}
                  </button>
                ) : null
              )}

        {/* Signup Redirect */}
        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
