export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0E14] text-[#E6E8EB]">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <span className="font-(family-name:--font-display) text-xs tracking-[0.2em] uppercase text-[#FFB454] mb-6">
          Now in early access
        </span>

        <h1 className="font-(family-name:--font-display) text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
          Stop re-explaining your project to every AI tool.
        </h1>

        <p className="mt-6 text-lg text-[#6B7280] max-w-xl">
          CodeFlow AI remembers your prompts, decisions, and architecture — so
          Claude, ChatGPT, and Cursor pick up right where you left off.
        </p>

        <a
          href="/signup"
          className="mt-10 inline-block bg-[#FFB454] text-[#0B0E14] font-(family-name:--font-display) font-semibold px-8 py-3 rounded-md hover:bg-[#ffc172] transition-colors"
        >
          Sign Up Free
        </a>

        {/* SIGNATURE VISUAL: scattered context converging into one memory line */}
        <div className="mt-20 w-full max-w-2xl">
          <svg viewBox="0 0 600 220" className="w-full h-auto">
            <line x1="90" y1="40" x2="300" y2="150" stroke="#2A2F3A" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="300" y1="40" x2="300" y2="150" stroke="#2A2F3A" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="510" y1="40" x2="300" y2="150" stroke="#2A2F3A" strokeWidth="2" strokeDasharray="4 4" />

            <g>
              <rect x="30" y="15" width="120" height="36" rx="18" fill="#151922" stroke="#2A2F3A" />
              <text x="90" y="38" textAnchor="middle" fill="#6B7280" fontSize="13" fontFamily="var(--font-body)">Claude</text>
            </g>
            <g>
              <rect x="240" y="15" width="120" height="36" rx="18" fill="#151922" stroke="#2A2F3A" />
              <text x="300" y="38" textAnchor="middle" fill="#6B7280" fontSize="13" fontFamily="var(--font-body)">ChatGPT</text>
            </g>
            <g>
              <rect x="450" y="15" width="120" height="36" rx="18" fill="#151922" stroke="#2A2F3A" />
              <text x="510" y="38" textAnchor="middle" fill="#6B7280" fontSize="13" fontFamily="var(--font-body)">Cursor</text>
            </g>

            <g>
              <rect x="200" y="150" width="200" height="46" rx="23" fill="#1A1408" stroke="#FFB454" strokeWidth="1.5" />
              <text x="300" y="178" textAnchor="middle" fill="#FFB454" fontSize="14" fontFamily="var(--font-display)" fontWeight="600">
                Project Memory
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1F242E]">
        <h2 className="font-(family-name:--font-display) text-2xl md:text-3xl font-semibold text-center mb-14">
          Everything your AI tools forget, remembered.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#151922] border border-[#2A2F3A] rounded-lg p-6 border-l-2 border-l-[#FFB454]">
            <h3 className="font-(family-name:--font-display) text-lg font-semibold mb-2">
              Project Memory
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Every decision, file, and note about your project lives in one
              place — no more re-explaining your codebase from scratch.
            </p>
          </div>

          <div className="bg-[#151922] border border-[#2A2F3A] rounded-lg p-6 border-l-2 border-l-[#5CDBD3]">
            <h3 className="font-(family-name:--font-display) text-lg font-semibold mb-2">
              Prompt Library
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Save the prompts that actually work, organize them by project,
              and reuse them instead of rewriting from memory.
            </p>
          </div>

          <div className="bg-[#151922] border border-[#2A2F3A] rounded-lg p-6 border-l-2 border-l-[#FFB454]">
            <h3 className="font-(family-name:--font-display) text-lg font-semibold mb-2">
              Context Injection
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Hand your project&apos;s full context to Claude, ChatGPT, or Cursor
              in one paste — instead of copying old chat threads around.
            </p>
          </div>

          <div className="bg-[#151922] border border-[#2A2F3A] rounded-lg p-6 border-l-2 border-l-[#5CDBD3]">
            <h3 className="font-(family-name:--font-display) text-lg font-semibold mb-2">
              Architecture Notes
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Keep a living record of how your app is built, so future-you
              (and any AI tool) understands the &ldquo;why,&rdquo; not just the code.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-[#1F242E] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#6B7280]">
          &copy; {new Date().getFullYear()} CodeFlow AI. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://tiktok.com/@_codebypjj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B7280] hover:text-[#FFB454] transition-colors"
          >
            TikTok
          </a>

          <a
            href="https://linkedin.com/in/patrick-james-villamayor-429960353"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B7280] hover:text-[#FFB454] transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/codebypjj/codeflow-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B7280] hover:text-[#FFB454] transition-colors"
          >
            GitHub
          </a>
        </div >
      </footer >
    </main >
  );
}