<script>
  import './styles.css';
  import Notifications from "./_components/Notifications.svelte";
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

<Notifications/>
<div class="layout">
    <div class="header">
        <Header/>
    </div>
    {#if $hmsIsConnected}
        <div class="conference-container">
            <Conference />
        </div>
        <div class="footer">
            <Footer/>
        </div>
    {:else}
        <JoinForm />
    {/if}
</div>

<style>
    .layout {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .conference-container {
        flex-grow: 1;
        overflow: auto;
        height: 100%;
    }

    .footer {
        flex-shrink: 0;
    }
</style>
