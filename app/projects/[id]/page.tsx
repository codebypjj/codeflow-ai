"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Project = {
    id: string;
    name: string;
    description: string;
};

export default function ProjectDetail() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [code, setCode] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [asking, setAsking] = useState(false);
    const [askError, setAskError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function loadProject() {
            const { data: userData } = await supabase.auth.getUser();

            if (!userData.user) {
                router.push("/login");
                return;
            }

            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("id", projectId)
                .single();

            if (error || !data) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            setProject(data);
            setLoading(false);
        }

        loadProject();
    }, [projectId, router]);

    async function handleAskAI(e: React.FormEvent) {
        e.preventDefault();
        setAskError("");

        if (!errorMessage.trim()) {
            setAskError("Paste your error message first.");
            return;
        }

        setAsking(true);
        setAiResponse("");

        try {
            const res = await fetch("/api/debug", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectName: project?.name,
                    projectDescription: project?.description,
                    errorMessage,
                    code,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setAskError(data.error || "Something went wrong.");
                setAsking(false);
                return;
            }

            setAiResponse(data.response);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setAskError("Couldn't reach the AI. Check your connection and try again.");
        }

        setAsking(false);
    }

    async function handleApplyFix() {
        await navigator.clipboard.writeText(aiResponse);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0B0E14] text-[#E6E8EB] flex items-center justify-center">
                <p className="text-[#6B7280]">Loading...</p>
            </main>
        );
    }

    if (notFound) {
        return (
            <main className="min-h-screen bg-[#0B0E14] text-[#E6E8EB] flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-[#6B7280] mb-4">
                        Project not found (or it&apos;s not yours).
                    </p>
                    <a href="/dashboard" className="text-[#5CDBD3] hover:underline">
                        Back to Dashboard
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0B0E14] text-[#E6E8EB] px-6 py-12">
            <div className="max-w-3xl mx-auto">
                <a
                    href="/dashboard"
                    className="text-sm text-[#6B7280] hover:text-[#FFB454] transition-colors"
                >
                    &larr; Back to Dashboard
                </a>

                <h1 className="font-(family-name:--font-display) text-2xl font-semibold mt-4 mb-2">
                    {project?.name}
                </h1>
                <p className="text-[#6B7280] mb-10">
                    {project?.description || "No description yet."}
                </p>

                <div className="bg-[#151922] border border-[#2A2F3A] rounded-lg p-6">
                    <h2 className="font-(family-name:--font-display) text-lg font-semibold mb-4">
                        Debug Assistant
                    </h2>

                    <form onSubmit={handleAskAI} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-[#6B7280] mb-1">
                                Error Message
                            </label>
                            <textarea
                                value={errorMessage}
                                onChange={(e) => setErrorMessage(e.target.value)}
                                rows={3}
                                placeholder="Paste the exact error you're seeing..."
                                className="w-full bg-[#0B0E14] border border-[#2A2F3A] rounded-md px-4 py-2 text-sm text-[#E6E8EB] focus:outline-none focus:border-[#FFB454]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-[#6B7280] mb-1">
                                Relevant Code (optional)
                            </label>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                rows={5}
                                placeholder="Paste the code that's causing the error..."
                                className="w-full bg-[#0B0E14] border border-[#2A2F3A] rounded-md px-4 py-2 text-sm font-mono text-[#E6E8EB] focus:outline-none focus:border-[#FFB454]"
                            />
                        </div>

                        {askError && (
                            <p className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-md px-3 py-2">
                                {askError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={asking}
                            className="bg-[#FFB454] text-[#0B0E14] font-(family-name:--font-display) font-semibold px-5 py-2.5 rounded-md hover:bg-[#ffc172] transition-colors disabled:opacity-50 self-start"
                        >
                            {asking ? "Thinking..." : "Debug It"}
                        </button>
                    </form>

                    {aiResponse && (
                        <div className="mt-6 pt-6 border-t border-[#2A2F3A]">
                            <p className="text-sm text-[#6B7280] mb-2">AI Response</p>
                            <div className="bg-[#0B0E14] border border-[#2A2F3A] rounded-md p-4 text-sm whitespace-pre-wrap mb-4">
                                {aiResponse}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleApplyFix}
                                    className="bg-[#FFB454] text-[#0B0E14] font-(family-name:--font-display) font-semibold px-5 py-2 rounded-md hover:bg-[#ffc172] transition-colors"
                                >
                                    {copied ? "Copied!" : "Apply Fix"}
                                </button>
                                <button className="text-sm text-[#5CDBD3] hover:underline">
                                    Explain
                                </button>
                                <button className="text-sm text-[#5CDBD3] hover:underline">
                                    Teach Me
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}