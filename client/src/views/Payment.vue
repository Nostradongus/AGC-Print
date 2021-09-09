<template>
  <div>
    <side-bar />
    <page-header title="Payment Portal">
      <div class="pr-8 pl-8 pt-4">
        <div v-if="state.worker == null" class="bg-light-blue rounded-xl p-6 mx-auto mb-8 h-30">
          <p class="text-lg manrope-bold">
            You can pay through the following channels:
          </p>
          <br />
          <div class="grid grid-cols-3">
            <div>
              <p class="text-lg manrope-bold">Banco De Oro:</p>
              <p class="text-lg manrope-regular">Account Name: AGC Print</p>
              <p class="text-lg manrope-regular">
                Account Number: 123456789012
              </p>
              <p class="text-lg manrope-regular">
                Account Branch: BDO Kamagong
              </p>
            </div>
            <div>
              <p class="text-lg manrope-bold">BPI:</p>
              <p class="text-lg manrope-regular">
                Account Name: Jem Nepomuceno
              </p>
              <p class="text-lg manrope-regular">
                Account Number: 123456789012
              </p>
              <p class="text-lg manrope-regular">Account Branch: BPI Dian</p>
            </div>
            <div>
              <p class="text-lg manrope-bold">GCash:</p>
              <p class="text-lg manrope-regular">
                Account Name: Jem Nepomuceno
              </p>
              <p class="text-lg manrope-regular">
                Account Number: 123456789012
              </p>
            </div>
          </div>
        </div>

        <p
          class="manrope-bold text-2xl text-center text-primary-blue mt-8"
          v-if="state.empty"
        >
          Loading data, please wait...
        </p>

        <!-- Payment System -->
        <div v-if="!state.empty" class="flex">
          <div class="w-11/12">
            <div class="bg-light-blue rounded-xl p-6 mx-auto mb-8 h-30">
              <div class="grid grid-cols-2">
                <div>
                  <p class="text-lg manrope-regular">
                    Order Set Number: {{ state.order.id }}
                  </p>
                  <p class="text-lg manrope-regular">
                    Total Project Cost: ₱ {{ state.order.price }}
                  </p>
                </div>
                <div>
                  <!-- TODO: to be updated -->
                  <p
                    v-if="!state.order.paidDownPayment"
                    class="text-lg manrope-regular"
                  >
                    Downpayment: ₱ {{ state.downPayment }}
                  </p>
                  <p v-else class="text-lg manrope-regular">
                    Downpayment: Already Paid
                  </p>
                  <p class="text-lg manrope-regular">
                    Remaining Balance: To Be Updated
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="state.worker" class="p-4 w-6/12">
            <div class="bg-light-blue rounded-xl p-6 mx-auto mb-8 h-30">
              <div class="flex flex-row items-center justify-center">
                <p class="text-md manrope-bold truncate max-w-xs">
                  Uploaded by: {{ state.order.userFullName }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="state.worker == null" class="p-4 w-4/12">
            <p class="manrope-bold text-md mb-3">
              Upload Payment Receipt Here:
            </p>
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
              v-if="
                state.fileTypeValidation != null && !state.fileTypeValidation
              "
              class="text-red manrope-bold text-left text-xs mt-2"
            >
              File must be in .jpg, .png, or .pdf format.
            </p>
            <p
              v-if="state.paymentSubmitted"
              class="text-primary-blue manrope-bold text-left text-sm mt-2"
            >
              Receipt Uploaded!
            </p>
          </div>
          <div v-if="state.worker == null" class="w-2/12 mt-8">
            <div>
              <button
                class="
                  manrope-regular
                  text-white
                  inline-block
                  transition
                  duration-300
                  ease-in-out
                  text-center text-sm
                  hover:bg-link-water hover:text-primary-blue
                  w-32
                  p-3
                  rounded-xl
                  bg-primary-blue
                "
                @click="submitPayment"
                v-if="!state.submitted"
              >
                Upload Receipt
              </button>
              <p
                v-else
                class="mt-3 manrope-bold text-primary-blue text-sm text-left"
              >
                Uploading receipt...
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="state.payment != null"
          class="overflow-y-auto max-h-screen pt-2 pb-2"
        >
          <!-- list of submitted payments by user -->
          <payment-card
            v-for="payment in state.payment"
            :key="payment.id"
            :payment="payment"
          />
        </div>
        <div class="flex items-end mt-8 mb-8">
          <div v-if="!state.empty" class="flex-1">
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
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import PaymentCard from '../components/PaymentCard.vue';

import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import * as api from '../api';

export default {
  name: 'Payment',
  components: {
    SideBar,
    PageHeader,
    PaymentCard,
  },
  setup() {
    let file = ref(null);
    const store = useStore();
    const route = useRoute();
    let state = reactive({
      worker: null,
      order: null,
      payment: null,
      fileValidation: null,
      fileTypeValidation: null,
      paymentSubmitted: false,
      paymentFile: null,
      downPayment: null,
      submitted: false,
      empty: true,
    });

    if (JSON.parse(localStorage.getItem('user')) == null) {
      state.worker = store.state.worker.worker.username
    }

    onMounted(() => {
      getOrderDetails();
      getOrderPayments();
    });

    async function getOrderDetails() {
      try {
        const res = await api.getOrderSet(route.params.id);
        state.order = res.data;

        // calculate down payment value
        state.downPayment = state.order.price * 0.5;
      } catch (err) {
        console.log(err);
      }
    }

    async function getOrderPayments() {
      try {
        const res = await api.getOrderSetIdPayments(route.params.id);
        state.payment = res.data;
      } catch (err) {
        console.log(err);
      }
      state.empty = false;
    }

    function onSelectFile() {
      state.paymentSubmitted = false;
      state.fileValidation = file.value.files.length == 0 ? false : true;

      // check if there is uploaded file by user
      if (state.fileValidation) {
        state.paymentFile = file.value.files[0];

        // valid file type extensions
        const extensions = ['png', 'jpg', 'jpeg', 'pdf'];

        // get uploaded file's extension
        const fileExtension = state.paymentFile.name.substring(
          state.paymentFile.name.indexOf('.') + 1
        );

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
        // indicate that payment form has been submitted
        state.submitted = true;

        // create FormData to store user payment receipt data with uploaded file
        const formData = new FormData();
        formData.append('orderSetId', route.params.id);
        formData.append('payment-file', state.paymentFile);

        // add user payment receipt data to database
        const res = await api.addPayment(formData);

        // if user payment receipt successfully submitted
        if (res.data != null && typeof res.data !== 'undefined') {
          // update payment list of order set
          const payments = await api.getOrderSetIdPayments(route.params.id);
          state.payment = payments.data;

          // set indicator that user payment receipt was submitted successfully
          state.paymentSubmitted = true;

          // reset fields
          state.submitted = false;
          state.fileValidation = null;
          state.fileTypeValidation = null;
          document.getElementById('payment-file').value = ''; // remove file
        }
      }
    }

    return { state, file, onSelectFile, submitPayment, route };
  },
};
</script>

<style></style>
