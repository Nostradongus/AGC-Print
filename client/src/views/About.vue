<template>
  <div>
    <h1 class="font-bold text-2xl">About {{ name }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const name = computed(() => {
  return store.state.user.name;
});
</script>

<style></style>
