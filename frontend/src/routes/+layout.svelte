<script>
  import Header from "./Header.svelte";
</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
</div>

<style>
  @keyframes rainbow {
    0% {
      color: #ff0000;
    }
    15% {
      color: #ff7f00;
    }
    30% {
      color: #ffff00;
    }
    45% {
      color: #00ff00;
    }
    60% {
      color: #0000ff;
    }
    75% {
      color: #4b0082;
    }
    90% {
      color: #8f00ff;
    }
    100% {
      color: #ff0000;
    }
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    background: linear-gradient(135deg, #333333 0%, #000000 100%);
    background-attachment: fixed;
    color: #fff;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
  }

  .rainbow-text {
    animation: rainbow 5s infinite linear;
    font-weight: bold;
  }
</style>
