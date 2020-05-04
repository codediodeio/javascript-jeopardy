<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  let firebaseConfig = {
    apiKey: "AIzaSyC5SMvTLdHpK8aT6mzZ-axC2qlv7yBGaEs",
    authDomain: "javascript-jeopardy-a8220.firebaseapp.com",
    databaseURL: "https://javascript-jeopardy-a8220.firebaseio.com",
    projectId: "javascript-jeopardy-a8220",
    storageBucket: "javascript-jeopardy-a8220.appspot.com",
    messagingSenderId: "946146998781",
    appId: "1:946146998781:web:5cc6d2fd3d42fac10b4194",
    measurementId: "G-7JEP9HMV9R"
  };

  firebase.initializeApp(firebaseConfig);
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1,
  em {
    color: #ff3e00;
  }

  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>

  {#if !firebaseConfig.projectId}
    <strong>Step 0</strong>
    Create a
    <a href="https://firebase.google.com/">Firebase Project</a>
    and paste your web config into
    <code>App.svelte</code>
    .
  {/if}

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>

    <h1>💪🔥 Mode Activated</h1>

    <p>
      <strong>Tip:</strong>
      Open the browser console for development logging.
    </p>

    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      Howdy 😀! User
      <em>{user.uid}</em>

      <button on:click={() => auth.signOut()}>Sign Out</button>

      <div slot="signed-out">

        <button on:click={() => auth.signInAnonymously()}>
          Sign In Anonymously
        </button>
      </div>

      <hr />

      <!-- 3. 📜 Get a Firestore document owned by a user -->
      <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>

        <h2>{post.title}</h2>

        <p>
          Document created at
          <em>{new Date(post.createdAt).toLocaleString()}</em>
        </p>

        <span slot="loading">Loading post...</span>
        <span slot="fallback">
          <button
            on:click={() => postRef.set({
                title: '📜 I like Svelte',
                createdAt: Date.now()
              })}>
            Create Document
          </button>
        </span>

        <!-- 4. 💬 Get all the comments in its subcollection -->

        <h3>Comments</h3>
        <Collection
          path={postRef.collection('comments')}
          query={ref => ref.orderBy('createdAt')}
          let:data={comments}
          let:ref={commentsRef}
          log>

          {#if !comments.length}No comments yet...{/if}

          {#each comments as comment}
            <p>
              <!-- ID: <em>{comment.ref.id}</em> -->
            </p>
            <p>
              {comment.text}
              <button on:click={() => comment.ref.delete()}>Delete</button>
            </p>
          {/each}

          <button
            on:click={() => commentsRef.add({
                text: '💬 Me too!',
                createdAt: Date.now()
              })}>
            Add Comment
          </button>

          <span slot="loading">Loading comments...</span>

        </Collection>
      </Doc>
    </User>
  </FirebaseApp>

</main>

<!-- Styles -->
