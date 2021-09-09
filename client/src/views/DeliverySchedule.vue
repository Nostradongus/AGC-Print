<template>
  <div>
    <side-bar />
    <page-header title="Schedule Delivery">
      <!-- Order Details -->
      <div
        class="
          bg-light-blue
          text-lg
          manrope-regular
          rounded-xl
          p-6
          m-8
          h-30
          grid grid-cols-2
        "
      >
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Order Set Number:</h3>
            <p>123456789</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Total Project Cost:</h3>
            <p>Pending Price</p>
            <!-- <p>₱ 10000</p> -->
          </div>
        </div>
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Status:</h3>
            <p>Pending</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Delivery Address:</h3>
            <p>123 Pley ground stret</p>
          </div>
        </div>
      </div>
      <form class="flex flex-col m-8">
        <div class="flex flex-row mb-6 items-center">
          <h3 class="w-1/3 text-center manrope-bold">Date of Delivery</h3>
          <input class="w-full lg:w-1/2" type="date" />
        </div>
        <div class="flex flex-row mb-6 items-center">
          <h3 class="w-1/3 text-center manrope-bold">Time of Delivery</h3>
          <input class="w-full lg:w-1/2" type="time" />
        </div>
        <div class="flex justify-end lg:mr-48">
          <button
            class="
              manrope-regular
              text-white
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-link-water hover:text-primary-blue
              mb-2
              mt-8
              rounded-xl
              bg-primary-blue
              p-3
              absolute
            "
          >
            Submit
          </button>
        </div>
      </form>
    </page-header>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import SideBar from '../components/SideBar.vue';
import { ref, reactive, onMounted } from 'vue';
import * as api from '../api';
import { useRoute, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  components: { SideBar, PageHeader },
  name: 'DeliverySchedule',
  setup() {},
};
</script>

<style></style>
