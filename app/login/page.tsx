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
    <div className="h-screen flex-col gap-y-4 flex items-center justify-center  bg-primarybg text-white">
      <div>
        <h1 className="text-3xl font-semibold text-black text-center text-wrap">Welcome to ReelsPro</h1>

      </div>
      <div className="bg-white shadow-xl p-5 pt-8 rounded-xl h-[50%] sm:w-[30%]  border-2 border-black">
        <form onSubmit={handleLogin} className="space-y-4 ">
         
          <label className="form-control  w-full">

            <input
              type="email"
              placeholder="Enter your email"
              className="input border-2 border-gray-300 w-full  bg-white text-primaryh focus:outline-none focus:ring-2 focus:ring-primaryh"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

         
          <label className="form-control w-full">
            
            <input
              type="password"
              placeholder="********"
              className="input border-gray-300 w-full bg-white text-primaryh focus:outline-none focus:ring-2 focus:ring-primaryh"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-card bg-cardbg text-white w-full hover:bg-cardbg2 transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="divider w-full text-gray-800">OR</div>

        {/* Social Login Buttons */}
        {providers &&
              Object.values(providers).map((provider) =>
                provider.id !== "credentials" ? (
                  <button
                    className=" w-full px-12 py-4 rounded-xl text-white text-lg bg-cardbg hover:bg-cardbg2"
                    key={provider.id}
                    onClick={() => {
                      signIn(provider.id, { callbackUrl: "/home" });
                    }}
                  >
                    Login in with {provider.name}
                  </button>
                ) : null
              )}

        {/* Signup Redirect */}
        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
