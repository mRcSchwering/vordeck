# vordeck

My main landing page bootstrapped with [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) and [Typescript](https://www.typescriptlang.org/).
Uses [react-router](https://reactrouter.com/) for routing and [grommet](https://v2.grommet.io/) for themes and UI components.
Deployed using [cloudflare pages](https://pages.cloudflare.com/).

- [CRA_README.md](./CRA_README.md) original `create-react-app` README
- [App.tsx](./src/App.tsx) entrypoint with lazy-loading routes
- [theme.json](./src/theme.json) grommet theme definition

## Deploy Setup

I followed the [getting startet tutorial](https://developers.cloudflare.com/pages/getting-started#adding-a-custom-domain)
almost exactly:

1. Connect github account to cloudflare pages
2. Configured the deployment (I used `yarn build` as build command)
3. Run first deploy (>4min)
4. Add custom domains (vordeck.de, www.vordeck.de). Will enter CNAMEs automatically.
5. Set TLS policy to _strict_

After that any push will trigger a redeploy.
