<template>
  <div v-if="state.orders">
    <side-bar />
    <page-header title="Cart">
      <div class="overflow-y-auto max-h-screen scrollbar-hidden pt-2 pb-2">
        <div v-if="state.orders.length !== 0">
          <cart-item
            v-for="order in state.orders"
            :key="order.id"
            :order="order"
          />
        </div>
        <div v-else>
          <div class="mx-8 mt-8 text-2xl relative">
            You currently don't have any orders.
          </div>
        </div>
      </div>
      <div class="flex justify-end px-8 pt-1">
        <router-link
          class="
            manrope-regular
            text-primary-blue
            inline-block
            transition
            duration-300
            ease-in-out
            text-center text-md
            hover:bg-primary-blue hover:text-white
            p-3
            mb-8
            mt-8
            mr-8
            rounded-xl
            bg-light-blue
          "
          to="/order"
          >Add Order</router-link
        >
        <router-link
          v-if="state.orders.length !== 0"
          class="
            manrope-regular
            text-white
            inline-block
            transition
            duration-300
            ease-in-out
            text-center text-md
            hover:bg-link-water hover:text-primary-blue
            p-3
            mb-8
            mt-8
            rounded-xl
            bg-primary-blue
          "
          to="/delivery-information"
          >Confirm Order</router-link
        >
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import CartItem from '../components/CartItem.vue';
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'ViewCart',
  components: {
    CartItem,
    SideBar,
    PageHeader,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      orders: null,
    });

    async function getOrdersFromCart() {
      try {
        console.log('test');
        await store.dispatch('getOrder');
        if (store.state.order.orders != null) {
          state.orders = store.state.order.orders;
        }
        console.log(state.orders);
      } catch (err) {
        console.log(err);
      }
    }

    onMounted(() => {
      getOrdersFromCart();
    });

    return { state, getOrdersFromCart };
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
  height: 48rem;
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

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
</style>
