<template>
  <div class="px-8 pt-8">
    <div class="mx-auto mb-0.5 h-30 bg-light-blue rounded-xl p-3 order-card">
      <div class="flex p-1">
        <div class="my-auto pr-3 w-1/4">
          <span class="text-lg manrope-regular">Order #{{ order.id }}</span>
        </div>
        <div class="flex-1">
          <div class="ml-3 space-y-1 pr-3">
            <div class="manrope-extrabold">{{ order.name }}</div>
            <div class="text-md manrope-regular">
              <span class="text-md manrope-bold">Contact Number:</span>
              {{ order.contactNo }}
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
export default {
  name: 'OrderSetCard',
  props: {
    order: {
      type: Object,
      required: true,
    },
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
</style>
