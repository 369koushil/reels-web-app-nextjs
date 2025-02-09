"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProviders, signIn } from "next-auth/react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [providers, setProviders] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const provs = await getProviders();
      setProviders(provs);
    };
    fetchProviders();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/login"); 
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Sign up with email & password */}
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>

      <hr />

      {/* Sign in with social providers */}
      <h3>Or sign up with:</h3>
      {providers &&
        Object.values(providers).map((provider: any) =>
          provider.id !== "credentials" ? ( // Exclude credentials-based sign-in
            <button key={provider.id} onClick={() => signIn(provider.id)}>
              Sign up with {provider.name}
            </button>
          ) : null
        )}
    </div>
  );
}
