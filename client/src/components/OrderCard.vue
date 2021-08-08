<template>
  <div class="px-8 pt-8">
    <div
      class="
        bg-white
        mx-auto
        border-gray-500 border
        text-gray-700
        mb-0.5
        h-30
      "
    >
    <div class="flex p-3 border-l-8">
      <div class="my-auto border-r-2 pr-3">
        <span class="text-lg manrope-regular">Order #{{ order.id }}</span>
      </div>
      <div class="flex-1">
        <div class="ml-3 space-y-1 border-r-2 pr-3">
          <div class="manrope-extrabold">{{ order.type }}</div>
          <div class="text-md manrope-regular">
            <span class="text-md manrope-bold">Complete name:</span>
            {{ order.name }}
          </div>
          <div class="text-md manrope-regular">
            <span class="text-md manrope-bold"> Delivery Address:</span>
            {{ order.address }}
          </div>
          <div class="text-md manrope-regular">
            <span class="text-md manrope-bold">Date Ordered:</span>
            {{ order.dateRequested }}
          </div>
        </div>
      </div>
      <div>
        <div class="ml-3 my-8 p-1 w-20 mr-12">
          <div class="text-md manrope-bold text-center">{{ order.status }}</div>
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
export default {
  name: 'OrderCard',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
}
</script>
