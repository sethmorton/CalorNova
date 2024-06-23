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
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Quicksand:wght@300..700&display=swap");
  :global(body) {
    overflow-y: hidden;
    font-family: "Quicksand", sans-serif;
    background: linear-gradient(135deg, #333333 0%, #000000 100%);
    background-attachment: fixed;
    color: #fff;
  }

  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    
  }

  main {
    /* flex: 1; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem;
    margin-bottom: 2rem;
    box-sizing: border-box;
  }
</style>
