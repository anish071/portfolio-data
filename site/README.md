# Anish Kumar Tiwari — Portfolio

A single-page portfolio for a Data Analyst / Data Science / AI-ML profile.

**Signature animation:** the hero portrait starts as a noisy, scattered dataset. The points are "cleaned" into the portrait, a model line sweeps across and reveals the real photo. The points stay interactive (move the cursor / finger over them) and can be shown again with the PHOTO / DATA toggle.

Other sections: SQL-style About card, a scroll-filled "data pipeline" career timeline, five project notebooks with their own animated chart, tabbed skills, resumes and contact.

## Run
```bash
npm install
npm run dev      # development
npm run build    # production build into dist/
npm run preview
```

## Edit content
Everything lives in `src/data/portfolio.ts` (profile, projects, skills, timeline, certifications).
Resumes: `public/assets/*.pdf`. Photo: `public/assets/anish-portrait-*.webp` (transparent-background cut-out).

## Deploy
Import the folder in Vercel or Netlify (build command `npm run build`, output `dist`). After deploying, set `og:image` in `index.html` to the full URL for link previews.

Stack: React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion.
