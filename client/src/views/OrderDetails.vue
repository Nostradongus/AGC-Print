<template>
  <div>
    <side-bar />
    <page-header title="Order Details">
      <div class="p-8" v-if="state.order">
        <!-- Order Details -->
        <div class="flex">
          <div class="flex-1">
            <span class="text-lg manrope-bold">Order #: </span>
            <span class="text-lg manrope-regular">{{ state.order.id }}</span>

            <br />

            <span class="text-lg manrope-bold">Name of Receiver: </span>
            <span class="text-lg manrope-regular">{{ state.order.name }}</span>

            <br />

            <span class="text-lg manrope-bold">Email Address: </span>
            <span class="text-lg manrope-regular">{{ state.order.email }}</span>

            <br />

            <span class="text-lg manrope-bold">Contact Number: </span>
            <span class="text-lg manrope-regular">
              +{{ state.order.contactNo }}
            </span>

            <br />

            <span class="text-lg manrope-bold">Delivery Address: </span>
            <span class="text-lg manrope-regular">{{
              state.order.address
            }}</span>
          </div>
          <div>
            <span class="text-lg manrope-bold">Order Status: </span>
            <span class="text-lg manrope-regular">{{
              state.order.status
            }}</span>

            <br />

            <span class="text-lg manrope-bold">Total Price: </span>
            <span
              v-if="state.order.totalPrice != null"
              class="text-lg manrope-regular"
              >{{ state.order.totalPrice }}</span
            >
            <span
              v-else-if="state.order.totalPrice == null"
              class="text-lg manrope-regular"
              >Pending Total Price</span
            >

            <br />
          </div>
        </div>

        <order-card
          v-for="order in state.order.orders"
          :key="order.id"
          :order="order"
        />
      </div>

      <div class="flex mb-8">
        <div class="flex-1">
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
              p-3
              rounded-xl
              bg-primary-blue
            "
            to="/my-orders"
            >Back</router-link
          >
        </div>
        <div>
          <router-link
            v-if="state.totalPrice !== -1"
            class="
              manrope-regular
              text-white
              inline-block
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-link-water hover:text-primary-blue
              mx-8
              p-3
              rounded-xl
              bg-primary-blue
            "
            :to="`/report-order/${route.params.id}`"
            >Report Order</router-link
          >
          <router-link
            v-if="state.totalPrice !== -1"
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
              p-3
              rounded-xl
              bg-primary-blue
            "
            :to="`/payment/${route.params.id}`"
            >Pay Here</router-link
          >
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, watchEffect, onMounted } from 'vue';
import { useStore } from 'vuex';
import OrderCard from '../components/OrderCard.vue';
import * as api from '../api';

export default {
  name: 'OrderDetails',
  components: { SideBar, PageHeader, OrderCard },
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
        const res = await api.getOrderSet(route.params.id);
        state.order = res.data;
      } catch (err) {
        console.log(err);
      }
    }
    return { state, route };
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
