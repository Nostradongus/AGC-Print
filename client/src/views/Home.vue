<template>
  <h1 class="font-extrabold mb-6 text-3xl">Home</h1>
  <p class="mb-6">{{ name }}</p>
  <input
    v-model="newName"
    type="text"
    class="border p-2 mr-2 border-gray-500 rounded"
  />
  <button @click="saveName" class="p-2 text-white bg-indigo-600 rounded">
    Submit
  </button>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore();

const name = computed(() => {
  return store.state.user.name;
});

const newName = ref('');

function saveName() {
  store.dispatch('saveName', newName.value);
  newName.value = '';
  router.push('/about');
}
</script>

<style></style>
