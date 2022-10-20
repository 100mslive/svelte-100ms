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
<div class="layout" class:join={!$hmsIsConnected} class:conference={$hmsIsConnected}>
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
        display: grid;
        grid-template-columns: 100%;
        height: 100%;
        grid-gap: 10px;
    }

    .layout.join{
        grid-auto-rows: minmax(min-content, max-content);
    }

    .layout.conference {
        grid-template-rows: auto 1fr auto;
    }

    .conference-container {
        overflow: hidden;
    }
</style>
