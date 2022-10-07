<script>
  import {hmsActions} from "./hms.ts";

  let name = '';
  let token = '';

  function join() {
    hmsActions.join({ userName: name, authToken: token });
  }
</script>

<form on:submit|preventDefault={join}>
    <h2>Join Room</h2>
        <input
                bind:value={name}
                type="text"
                name="name"
                placeholder="What's your name?"
        />

        <input
                bind:value={token}
                type="text"
                name="token"
                placeholder="App token for a room"
        />

    <button type="submit" class="btn-primary">Join</button>
</form>

<style>

    form {
        max-width: 450px;

        margin: 30px auto;
        padding: 20px;

        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        border-radius: 8px;
    }

    input {
        display: block;

        width: 100%;
        height: 34px;

        padding: 5px;

        color: inherit;
        font-family: inherit;

        background: #37474f;

        border-radius: 8px;
        border: 2px solid transparent;

        margin-bottom: 20px;
    }

    input::placeholder {
        color: #aaa;
    }

    form h2 {
        margin-bottom: 20px;
    }
</style>
