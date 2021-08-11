<template>
  <div>
    <side-bar />
    <page-header title="Order Details">
      <div class="p-8" v-if="state.order">
        <p class="manrope-bold text-3xl">Order #{{ state.order.id }}</p>
        <div class="overflow-y-auto w-full h-full manrope-regular text-xl mt-2">
          <img
            :src="`http://localhost:5000/${state.order.img}`"
            :alt="state.order.img"
            border="0"
          />
          <p>Type: {{ state.order.type }}</p>
          <p>Quantity: {{ state.order.quantity }}</p>
          <p>
            Dimensions: {{ state.order.width }} in. x
            {{ state.order.height }} in.
          </p>
          <p v-if="state.order.eyelets != null">
            Eyelets: {{ state.order.eyelets }}
          </p>
          <p v-if="state.order.diecut != null">
            Diecut: {{ state.order.diecut }}
          </p>
          <p
            v-if="
              state.order.frameOption !== 'placeholder' &&
              state.order.frameOption != null
            "
          >
            Frame Option: {{ state.order.frameOption }}
          </p>
          <p
            v-if="
              state.order.frameFinishing !== 'placeholder' &&
              state.order.frameFinishing != null
            "
          >
            Frame Finishing: {{ state.order.frameFinishing }}
          </p>
          <p
            v-if="
              state.order.frameEdges !== 'placeholder' &&
              state.order.frameEdges != null
            "
          >
            Frame Edges: {{ state.order.frameEdges }}
          </p>
          <p v-if="state.order.remarks !== ''">
            Remarks: {{ state.order.remarks }}
          </p>
        </div>
      </div>
      <router-link
        class="
          manrope-regular
          text-white
          inline-block
          transition
          duration-300
          ease-in-out
          text-center text-lg
          hover:bg-link-water hover:text-primary-blue
          w-32
          mx-8
          rounded-xl
          bg-primary-blue
        "
        to="/my-orders"
        >Back</router-link
      >
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, watchEffect, onMounted } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'OrderDetails',
  components: { SideBar, PageHeader },
  props: {
    order: {
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      order: null,
    });

    onMounted(() => {
      console.log('test');
      loadOrder();
    });

    async function loadOrder() {
      try {
        const res = await api.getOrder(route.params.id);
        state.order = res.data;
        console.log(state.order);
      } catch (err) {
        console.log(err);
      }
    }
    return { state };
  },
};
</script>

<style>
.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 48rem;
  height: 3rem;
}

.next-btn {
  width: 10rem;
  height: 5rem;
  border-radius: 20px;
}

.sidebar {
  width: 20rem;
  height: 100vh;
  background: #e7edf2;
}

.header {
  width: 100vw;
  height: 11rem;
}

.content-box {
  display: flex;
  flex-flow: row wrap;
}

.sidebar-btn {
  width: 10rem;
  height: 5rem;
  border-radius: 20px;
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
</style>
