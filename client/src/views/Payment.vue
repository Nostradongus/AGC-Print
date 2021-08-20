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
              id="payment-file"
              name="payment-file"
              type="file"
              ref="file"
              class="manrope-regular w-72"
              min="0"
              @change="onSelectFile"
            />
            <label
              for="payment-file"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >Upload Image</label
            >
            <p
              v-if="state.fileValidation != null && !state.fileValidation"
              class="text-red manrope-bold text-left text-sm mt-2"
            >
              Please upload your payment receipt.
            </p>
            <p
              v-if="state.fileTypeValidation != null && !state.fileTypeValidation"
              class="text-red manrope-bold text-left text-xs mt-2"
            >
              File must be in .jpg, .png, .svg, .psd, .ai, or .pdf format.
            </p>
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
        <div class="flex items-end mt-8">
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
              :to="`/order-details/${route.params.id}`"
              >Back</router-link
            >
          </div>
          <div>
            <button
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
              @click="submitPayment"
              >Pay Now</button
            >
          </div>
        </div>
        <div class="flex items-end mt-1">
          <div class="flex-1" />
          <p
            v-if="state.paymentSubmitted"
            class="text-primary-blue manrope-bold text-center text-sm mr-7"
          >
            Payment Submitted!
          </p>
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';

import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import * as api from '../api';

export default {
  name: 'Payment',
  components: {
    SideBar,
    PageHeader,
  },
  setup() {
    let file = ref(null);
    const route = useRoute();
    let state = reactive({
      fileValidation: null,
      fileTypeValidation: null,
      paymentSubmitted: false,
      paymentFile: null,
    });

    function onSelectFile() {
      state.paymentSubmitted = false;
      state.fileValidation = file.value.files.length == 0 ? false : true;

      // check if there is uploaded file by user
      if (state.fileValidation) {
        state.paymentFile = file.value.files[0];

        // valid file type extensions
        const extensions = ['png', 'jpg', 'jpeg', 'svg', 'ai', 'psd', 'pdf'];

        // get uploaded file's extension
        const fileExtension = state.paymentFile.name.substring(state.paymentFile.name.indexOf('.') + 1);

        // check if uploaded file contains valid file type extension
        state.fileTypeValidation = extensions.includes(fileExtension);
      } else {
        state.fileTypeValidation = null;
      }
    }

    async function submitPayment(e) {
      e.preventDefault();

      state.paymentSubmitted = false;

      // check if payment file has been uploaded by user
      state.fileValidation = file.value.files.length == 0 ? false : true;

      if (state.fileValidation && state.fileTypeValidation) {
        // create FormData to store user payment receipt data with uploaded file
        const formData = new FormData();
        formData.append('orderSetId', route.params.id);
        formData.append('payment-file', state.paymentFile);

        // add user payment receipt data to database
        const res = await api.addPayment(formData);

        // if user payment receipt successfully submitted
        if (res.data != null && typeof res.data !== 'undefined') {
          // set indicator that user payment receipt was submitted successfully
          state.paymentSubmitted = true;

          // reset fields
          state.fileValidation = null;
          state.fileTypeValidation = null;
          document.getElementById('payment-file').value = ''; // remove file
        }
      }
    }

    return { state, file, onSelectFile, submitPayment, route };
  }
};
</script>

<style></style>
