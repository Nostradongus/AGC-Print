<template>
  <div class="px-8 pt-8">
    <div class="bg-light-blue rounded-xl p-4 mx-auto mb-0.5 h-30 cart-card">
      <div class="flex p-3">
        <div class="my-auto pr-3 w-1/4">
          <span class="text-lg manrope-regular">Order #{{ order.id }}</span>
        </div>
        <div class="flex items-center pl-8 w-1/3">
          <!-- TODO: replace alt attribute with 'No Preview' asset image -->
          <img
            :src="`http://localhost:5000/${order.img}`"
            alt="Order Image"
            class="order-img"
            border="0"
          />
        </div>
        <div class="w-1/4 flex flex-col justify-center items-center">
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
              <span class="text-md manrope-bold">Remarks:</span>
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
          v-if="order.price == -1"
          class="w-1/6 flex justify-center text-center items-center"
        >
          Pending Price
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
