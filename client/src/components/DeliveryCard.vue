<template>
  <div class="px-8 pt-3 pb-5">
    <div class="bg-light-blue rounded-xl p-4 mx-auto mb-0.5 h-30 delivery-card">
      <div class="flex p-1 z-0">
        <div class="my-auto pr-3 w-1/3">
          <span class="text-md manrope-regular">Order #{{order.id}}</span>
        </div>
        <div class="flex-1">
          <div class="space-y-1 ml-3 mt-1">
            <div class="manrope-extrabold">{{order.name}}</div>
            <div class="text-sm manrope-regular">
              <span class="text-md manrope-bold">
                Delivery Date: {{ order.deliverySched.date }}
              </span>
            </div>
            <div class="text-sm manrope-regular">
              <span class="text-sm manrope-bold">
                Delivery Time: {{ order.deliverySched.time }} 
              </span>
            </div>
            <div v-if="order.deliverySched.remarks" class="text-sm manrope-regular">
              <span class="text-sm manrope-bold">
                Remarks: {{ order.deliverySched.remarks }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
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
import { reactive, ref } from 'vue';
import * as api from '../api';
export default {
  name: 'DeliveryCard',
  components: {
  },
  props: {
    order: {
      type: Object
    },
  },
};
</script>

<style lang="postcss">
.delivery-card {
  transition: 1500ms;
}

.delivery-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}

.order-img {
  max-width: 75%;
  max-height: 75%;
}

.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 48rem;
  height: 2rem;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.image-content {
  height: 90%;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 45px;
}

.dowload-btn {
  position: absolute;
  background-color: #0f4c81;
  color: white;
  border-radius: 20px;
  bottom: 15px;
  left: 25%;
  width: 50%;
  height: 3rem;
  vertical-align: middle;
  outline: none;
}

.content-img {
  max-width: 100%;
  max-height: 75%;
}

.modal-border {
  border-style: solid;
  @apply border-light-blue;
  @apply bg-light-blue;
  border-width: 2.5px;
}
</style>
