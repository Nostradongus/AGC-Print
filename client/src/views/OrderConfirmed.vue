<template>
<div>
  <side-bar/>
  <page-header title="Order Confirmed">
      <!-- confirmation message -->
      <h1
        class="
          manrope-bold
          left-0
          -top-3.5
          text-gray-600 text-md
          pt-8
          px-8
        "
        >Thank you for ordering! Here are the details of your orders:</h1
      >

      <!-- delivery information details -->
      <h1
        class="
          manrope-bold
          left-0
          -top-3.5
          text-gray-600 text-md
          pt-8
          px-8
        "
        >Name: {{ state.orderSet.name }} </h1
      >
      <h1
        class="
          manrope-bold
          left-0
          text-gray-600 text-md
          pt-2
          px-8
        "
        >E-mail Address: {{ state.orderSet.email }} </h1
      >
      <h1
        class="
          manrope-bold
          left-0
          text-gray-600 text-md
          pt-2
          px-8
        "
        >Contact Number: {{ state.orderSet.contactNo }} </h1
      >
      <h1
        class="
          manrope-bold
          left-0
          text-gray-600 text-md
          pt-2
          px-8
        "
        >Delivery Address: {{ state.orderSet.address }} </h1
      >

      <!-- display all recently placed orders of user -->
      <OrderCard v-for="order in state.orders" :key="order.id" :order="order"/>
      
      <!-- go back button -->
      <router-link
        class="
          manrope-regular
          text-white
          transition
          duration-300
          inline-block
          ease-in-out
          text-center text-md
          hover:bg-link-water hover:text-primary-blue
          p-2
          px-5
          mb-8
          mt-8
          ml-8
          rounded-xl
          bg-primary-blue"
          to="/order">Go Back</router-link>
  </page-header>
</div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import OrderCard from '../components/OrderCard.vue';
import { reactive, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api/index.js';

export default {
  name: 'OrderConfirmed',
  components: {
    SideBar,
    PageHeader,
    OrderCard,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      orders: null,
      orderSet: null,
    });

    async function getPlacedOrders() {
      // get recently placed orders
      state.orders = store.state.order.orderSet.orders;

      // get delivery information details from order set
      state.orderSet = store.state.order.orderSet;
      
      // reset or empty cart after getting the data for display
      store.dispatch('resetOrder');
    }

    onBeforeMount(() => {
      // to get placed orders to be rendered and displayed in the page
      getPlacedOrders();
    });

    return { state, getPlacedOrders };
  },
}
</script>

<style>
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