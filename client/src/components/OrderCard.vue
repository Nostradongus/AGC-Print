<template>
  <div class="px-8 pt-3 pb-5">
    <div class="bg-light-blue rounded-xl p-4 mx-auto mb-0.5 h-30 cart-card">
      <div class="flex p-3">
        <div class="my-auto pr-3 w-1/3">
          <span class="text-md manrope-regular">Order #{{ order.id }}</span>
        </div>
        <div class="flex items-center pl-8 w-80 max-h-52">
          <!-- NOTE: USE IF ACCESSING FROM LOCAL STORAGE -->
          <!-- <img
            :src="`http://localhost:5000/order_images/${order.filename}`"
            onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
            alt="Order Image"
            class="order-img"
            border="0"
          /> -->
          <!-- NOTE: USE IF ACCESSING FROM CLOUDINARY -->
          <img
            :src="order.filePath"
            onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
            alt="Order Image"
            class="order-img h-full w-full object-contain"
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
              v-if="
                order.frameOption != null && order.frameOption !== 'placeholder'
              "
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame:</span>
              {{ order.frameOption }}
            </div>
            <div
              v-if="
                order.frameOption === '3/4inches' ||
                order.frameOption === '1.5inches'
              "
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame Edges:</span>
              {{ order.frameEdges }}
            </div>
            <div
              v-if="
                order.frameFinishing != null &&
                order.frameFinishing !== 'placeholder'
              "
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
              <span v-if="order.remarks !== ''" class="text-md manrope-bold"
                >Remarks:</span
              >
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
        >
          <div class="flex" v-if="order.price === -1">Pending Price</div>
          <div class="flex" v-else>₱ {{ order.price }}</div>
          <div class="flex" v-if="isStaff">
            <router-link
              class="
                manrope-regular
                text-white
                inline-block
                transition
                duration-300
                ease-in-out
                text-center text-xs
                hover:bg-link-water hover:text-primary-blue
                w-20
                h-6
                mx-8
                mt-2
                p-1
                rounded-xl
                bg-primary-blue
              "
              :to="isStaff ? `/view-order-list` : `/my-orders`"
              >Edit</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCard',
  props: {
    order: {
      type: Object,
    },
    isStaff: {
      type: Boolean,
    },
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
