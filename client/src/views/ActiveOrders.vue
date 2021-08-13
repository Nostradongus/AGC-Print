<template>
  <div>
    <side-bar/>
    <page-header title="Active Orders">
      <!-- display all active orders of user -->
      <OrderCard v-for="order in state.orders" :key="order.id" :order="order"/>
    </page-header>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import OrderCard from '../components/OrderCard.vue';
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import * as api from '../api';

export default {
  name: 'ActiveOrders',
  components: {
    OrderCard,
    SideBar,
    PageHeader,
    },
    name: 'Order',
  setup() {
    const store = useStore();
    const state = reactive({
      orders:null,
    });

    async function getAllActiveOrderSets() {
      try {
        const data = store.state.worker.worker.username;
        const result = await api.getAllActiveOrderSets(data);
        state.orders = result.data;
      } catch (err) {
        console.log(err.response.data);
      }
    }

    onMounted(() => {
      // populate staff active orders page with active ('Processing') orders of clients
      if (store.state.worker.worker != null) {
        getAllActiveOrderSets();
      }
    });

    return { state, getAllActiveOrderSets };
  },
};
</script>

<style>
.header {
  width: 100vw;
  height: 11rem;
}

.sidebar-btn {
  width: 80%;
  height: 5rem;
  border-radius: 20px;
}

.content-box {
  display: flex;
  flex-flow: row wrap;
}

.dropdown-field {
  border: 0px;
  outline: 0px;
  width: 28rem;
  height: 3rem;
}

.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  height: 3rem;
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
