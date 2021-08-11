<template>
  <div>
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

<style>
input:focus {
  outline: 0;
  transition: 500ms;
  border-bottom-color: #0f4c81;
}

.manrope-regular {
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
}

.manrope-bold {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
}

.manrope-extrabold {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
}

/* web application's scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(transparent, #0f4c81);
  border-radius: 6px;
}
</style>
