// Renders a set of skills as a "constellation" of stars inside the
// given container. Hovering a star draws lines to the projects that
// use that skill (matched by data-skills on project cards).

export function initConstellation(containerSelector, skills) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // evenly space stars around an ellipse, starting from the top, and
  // keep them well inside the box (not touching the edges) so labels
  // never get clipped or overlap each other
  const centerX = 50;
  const centerY = 48;
  const radiusX = 34;
  const radiusY = 30;

  const positions = skills.map((_, i) => {
    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radiusX;
    const y = centerY + Math.sin(angle) * radiusY;
    return { x, y };
  });

  skills.forEach((skill, i) => {
    const { x, y } = positions[i];

    const star = document.createElement("div");
    star.className = "constellation__star";
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.dataset.skill = skill.name;
    container.appendChild(star);

    const label = document.createElement("div");
    label.className = "constellation__label";
    label.style.left = `${x}%`;
    label.style.top = `${y}%`;
    label.textContent = skill.name;
    container.appendChild(label);

    star.addEventListener("mouseenter", () => highlightSkill(skill.name));
    star.addEventListener("mouseleave", () => clearHighlight());
  });

  function highlightSkill(skillName) {
    document.querySelectorAll(".project-card").forEach((card) => {
      const cardSkills = (card.dataset.skills || "").split(",");
      card.style.outline = cardSkills.includes(skillName)
        ? "3px solid #ffd166"
        : "none";
    });
  }

  function clearHighlight() {
    document
      .querySelectorAll(".project-card")
      .forEach((card) => (card.style.outline = "none"));
  }
}
