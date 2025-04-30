"use client";

import { useState } from "react";

declare global {
  interface Window {
    __pokeHandlers?: {
      handleResume: () => void;
      handleProjects: () => void;
      handleWork: () => void;
      handleSkills: () => void;
    };
  }
}

const SECTION_CONTENT = {
  resume: (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Resume</h1>
      <p className="text-lg text-center">Here you can view and download my resume, and see my professional experience and education.</p>
    </>
  ),
  projects: (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Projects</h1>
      <p className="text-lg text-center">Explore my personal and professional projects, including code samples and demos.</p>
    </>
  ),
  work: (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Work</h1>
      <p className="text-lg text-center">Learn about my work experience, roles, and contributions at various companies.</p>
    </>
  ),
  skills: (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Skills</h1>
      <p className="text-lg text-center">Discover my technical and soft skills, tools, and technologies I use.</p>
    </>
  ),
  home: (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to My Portfolio</h1>
      <div className="max-w-2xl text-center">
        <p className="text-xl mb-4">
          Just like in Pokemon Platinum, you can navigate through my world using the menu below.
        </p>
        <p className="text-lg">
          Choose an option to learn more about my journey, skills, and projects!
        </p>
      </div>
    </>
  ),
};

export default function Home() {
  const [section, setSection] = useState<"home" | "resume" | "projects" | "work" | "skills">("home");

  // Handler functions for each button
  const handleResume = () => setSection("resume");
  const handleProjects = () => setSection("projects");
  const handleWork = () => setSection("work");
  const handleSkills = () => setSection("skills");

  // Attach handlers to window for layout to use
  if (typeof window !== "undefined") {
    window.__pokeHandlers = {
      handleResume,
      handleProjects,
      handleWork,
      handleSkills,
    };
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-auto">
      <div className="relative w-full max-w-[600px] aspect-[0.86] mx-auto">
        {/* DSi Background Image */}
        <img
          src="/dsi-bg.png"
          alt="Nintendo DSi"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
        {/* Top Screen Content */}
        <div
          className="absolute"
          style={{
            top: "12.5%",
            left: "12.5%",
            width: "75%",
            height: "32%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="w-full h-full bg-gray-800 screen-border relative overflow-hidden flex items-center justify-center">
            <div className="p-4 w-full">{SECTION_CONTENT[section]}</div>
          </div>
        </div>
        {/* Bottom Screen Content */}
        <div
          className="absolute"
          style={{
            bottom: "12.5%",
            left: "12.5%",
            width: "75%",
            height: "22%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="w-full h-full bg-[#f5f5dc] screen-border relative flex flex-col items-center justify-center pixelated">
            {/* Background lines/boxes for pixel effect */}
            <div className="absolute inset-0 z-0">
              <div className="w-full h-1/3 border-b-4 border-[#e0d8b0] opacity-70"></div>
              <div className="w-full h-1/3 border-b-4 border-[#e0d8b0] opacity-70"></div>
            </div>
            {/* Large Red Button */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <button
                onClick={() => setSection("resume")}
                className="menu-button bg-red-500 hover:bg-red-600 text-white font-bold text-xl py-4 px-16 rounded-2xl border-4 border-red-700 shadow-lg mb-4"
              >
                Resume
              </button>
              {/* Row of three smaller buttons */}
              <div className="flex flex-row justify-center gap-4 w-full">
                <button
                  onClick={() => setSection("projects")}
                  className="menu-button bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm py-2 px-6 rounded-xl border-4 border-yellow-700 shadow"
                >
                  Projects
                </button>
                <button
                  onClick={() => setSection("skills")}
                  className="menu-button bg-blue-400 hover:bg-blue-500 text-white font-bold text-sm py-2 px-6 rounded-xl border-4 border-blue-700 shadow"
                >
                  Skills
                </button>
                <button
                  onClick={() => setSection("work")}
                  className="menu-button bg-green-400 hover:bg-green-500 text-white font-bold text-sm py-2 px-6 rounded-xl border-4 border-green-700 shadow"
                >
                  Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
