<script>
  import { FirebaseApp, User } from "sveltefire";

  import firebase from "./firebase.js";
  import Board from "./Board.svelte";
  import { categories } from "./data/clues.js";
</script>

<style>
  main {
    padding: 1em;
    max-width: 960px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    color: #0b1f6b;
  }

  .user-bar {
    text-align: center;
    margin-bottom: 1em;
  }
</style>

<main>
  <FirebaseApp {firebase}>
    <h1>JavaScript Jeopardy</h1>

    <div class="user-bar">
      <User let:user let:auth>
        Playing as
        <em>{user.uid.slice(0, 6)}</em>
        <button on:click={() => auth.signOut()}>Sign out</button>

        <div slot="signed-out">
          <button on:click={() => auth.signInAnonymously()}>
            Sign in anonymously
          </button>
        </div>
      </User>
    </div>
  </FirebaseApp>

  <Board {categories} />
</main>
