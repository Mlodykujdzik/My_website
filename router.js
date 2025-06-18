const app = document.getElementById("app");

const routes = {
    "/home": "pages/home.html",
    "/about": "pages/about.html",
    "/projects": "pages/projects.html",
    "/hosting": "pages/hosting.html",
    "/learning": "pages/learning.html",
};

function getCurrentRoute() {
    const hash = window.location.hash.slice(1) || "/home";
    const [path, param] = hash.split("/").filter(Boolean);
    return {
        base: "/" + path,
        param: param || null,
    };
}

async function loadView() {
    const { base, param } = getCurrentRoute();

    if (base === "/projects" && param) {
        const staticPages = {
            "price-tracker": "pages/project-price-tracker.html",
            "minecraft-server": "pages/project-minecraft-server.html",
            "ambilight-tv": "pages/project-ambilight-tv.html",
        };

        const pagePath = staticPages[param];

        if (pagePath) {
            const res = await fetch(pagePath);
            const html = await res.text();
            app.innerHTML = '<div class="fade-in">' + html + "</div>";
        } else {
            app.innerHTML = '<h2 style="color:red;">Projekt nie istnieje.</h2>';
        }
        return;
    }

    const viewPath = routes[base] || routes["/home"];
    try {
        const res = await fetch(viewPath);
        const html = await res.text();
        app.innerHTML = '<div class="fade-in">' + html + "</div>";
    } catch {
        app.innerHTML = '<h2 style="color:red;">Strona nie została znaleziona.</h2>';
    }
}

window.addEventListener("hashchange", loadView);
window.addEventListener("DOMContentLoaded", loadView);
