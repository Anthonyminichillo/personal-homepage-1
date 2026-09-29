import { TypewriterEffect } from "./typewriter.js";
import { initConstellation } from "./constellation.js";
import { loadGithubRepos } from "./githubrepos.js";
import { initScrollReveal } from "./scrollReveal.js";

// ---- 1. Terminal typewriter hero ----
const terminalTarget = document.querySelector("#terminalOutput");
if (terminalTarget) {
  const introLines = [
    "> whoami",
    "Sree Rachnae Shyam — CS Grad Student & ML/Full-Stack Engineer",
    "> cat pitch.txt",
    "I build fairness-aware ML pipelines and full-stack apps that ship.",
  ];
  const typewriter = new TypewriterEffect(terminalTarget, introLines);
  typewriter.start();
}

// ---- 2. Skill constellation ----
initConstellation("#skillConstellation", [
  { name: "HTML/CSS" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "React" },
  { name: "SQL" },
  { name: "Git" },
]);

// ---- 3. Live GitHub repos ----
loadGithubRepos("shyamrachna25", "#githubRepoList", 5);

// ---- 4. Scroll-triggered project reveal ----
initScrollReveal(".project-card");