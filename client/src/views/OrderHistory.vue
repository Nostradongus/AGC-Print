<template>
  <div>
    <side-bar />
    <page-header title="Order History">
      <!-- display all orders of user -->
      <div v-if="state.empty" class="h-full w-full">
        <div class="mx-8 mt-8 text-2xl relative">
          You currently don't have any orders.
        </div>
        <router-link
          class="
            m-8
            manrope-regular
            text-white
            inline-block
            transition
            duration-300
            ease-in-out
            text-center text-lg
            hover:bg-link-water hover:text-primary-blue
            w-32
            mb-8
            mt-8
            rounded-xl
            bg-primary-blue
            p-2
          "
          to="/order"
        >
          Add Order
        </router-link>
      </div>
      <div v-else>
        <OrderCard
          v-for="order in state.orders"
          :key="order.id"
          :order="order"
        />
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import OrderCard from '../components/OrderCard.vue';
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'OrderHistory',
  components: {
    OrderCard,
    SideBar,
    PageHeader,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      orders: null,
      empty: true,
    });

    async function getUserPastOrders() {
      try {
        const data = store.state.user.user.username;
        const result = await api.getUserPastOrders(data);
        state.orders = result.data;
        if (state.orders.length !== 0) {
          state.empty = false;
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }

    onMounted(() => {
      // populate user order history page with previous ('Completed') orders
      if (store.state.user.user != null) {
        getUserPastOrders();
      }
    });

    return { state, getUserPastOrders };
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
