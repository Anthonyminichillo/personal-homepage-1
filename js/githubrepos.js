// Fetches the given GitHub user's public repos and renders the most
// recently updated ones. Uses the unauthenticated public API, so no
// token or backend is required.

export async function loadGithubRepos(username, containerSelector, count = 5) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "<li>Loading recent repos…</li>";

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${count}`,
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const repos = await res.json();
    renderRepos(repos);
  } catch (err) {
    container.innerHTML = `<li>Couldn't load repos right now (${err.message}). Check back later!</li>`;
  }

  function renderRepos(repos) {
    if (!repos.length) {
      container.innerHTML = "<li>No public repos found.</li>";
      return;
    }

    container.innerHTML = repos
      .map((repo) => {
        const updated = new Date(repo.updated_at).toLocaleDateString();
        const description = repo.description || "No description provided.";
        return `
          <li>
            <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener">
              ${escapeHTML(repo.name)}
            </a>
            <div class="repo-meta">${escapeHTML(description)}</div>
            <div class="repo-meta">Updated ${updated} · ★ ${repo.stargazers_count}</div>
          </li>`;
      })
      .join("");
  }

  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }
}