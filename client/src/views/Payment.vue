<template>
  <div>
    <side-bar />
    <page-header title="Payment Portal">
      <div class="pr-8 pl-8 pt-4">
        <div class="bg-light-blue rounded-xl p-6 mx-auto mb-8 h-30">
          <p class="text-lg manrope-bold">
            You can pay through the following channels:
          </p>
          <br />
          <div class="grid grid-cols-3">
            <div>
              <p class="text-lg manrope-bold">Banco De Oro:</p>
              <p class="text-lg manrope-regular">Account Name: AGC Print</p>
              <p class="text-lg manrope-regular">
                Account Number: 000170007138
              </p>
              <p class="text-lg manrope-regular">
                Account Branch: BDO Kamagong
              </p>
            </div>
            <div>
              <p class="text-lg manrope-bold">BDO:</p>
              <p class="text-lg manrope-regular">
                Account Name: Jem Nepomuceno
              </p>
              <p class="text-lg manrope-regular">Account Number: 3719531236</p>
              <p class="text-lg manrope-regular">Account Branch: BPI Dian</p>
            </div>
            <div>
              <p class="text-lg manrope-bold">Gcash:</p>
              <p class="text-lg manrope-regular">
                Account Name: Jem Nepomuceno
              </p>
              <p class="text-lg manrope-regular">Account Number: 09178170119</p>
            </div>
          </div>
        </div>

        <!-- Payment System -->
        <div class="flex">
          <div class="flex-1">
            <div class="bg-light-blue rounded-xl p-6 mx-auto mb-8 h-30">
              <div class="grid grid-cols-2">
                <div>
                  <p class="text-lg manrope-regular">
                    Order Number: 1234567890
                  </p>
                  <p class="text-lg manrope-regular">
                    Total Project Cost: PHP 1000.00
                  </p>
                </div>
                <div>
                  <p class="text-lg manrope-regular">Downpayment: N/A</p>
                  <p class="text-lg manrope-regular">
                    Remaning Balance: PHP 500.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="manrope-bold text-md mb-3">Upload Payment Slip Here:</p>
            <input
              id="order-image"
              name="order-image"
              type="file"
              ref="file"
              class="manrope-regular w-72"
              min="0"
              @change="onSelectFile"
            />
            <label
              for="order-image"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >Upload Image</label
            >
          </div>
        </div>
        <div>
          <div class="bg-light-blue rounded-xl p-4 mx-auto mb-2 h-30">
            <div class="flex justify-center">
              <div class="flex-auto">
                <p class="text-lg manrope-regular">02/01/2021</p>
              </div>
              <div class="flex-auto">
                <p class="text-lg manrope-regular">OR#123456789</p>
              </div>
              <div class="flex-auto">
                <p class="text-lg manrope-regular">BDO</p>
              </div>
              <div class="flex-auto">
                <p class="text-lg manrope-regular">PHP500.00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-end">
          <div class="flex-1">
            <router-link
              class="
                manrope-regular
                text-white
                inline-block
                transition
                duration-300
                ease-in-out
                text-center text-lg
                hover:bg-link-water hover:text-primary-blue
                w-32
                mx-8
                p-3
                rounded-xl
                bg-primary-blue
              "
              to="/my-orders/"
              >Back</router-link
            >
          </div>
          <div>
            <router-link
              class="
                manrope-regular
                text-white
                inline-block
                transition
                duration-300
                ease-in-out
                text-center text-lg
                hover:bg-link-water hover:text-primary-blue
                w-32
                mx-8
                p-3
                rounded-xl
                bg-primary-blue
              "
              to="/orders/"
              >Pay Now</router-link
            >
          </div>
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';

import { reactive, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'Payment',
  components: {
    SideBar,
    PageHeader,
  },
};
</script>

<style></style>
