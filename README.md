A hello world app for Svelte + 100ms. Built with SvelteKit.

Adapting [React Quickstart](https://www.100ms.live/docs/javascript/v2/guides/react-quickstart) for Svelte.

### Steps

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
5. Create structure for the UI components -
   - page.svelte - already there, this will render Header, Footer and either of JoinForm or Conference depending on whether the user is connected to the room. 
   - JoinForm.svelte - we'll create a form to take in the username and the auth token here. Rendered when not connected to room.
   - Conference.svelte - top level component when connected to room. 
   - Header.svelte - normal header with a leave button
   - Footer.svelte - footer with audio video toggle buttons
   - Video.svelte - responsible for rendering a video given a track id, used by Conference component
6. The way 100ms sdk works is that there are two pieces hmsActions and hmsStore, while actions let you perform any action in the room, store acts as a global reactive database containing all the information about the room acting as source of truth. Selectors are functions which operate over this store to give some subset of information for e.g. name of other peers in the room.
7. Now 100ms SDK has a very similar syntax to Svelte store in the sense that it has a subscribe function which returns unsubscribe function. We'll use it in two ways - 
   1. directly in the components, subscribing with the proper selector and calling the unsubscribe method in onDestroy
   2. Creating a few helper svelte store wrappers in hmsStores.ts for commonly used selectors
8. Create a hmsStore.ts file with helper function to convert from hms to svelte store and create two stores for isConnected and peers in the room.
9. Implement page.svelte, also add a leave on unload function for handling tab closing. Implement header with a logo and a leave button.
10. Implement JoinForm, takes in name and token and calls join function
11. Implement Conference, create a stub Peer.Svelte. Peer.svelte will use the Video.svelte file to render video and additionally show more details related to the peer.
12. 