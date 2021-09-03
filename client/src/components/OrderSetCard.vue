<template>
  <div class="px-8 pt-3 pb-5">
    <div 
      class="mx-auto mb-0.5 h-30 bg-light-blue rounded-xl p-3 order-card"
    >
      <!-- orders preview -->
      <div class="relative">
        <div 
          v-if="state.hovered"
          class="absolute max-h-60 w-1/2 -top-3 float-left mx-auto bg-white rounded-xl p-3 z-50"
        >
          <div class="flex flex-row justify-end mb-1">
            <div class="flex-1">
              <p 
                class="manrope-bold px-2 text-primary-blue text-left text-lg"
              >
                Orders:
              </p>
            </div>
            <div
              class="flex justify-center text-center items-center"
              @click="previewOrders"
            >
              <span class="text-xl manrope-bold text-primary-blue cursor-pointer">X</span>
            </div>
          </div>
          <hr class="border-primary-blue bg-primary-blue manrope-bold border-solid border-t mb-0.5">
          <div class="overflow-y-scroll max-h-48">
            <div v-for="o in state.orders" :key="o.id" class="flex flex-row p-1 mt-2">
              <div class="flex items-center pl-8 w-1/3 h-1/3">
                <!-- NOTE: USE IF ACCESSING FROM CLOUDINARY -->
                <img
                  :src="o.filePath"
                  onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
                  alt="Order Image"
                  class="order-img"
                  border="0"
                />
              </div>
              <div class="w-1/3 flex flex-col justify-center items-center">
                <div class="text-md manrope-regular">
                  {{ o.type }}
                </div>
              </div>
              <div
                class="w-1/3 flex flex-col justify-center text-center items-center"
              >
                <label for="quantity" class="text-md manrope-bold">Quantity</label>
                <p>{{ o.quantity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-end mb-1.5">
        <div class="flex-1" />
        <span 
          class="h-1/7 w-1/7 cursor-pointer transition duration-100 ease-in-out hover:bg-light-gray rounded-md"
          @click="previewOrders"
        >
          <p 
            class="manrope-extrabold underline text-primary-blue text-right text-lg"
          > 
            Preview Orders 
          </p>
        </span>
      </div>
      <div class="flex p-1 z-0 -mt-5">
        <div class="my-auto pr-3 w-1/5">
          <span class="text-md manrope-regular">Order #{{ order.id }}</span>
        </div>
        <div class="flex-1">
          <div class="space-y-1 ml-3 mt-1">
            <div class="manrope-extrabold">{{ order.name }}</div>
            <div class="text-sm manrope-regular">
              <span class="text-md manrope-bold">Contact Number:</span>
              {{ order.contactNo }}
            </div>
            <div class="text-sm manrope-regular">
              <span class="text-sm manrope-bold"> Delivery Address:</span>
              {{ order.address }}
            </div>
            <div class="text-sm manrope-regular">
              <span class="text-sm manrope-bold">Date Ordered:</span>
              {{ order.dateRequested }}
            </div>
          </div>
        </div>
        <div>
          <div class="order-status">
            <div class="text-md manrope-bold text-center">
              {{ order.status }}
            </div>
          </div>
        </div>
        <div>
          <router-link :to="`/order-details/${order.id}`">
            <button
              class="
                text-primary-blue
                manrope-regular
                rounded-sm
                my-10
                mr-4
                pt-0.5
                ml-2
                focus:outline-none
                bg-gray-500
              "
            >
              View Details >
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from 'vue';
import * as api from '../api/index.js';

export default {
  name: 'OrderSetCard',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      orders: null,
      hovered: false,
    });

    async function getOrders() {
      // get orders of order set for preview
      const res = await api.getOrdersFromOrderSet(props.order.id);
      state.orders = res.data;
    }

    function previewOrders() {
      state.hovered = !state.hovered;
    }

    onBeforeMount(() => {
      getOrders();
    });

    return { state, getOrders, previewOrders };
  },
};
</script>

<style lang="postcss" scoped>
.order-status {
  @apply flex items-center mx-10 h-full;
}

.order-card {
  transition: 1500ms;
}

.order-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}

.order-img {
  max-width: 50%;
  max-height: 50%;
}
</style>
