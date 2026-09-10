"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Project = {
    id: string;
    name: string;
    description: string;
    created_at: string;
};

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUserAndProjects() {
            const { data: userData } = await supabase.auth.getUser();

            if (!userData.user) {
                router.push("/login");
                return;
            }

            setUser(userData.user);

            const { data: projectsData, error: projectsError } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (!projectsError && projectsData) {
                setProjects(projectsData);
            }

            setLoading(false);
        }

        loadUserAndProjects();
    }, [router]);

    async function handleCreateProject(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Project name is required.");
            return;
        }

        setSaving(true);

        const { data, error: insertError } = await supabase
            .from("projects")
            .insert({
                name,
                description,
                user_id: user?.id,
            })
            .select()
            .single();

        setSaving(false);

        if (insertError) {
            setError(insertError.message);
            return;
        }

        setProjects([data, ...projects]);
        setName("");
        setDescription("");
        setShowForm(false);
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0B0E14] text-[#E6E8EB] flex items-center justify-center">
                <p className="text-[#6B7280]">Loading...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0B0E14] text-[#E6E8EB] px-6 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="font-(family-name:--font-display) text-2xl font-semibold">
                            Your Projects
                        </h1>
                        <p className="text-sm text-[#6B7280]">{user?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-[#6B7280] hover:text-[#FFB454] transition-colors"
                    >
                        Log out
                    </button>
                </div>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="mb-8 bg-[#FFB454] text-[#0B0E14] font-(family-name:--font-display) font-semibold px-5 py-2.5 rounded-md hover:bg-[#ffc172] transition-colors"
                    >
                        + New Project
                    </button>
                )}

                {showForm && (
                    <form
                        onSubmit={handleCreateProject}
                        className="mb-10 bg-[#151922] border border-[#2A2F3A] rounded-lg p-6 flex flex-col gap-4"
                    >
                        <div>
                            <label className="block text-sm text-[#6B7280] mb-1">
                                Project Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#0B0E14] border border-[#2A2F3A] rounded-md px-4 py-2 text-[#E6E8EB] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-[#6B7280] mb-1">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full bg-[#0B0E14] border border-[#2A2F3A] rounded-md px-4 py-2 text-[#E6E8EB] focus:outline-none"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-md px-3 py-2">
                                {error}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-[#FFB454] text-[#0B0E14] font-(family-name:--font-display) font-semibold px-5 py-2.5 rounded-md hover:bg-[#ffc172] transition-colors disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save Project"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="text-sm text-[#6B7280] hover:text-[#E6E8EB] transition-colors px-3"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {projects.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-[#2A2F3A] rounded-lg">
                        <p className="text-[#6B7280]">
                            No projects yet. Create your first one above.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {projects.map((project) => (
                            <a
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="block bg-[#151922] border border-[#2A2F3A] rounded-lg p-5 hover:border-[#FFB454] transition-colors"
                            >
                                <h3 className="font-(family-name:--font-display) text-lg font-semibold mb-1">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-[#6B7280]">
                                    {project.description || "No description yet."}
                                </p>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}