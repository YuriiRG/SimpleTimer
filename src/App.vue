<template>
  <div class="container">
    <div class="app">
      <div class="test">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Corporis quaerat quibusdam dolore libero sint!
        Odit, autem nobis. Iusto, natus, saepe sint,
        expedita nulla enim mollitia quod facilis nam laborum in?
      </div>
      <div>
        small div
      </div>
      <div>
        third div
      </div>
    </div>
  </div>
</template>

<style scoped>

.app {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

@media screen and (min-width: 460px) {
  .app {
    border-radius: 1em;
    box-shadow: 1rem 1rem 3rem 1.4rem #bbb;
    flex-direction: row;
  }
  .test {
    width: 15em;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
}
</style>