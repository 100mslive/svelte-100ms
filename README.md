A hello world app for Svelte + 100ms. Built with SvelteKit.

### Steps I followed

1. Svelte kit create, git init
   ```sh
   > npm create svelte@latest svelte-hms-world
   > cd svelte-hms-world
   > yarn install
   > yarn dev --open
   > git init && git add -A && git commit -m "Initial commit"
   ```

2. Delete everything inside the routes folder(apart from styles.css) - let's start clean.
3. Svelte dev would stop here due to error. Create a +page.svelte file in routes with head and importing styles.
4. `yarn add @100mslive/hms-video-store` and then create a hms.ts file as described [here](https://www.100ms.live/docs/javascript/v2/features/integration#java-script).
5. 