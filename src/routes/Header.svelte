<script>
  import {hmsIsConnected} from "./hmsStores.ts";
  import {hmsActions} from "./hms.ts";

  function leaveRoom() {
    hmsActions.leave();
  }
</script>


<header>
    <img
            class="logo"
            src="https://www.100ms.live/assets/logo.svg"
            alt="100ms Logo"
    />

    {#if $hmsIsConnected}
        <button id="leave-btn" class="btn-danger" on:click={leaveRoom}> Leave Room </button>
    {/if}
</header>

<style>
    header {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>