<template>
  <div
    class="h-full relative sm:w-2/3 md:w-3/4 lg:w-5/6 float-right"
    id="right"
  >
    <div class="h-24 bg-primary-blue">
      <p class="absolute manrope-extrabold text-5xl text-white ml-4 mt-8">
        {{ title }}
      </p>
      <form class="flex mr-16 float-right my-auto">
        <input type="text" class="h-10 lg:w-96 md:w-80 pl-2" placeholder="Search">
        <button type="submit" class="float-right h-10 w-10 bg-link-water">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 m-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
        </button>
      </form>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue';
import { reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PageHeader',
  components: {
    UserCard,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: 'Header Title',
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      username: null,
      worker: null,
    });

    if (JSON.parse(localStorage.getItem('user')) != null) {
      state.username = store.state.user.user.username
    } else {
      state.worker = store.state.worker.worker.username
    }

    return { state };
  },
};
</script>

<style></style>
