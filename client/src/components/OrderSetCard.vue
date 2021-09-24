<template>
  <div class="px-8 pt-3 pb-5">
    <div 
      class="mx-auto mb-0.5 h-30 bg-light-blue rounded-xl p-3 order-card"
    >
      <!-- preview orders view -->
      <OrderPreviewModal :previewOrders="previewOrders" @close="toggleModal">
        <div class="overflow-y-scroll mt-7">
          <div v-for="o in state.orders" :key="o.id" class="flex flex-row p-1 mt-4">
            <div class="flex items-center pl-5 w-1/2 h-1/2">
              <!-- NOTE: USE IF ACCESSING FROM CLOUDINARY -->
              <img
                :src="o.filePath"
                onerror="this.onerror=null;this.src='https://res.cloudinary.com/agc-print/image/upload/v1632476595/nopreview_uwhwy9.png'"
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
      </OrderPreviewModal>

      <!-- order set details -->
      <div class="flex p-1 z-0">
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
        <div class="flex flex-col items-center justify-center">
          <button
            class="
              text-primary-blue
              manrope-bold
              rounded-md
              mr-4
              pt-0.5
              pl-1
              pr-1
              ml-2
              mb-3
              focus:outline-none
              bg-gray-500
              transition duration-100 ease-in-out hover:bg-light-gray
            "
            @click="toggleModal"
          >
            Preview Orders
          </button>
          <router-link :to="`/order-details/${order.id}`">
            <button
              class="
                text-primary-blue
                manrope-bold
                rounded-md
                mr-4
                pt-0.5
                pl-2
                pr-2
                ml-2
                focus:outline-none
                bg-gray-500
                transition duration-100 ease-in-out hover:bg-light-gray
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
import OrderPreviewModal from './Modals/OrderPreviewModal.vue';
import { reactive, ref, onBeforeMount } from 'vue';
import * as api from '../api/index.js';

export default {
  components: { OrderPreviewModal },
  name: 'OrderSetCard',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // for orders preview
    const previewOrders = ref(false);

    const state = reactive({
      orders: null,
    });

    function toggleModal() {
      previewOrders.value = !previewOrders.value;
    }

    async function getOrders() {
      // get orders of order set for preview
      const res = await api.getOrdersFromOrderSet(props.order.id);
      state.orders = res.data;
    }

    onBeforeMount(() => {
      getOrders();
    });

    return { state, previewOrders, toggleModal, getOrders };
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
