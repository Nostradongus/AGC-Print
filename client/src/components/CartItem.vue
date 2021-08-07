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
        <div class="flex items-center w-1/3">
          <div class="manrope-extrabold">{{ order.type }}
          </div>
        </div>
        <div class="w-1/3">
          <div class="ml-3 space-y-1 border-r-2 pr-3">
            <div class="text-md manrope-regular">
              <span class="text-md manrope-bold"> Dimensions:</span>
              {{ order.width }} x {{ order.height }}
            </div>
            <div v-if="order.eyelets != null" class="text-md manrope-regular">
              <span class="text-md manrope-bold">Number of Eyelets:</span>
              {{ order.eyelets }}
            </div>
            <div v-if="order.frameOption != null" class="text-md manrope-regular">
              <span class="text-md manrope-bold">Frame:</span>
              {{ order.frameOption }}
            </div>
            <div v-if="order.frameOption === '3/4inches' || order.frameOption === '1.5inches'" class="text-md manrope-regular">
              <span class="text-md manrope-bold">Frame Edges:</span>
              {{ order.frameEdges }}
            </div>
            <div v-if="order.frameFinishing != null" class="text-md manrope-regular">
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
        <div class="w-1/3 flex flex-col justify-center text-center items-center">
          <label for="quantity" class="text-md manrope-bold">Quantity</label>
          <input id="quantity" class="text-center border-2 w-24" type="text" :value="order.quantity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props:{
    order:{
      type: Object,
    }
  }
}
</script>

<style>

</style>