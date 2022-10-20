<script>
  import {hmsIsConnected} from "./hmsStores.ts";
  import {hmsActions} from "./hms.ts";
  import ShareLink from "./_components/ShareLink.svelte";

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

    <h3 class="title">Conferencing</h3>

    <div class="right">
        {#if $hmsIsConnected}
            <button title="Leave" class="btn-danger leave-btn space-right" on:click={leaveRoom}> Leave Room </button>
            <span class="space-right"><ShareLink/></span>
        {/if}
        <a title="Go to GitHub" href="https://github.com/100mslive/svelte-100ms/tree/features" rel="noreferrer" target="_blank">
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
        flex-wrap: wrap;
    }

    .right {
        display: flex;
        align-items: center;
    }

    .space-right {
        margin-right: 10px;
    }

    .title {
        text-align: center;
        font-size: 2rem;
    }
</style>