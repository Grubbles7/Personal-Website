# Personal Website

Jack McGrath's personal portfolio site — a single-page, dark-themed developer
portfolio built with plain HTML, CSS, and JavaScript (no build step, no framework).

**Design direction:** dark navy/purple "bento" layout, glassmorphism nav, a
cursor-reactive glow behind the hero, scroll reveals, and a staggered project
grid. Full design brief lives in the Obsidian vault under
`Projects/Portfolio Website - Design Specs.md`.

## Structure

```
.
├── index.html          # single page: hero, about, skills, projects, contact
├── css/
│   └── style.css        # design tokens + all styling
├── js/
│   └── main.js           # theme toggle, typing effect, scroll reveals, mobile nav
└── assets/
    └── images/            # profile photo, project screenshots (add your own)
```

## Local preview

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

## Deployment

Static site, deployed via GitHub Pages from this repo (Settings → Pages →
Deploy from branch → `main` / root).

## TODO before launch

- [ ] Add a real email address (currently `your.email@example.com` — search
      `index.html` for it, appears twice)
- [ ] Add your LinkedIn URL (search `index.html` for `linkedinLink` /
      `linkedinCard`)
- [ ] Swap in real project repository links (several project cards currently
      point at the GitHub profile as a placeholder)
- [ ] Add a profile photo to `assets/images/` and reference it in the hero if
      you want one (currently text-only)
- [ ] Add project screenshots to `assets/images/` if you want thumbnails on
      the project cards
