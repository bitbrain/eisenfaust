<template>
  <div class="divider">
    <hr>
    <span class="divider-text">
      <slot></slot>
    </span>
    <hr>
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin: 3rem 0;
}

.divider hr {
  flex: 0.2;
  border: none;
  border-top: 3px solid var(--granite-300);
  margin: 0;
}

.divider-text {
  font-family: 'Runes', sans-serif;
  color: var(--granite-300);
  white-space: nowrap;
  font-weight: bold;
}
</style>
