<script>
  export let categories = [];

  // Keys of clues that have already been played, e.g. "0-2".
  let played = {};
  let selected = null; // { key, clue }
  let showAnswer = false;
  let score = 0;

  $: rows = categories.length ? categories[0].clues.length : 0;
  $: allPlayed = categories.length > 0 && Object.keys(played).length === categories.length * rows;

  function open(categoryIndex, clueIndex) {
    const key = `${categoryIndex}-${clueIndex}`;
    if (played[key]) return;
    selected = { key, clue: categories[categoryIndex].clues[clueIndex] };
    showAnswer = false;
  }

  function finish(correct) {
    score += correct ? selected.clue.value : -selected.clue.value;
    played = { ...played, [selected.key]: true };
    selected = null;
  }

  function close() {
    selected = null;
  }

  function reset() {
    played = {};
    score = 0;
    selected = null;
  }

  function onKeydown(event) {
    if (event.key === "Escape" && selected) close();
  }
</script>

<style>
  .score {
    text-align: center;
    font-size: 1.25em;
    margin: 0.5em 0 1em;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    gap: 6px;
    max-width: 900px;
    margin: 0 auto;
  }

  .category {
    background: #0b1f6b;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding: 0.8em 0.4em;
    border-radius: 2px;
  }

  .cell {
    background: #1a3ac2;
    color: #ffd24a;
    font-size: 1.6em;
    font-weight: bold;
    padding: 0.9em 0;
    margin: 0;
    border: none;
    border-radius: 2px;
    cursor: pointer;
  }

  .cell:hover:not(:disabled) {
    background: #2a4ee0;
  }

  .cell:disabled {
    background: #e6e6e6;
    color: transparent;
    cursor: default;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
  }

  .dialog {
    background: #1a3ac2;
    color: #fff;
    max-width: 640px;
    width: 100%;
    padding: 1.5em;
    border-radius: 4px;
    text-align: center;
  }

  .dialog h2 {
    margin-top: 0;
    color: #ffd24a;
  }

  .question {
    font-size: 1.4em;
    margin: 1em 0;
  }

  .answer {
    font-size: 1.3em;
    font-weight: bold;
    color: #ffd24a;
    margin: 1em 0;
  }

  .actions button {
    margin-right: 0.5em;
  }

  .reset {
    display: block;
    margin: 1.5em auto 0;
  }
</style>

<svelte:window on:keydown={onKeydown} />

<section aria-label="Game board">
  <p class="score" aria-live="polite">
    Score:
    <strong>{score}</strong>
  </p>

  {#if allPlayed}
    <p class="score">All clues played. Final score: <strong>{score}</strong></p>
  {/if}

  <div class="grid" style="--cols: {categories.length}">
    {#each categories as category}
      <div class="category">{category.name}</div>
    {/each}

    {#each Array(rows) as _, clueIndex}
      {#each categories as category, categoryIndex}
        <button
          class="cell"
          disabled={played[`${categoryIndex}-${clueIndex}`]}
          aria-label={`${category.name} for ${category.clues[clueIndex].value}`}
          on:click={() => open(categoryIndex, clueIndex)}>
          {category.clues[clueIndex].value}
        </button>
      {/each}
    {/each}
  </div>

  <button class="reset" on:click={reset}>New game</button>
</section>

{#if selected}
  <div class="backdrop" on:click|self={close}>
    <div class="dialog" role="dialog" aria-modal="true" aria-label="Clue">
      <h2>{selected.clue.value}</h2>
      <p class="question">{selected.clue.question}</p>

      {#if showAnswer}
        <p class="answer">{selected.clue.answer}</p>
        <div class="actions">
          <button on:click={() => finish(true)}>I got it right</button>
          <button on:click={() => finish(false)}>I got it wrong</button>
        </div>
      {:else}
        <div class="actions">
          <button on:click={() => (showAnswer = true)}>Show answer</button>
          <button on:click={close}>Back to board</button>
        </div>
      {/if}
    </div>
  </div>
{/if}
