<script>
    import {Share2Icon} from "svelte-feather-icons";
    import {tokenStore} from "../hmsStores";
    import { toast } from './toasts';

    function copyShareLink() {
      const url = `${window.location.origin}?token=${$tokenStore}`;
      console.log("sharable url = ", url)
      navigator.clipboard.writeText(url).then(function() {
        console.log("link copied to clipboard");
        toast.success("Room link copied to clipboard")
      }, function(err) {
        console.error('failed ot copy link to clip board', err);
      });
    }
</script>

<span title="copy link" class="share-btn" on:click={copyShareLink}>
    <Share2Icon/>
</span>

<style>
    .share-btn {
        cursor: pointer;
    }
</style>