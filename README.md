# rushikesh-koochana.dev

Personal site. React + Vite + Tailwind + Framer Motion. Dark/light. Deploys to GitHub Pages.

## dev

```bash
npm install
npm run dev        # local dev server
npm run build      # production build
npm run preview    # preview production build
npm run typecheck  # tsc --noEmit
```

## deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.

Enable **Settings → Pages → Source: GitHub Actions** in the repo once.

Live URL: https://rusheesonu.github.io/RushikeshKoochana_website/
