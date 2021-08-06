<template>
  <div class="">
    <router-view />
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  beforeCreate() {
    const store = useStore();
    const data = async () => await store.dispatch('initState');
    data();
  },
};
</script>