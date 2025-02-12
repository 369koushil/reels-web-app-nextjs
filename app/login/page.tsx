"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getProviders, ClientSafeProvider } from "next-auth/react";
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
    <div className="h-screen flex items-center justify-center w-screen select-none">
      <div className="border-gray-600 h-4/6 w-1/4 border-4 flex flex-col p-14 rounded-2xl">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex gap-y-2 flex-col">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-xl text-center font-semibold">Login</h2>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="grow text-orange-300" placeholder="Email" />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input type="password" placeholder="*******" className="grow text-orange-200" value={password} onChange={e => setPassword(e.target.value)} />
            </label>

            <button onClick={handleLogin} className="px-12 py-4 rounded-xl text-white font-semibold text-lg bg-green-800 hover:bg-green-900">
              Login
            </button>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-xl text-center">Or</h3>
            {providers &&
              Object.values(providers).map((provider) =>
                provider.id !== "credentials" ? (
                  <button
                    className="px-12 py-4 rounded-xl text-white font-semibold text-lg bg-blue-900 hover:bg-blue-950"
                    key={provider.id}
                    onClick={() => {
                      signIn(provider.id, { callbackUrl: "/home" });
                      router.push("/home");
                    }}
                  >
                    Login with {provider.name}
                  </button>
                ) : null
              )}
          </div>
        </div>
        <div className="flex justify-center pt-3 items-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link href={"/signup"} className="text-blue-400 hover:underline cursor-pointer">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
