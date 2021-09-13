<template>
  <div class="px-8 pt-3 pb-5">
    <div class="bg-light-blue rounded-xl p-4 mx-auto mb-0.5 h-30 cart-card">
      <div class="flex p-3">
        <div class="flex items-center w-1/5 h-1/5">
          <!-- NOTE: USE IF ACCESSING FILE FROM LOCAL STORAGE -->
          <!-- <img
            :src="`http://localhost:5000/order_images/${order.filename}`"
            onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
            alt="Order Image" 
            class="order-img"
            border="0"
          /> -->
          <!-- NOTE: USE IF ACCESSING FILE WITH CLOUDINARY -->
          <img
            :src="order.filePath"
            onerror="this.onerror=null;this.src='../src/assets/nopreview.png'"
            alt="Order Image" 
            class="order-img"
            border="0"
          />
        </div>
        <div class="w-1/3 flex flex-col justify-center items-center">
          <div class="ml-3 space-y-1 pr-3">
            <div class="text-md manrope-regular">
              <span class="text-md manrope-bold"> Type:</span>
              {{ order.type }}
            </div>
            <div class="text-md manrope-regular">
              <span class="text-md manrope-bold"> Dimensions:</span>
              {{ order.width }} x {{ order.height }}
            </div>
            <div v-if="order.eyelets != null" class="text-md manrope-regular">
              <span class="text-md manrope-bold">Number of Eyelets:</span>
              {{ order.eyelets }}
            </div>
            <div
              v-if="order.frameOption != null && order.frameOption !== 'placeholder'"
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame:</span>
              {{ order.frameOption }}
            </div>
            <div
              v-if="
                order.frameOption === '3/4 Inches' ||
                order.frameOption === '1.5 Inches'
              "
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame Edges:</span>
              {{ order.frameEdges }}
            </div>
            <div
              v-if="order.frameFinishing != null && order.frameFinishing !== 'placeholder'"
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame Finishing:</span>
              {{ order.frameFinishing }}
            </div>
            <div v-if="order.diecut != null" class="text-md manrope-regular">
              <span class="text-md manrope-bold">Die-cut:</span>
              {{ order.diecut }}
            </div>
            <div class="text-md manrope-regular">
              <span v-if="order.remarks !== ''" class="text-md manrope-bold">Remarks:</span>
              {{ order.remarks }}
            </div>
          </div>
        </div>
        <div
          class="w-1/3 flex flex-col justify-center text-center items-center"
        >
          <label for="quantity" class="text-md manrope-bold">Quantity</label>
          <p>{{ order.quantity }}</p>
        </div>
        <div
          class="w-1/6 flex flex-col justify-center text-center items-center"
          @click="onDelete"
        >
          <span class="text-2xl manrope-bold text-primary-blue cursor-pointer">X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'CartItem',
  props: {
    order: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();

    // to delete cart item
    async function onDelete() {
      // get orders
      let orders = store.state.order.orders;

      // delete specified cart item
      for (let ctr = 0; ctr < orders.length; ctr++) {
        if (props.order.id === orders[ctr].id) {
          // delete cart item in local storage
          store.dispatch('deleteOrder', ctr);
        }
      }

      /* NOTE: USE WHEN DELETING FROM LOCAL STORAGE */
      // await api.deleteFromCart(props.order.filename);

      /* NOTE: USE WHEN DELETING FROM CLOUDINARY */
      // delete cart item image from database
      const arr = props.order.filename.split('/');
      const filename = arr[0] + '.' + arr[1];
      console.log(filename);

      const result = await api.deleteFromCart(filename);
    }

    return { onDelete };
  },
};
</script>

<style>
.cart-card {
  transition: 1500ms;
}

.cart-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}

.order-img {
  max-width: 75%;
  max-height: 75%;
}
</style>
