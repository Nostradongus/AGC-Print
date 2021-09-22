<template>
  <div
    class="h-full relative sm:w-2/3 md:w-3/4 lg:w-5/6 float-right"
    id="right"
  >
    <div class="h-24 bg-primary-blue">
      <p class="absolute manrope-extrabold text-5xl text-white ml-4 mt-8">
        {{ title }}
      </p>
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
  setup() {
    const store = useStore();
    const state = reactive({
      username: null,
      worker: null,
    });

    if (JSON.parse(localStorage.getItem('user')) != null) {
      state.username = store.state.user.user.username;
    } else {
      state.worker = store.state.worker.worker.username;
    }

    return { state };
  },
};
</script>

<style></style>
