function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  const activeLink = document.querySelector(
    `[onclick="showSection('${sectionId}')"]`,
  );
  if (activeLink) {
    activeLink.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector(".theme-icon");
  if (icon) {
    icon.textContent = theme === "dark" ? "☾" : "☀";
  }
}

async function loadContent() {
  try {
    const [projectsResponse, blogsResponse] = await Promise.all([
      fetch("./projects.json"),
      fetch("./blogs.json"),
    ]);

    if (!projectsResponse.ok) {
      throw new Error("Failed to load projects");
    }
    if (!blogsResponse.ok) {
      throw new Error("Failed to load blogs");
    }

    const projectsData = await projectsResponse.json();
    const blogsData = await blogsResponse.json();

    renderProjects(projectsData.projects);
    renderBlogs(blogsData.blogs);
  } catch (error) {
    console.error("Error loading content:", error);
    document.getElementById("projects-container").innerHTML =
      '<p class="blog-summary">Failed to load projects</p>';
    document.getElementById("blog-container").innerHTML =
      '<p class="blog-summary">Failed to load blogs</p>';
  }
}

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  container.innerHTML = projects.map(createProjectElement).join("");
}

function createProjectElement(project) {
  const techTags = project.technologies
    .map((tech) => `<span class="tag">${tech}</span>`)
    .join("");

  return `
    <div class="project-item">
      <h3>
        <a href="${project.githubUrl}" class="project-link" target="_blank">
          ${project.title}
        </a>
      </h3>
      <p class="project-description">${project.description}</p>
      <p class="project-tech">${techTags}</p>
    </div>
  `;
}

function renderBlogs(blogs) {
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
  );
  const container = document.getElementById("blog-container");
  container.innerHTML = sortedBlogs.map(createBlogElement).join("");
}

function createBlogElement(blog) {
  const formattedDate = new Date(blog.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <div class="blog-item">
      <h3>
        <a href="${blog.url}" class="project-link" target="_blank">
          ${blog.title}
        </a>
      </h3>
      <p class="blog-date">${formattedDate}</p>
      <p class="blog-summary">${blog.summary}</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  loadContent();
});
