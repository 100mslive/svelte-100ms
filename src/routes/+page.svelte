<script>
  import './styles.css';
  import {hmsActions} from "./hms.ts";
  import Conference from "./Conference.svelte";
  import JoinForm from "./JoinForm.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import {hmsIsConnected} from "./hmsStores.ts";

  function leaveRoom() {
    hmsActions.leave();
  }

</script>

<!-- leave room on tab close -->
<svelte:window on:unload={leaveRoom} />

<svelte:head>
    <title>100ms Svelte App</title>
    <meta name="description" content="Svelte HMS World" />
</svelte:head>

<Header/>
{#if $hmsIsConnected}
    <Conference />
    <Footer/>
{:else}
    <JoinForm />
{/if}
