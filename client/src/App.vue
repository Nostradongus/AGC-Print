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
    const loadData = async () => {
      await store.dispatch('initState');
      await store.dispatch('getOrder');
    };
    loadData();
  },
};
</script>