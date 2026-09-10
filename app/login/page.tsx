"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (loginError) {
            setError(loginError.message);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <main className="min-h-screen bg-[#0B0E14] text-[#E6E8EB] flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <h1 className="font-(family-name:--font-display) text-2xl font-semibold text-center mb-8">
                    Welcome back
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-[#6B7280] mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-[#151922] border rounded-md px-4 py-2 text-[#E6E8EB] focus:outline-none focus:border-[#FFB454]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-[#6B7280] mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[#151922] border rounded-md px-4 py-2 text-[#E6E8EB] focus:outline-none focus:border-[#FFB454]"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-md px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-[#FFB454] text-[#0B0E14] font-(family-name:--font-display) font-semibold px-6 py-2.5 rounded-md hover:bg-[#ffc172] transition-colors disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="text-sm text-[#6B7280] text-center mt-6">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-[#5CDBD3] hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </main>
    );
}