<template>
  <div
    class="h-full relative sm:w-2/3 md:w-3/4 lg:w-5/6 float-right"
    id="right"
  >
    <div class="h-24 bg-primary-blue">
      <p class="absolute manrope-extrabold text-5xl text-white ml-4 mt-8">
        {{ title }}
      </p>
      <div class="flex mr-16 float-right my-auto mt-8">
        <input
          type="text"
          class="h-10 lg:w-96 md:w-80 pl-2"
          placeholder="Search"
          v-model.trim="state.search"
          v-on:keyup="onChangeInput"
        />
        <button class="float-right h-10 w-10 bg-link-water">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 m-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Header Title',
    },
  },
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      username: null,
      worker: null,
      search: null,
    });

    if (JSON.parse(localStorage.getItem('user')) != null) {
      state.username = store.state.user.user.username;
    } else {
      state.worker = store.state.worker.worker.username;
    }

    function onChangeInput() {
      context.emit('search', state.search);
    }

    return { state, onChangeInput };
  },
};
</script>

<style>
.search {
  background-image: url('data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-8%20w-8%20m-auto%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22currentColor%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M8%204a4%204%200%20100%208%204%204%200%20000-8zM2%208a6%206%200%201110.89%203.476l4.817%204.817a1%201%200%2001-1.414%201.414l-4.816-4.816A6%206%200%20012%208z%22%20clip-rule%3D%22evenodd%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fsvg%3E');
  background-repeat: no-repeat;
}
</style>
