<script>
  import {hmsIsConnected} from "./hmsStores.ts";
  import {hmsActions} from "./hms.ts";

  function leaveRoom() {
    hmsActions.leave();
  }
</script>


<header>
    <a href="https://100ms.live/" rel="noreferrer" target="_blank">
        <img
                class="logo"
                src="https://www.100ms.live/assets/logo.svg"
                alt="100ms Logo"
        />
    </a>

    <div class="right">
        {#if $hmsIsConnected}
            <button class="btn-danger leave-btn" on:click={leaveRoom}> Leave Room </button>
        {/if}
        <a href="https://github.com/100mslive/svelte-100ms/tree/features" rel="noreferrer" target="_blank">
            <img src="github.png" alt="Github Repo">
        </a>
    </div>
</header>

<style>
    header {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .right {
        display: flex;
        align-items: center;
    }

    .leave-btn {
        margin-right: 10px;
    }
</style>