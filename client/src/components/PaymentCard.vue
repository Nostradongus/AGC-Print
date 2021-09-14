<template>
  <div class="bg-light-blue rounded-xl p-4 mx-auto mb-2 h-30 payment-card">
    <div class="flex flex-row justify-items-stretch items-center">
      <div v-if="!payment.confirmed" class="flex-auto w-1/3">
        <p class="text-lg manrope-regular">{{ payment.dateUploaded }}</p>
      </div>
      <div v-if="!payment.confirmed" class="flex-auto w-1/2">
        <p class="text-lg manrope-regular">Payment Pending Verification</p>
      </div>
      <div v-if="payment.confirmed" class="flex-auto w-1/4">
        <p class="text-lg manrope-regular">{{ payment.dateConfirmed }}</p>
      </div>
      <div v-if="payment.confirmed" class="flex-auto w-1/3">
        <p class="text-lg manrope-regular">Ref #{{ payment.refNumber }}</p>
      </div>
      <div v-if="payment.confirmed" class="flex-auto w-1/12">
        <p class="text-lg manrope-regular">{{ payment.paymentAcc }}</p>
      </div>
      <div v-if="payment.confirmed" class="flex-auto w-24">
        <p class="text-lg manrope-regular">₱ {{ payment.amount }}</p>
      </div>
      <div v-if="payment.filename" class="flex flex-col justify-self-end text-center items-center w-1/6">
        <button
          class="
            text-primary-blue
            manrope-bold
            rounded-md
            pt-0.5
            pl-2
            pr-2
            focus:outline-none
            bg-gray-500
            mr-5
            transition duration-100 ease-in-out hover:bg-light-gray
          "
          @click="toggleModal"
          type="button"
        >
          View Receipt >
        </button>
        <button
          v-if="state.worker && !payment.confirmed"
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
            mt-2
            mr-7
            rounded-xl
            bg-primary-blue
          "
          @click="toggleVerifyPaymentModal"
          >Verify</button
        >
      </div>

      <!-- payment receipt image view modal -->
      <ImageModal :showModal="showModal" @close="toggleModal">
        <div class="receipt-content flex flex-col justify-center items-center">
          <!-- TODO: reference number to be updated soon -->
          <!-- <h3 class="text-lg leading-6 font-medium flex-grow-0 mb-5 self-start">
            Ref# {{ payment.refNumber }}
          </h3> -->

          <img
            :src="payment.filePath"
            onerror="this.onerror=null;this.src='../src/assets/nopreview.png'"
            alt="Payment receipt image"
            class="flex-grow receipt-img self-center"
          />
          <button
            class="
              manrope-bold
              dowload-btn
              transition
              duration-300
              hover:bg-link-water hover:text-primary-blue
              flex-shrink
            "
            @click="downloadImg"
          >
            Download Receipt
          </button>
        </div>
      </ImageModal>

      <!-- verify payment view modal -->
      <VerifyPaymentModal 
        :verifyPayment="showVerifyPaymentModal" 
        @close="toggleVerifyPaymentModal"
      >
        <form @submit.prevent="confirmPayment" class="items-start">
          <!-- payment account -->
          <div class="flex flex-col mt-10">
            <div class="flex flex-row items-start">
              <label
                for="paymentAcc"
                class="relative manrope-bold text-primary-blue text-gray-600 text-lg mt-2"
              >Account: </label
              >
              <select
                id="paymentAcc"
                name="paymentAcc"
                v-model.trim="paymentData.paymentAcc"
                class="manrope-bold text-md dropdown-field w-48 ml-4"
              >
                <option value="BDO" selected>BDO</option>
                <option value="BPI">BPI</option>
                <option value="GCash">GCash</option>
                <option value="OTC">Over The Counter (OTC)</option>
              </select>
            </div>
            <div class="flex flex-row items-start mt-2">
              <label
                for="refNumber"
                class="relative manrope-bold text-primary-blue text-gray-600 text-md mt-4"
              >Reference Number #: </label
              >
              <div>
                <input
                  id="refNumber"
                  name="refNumber"
                  type="number"
                  v-model.trim="paymentData.refNumber"
                  class="manrope-bold text-md input-text-field w-96 ml-4"
                  :class="{ 'border-red': v.refNumber.$error }"
                />
                <p
                  v-if="v.refNumber.$error"
                  class="text-red manrope-bold text-left ml-4 text-sm"
                >
                  {{ v.refNumber.$errors[0].$message }}
                </p>
              </div>
            </div>
            <div class="flex flex-row items-start mt-2">
              <label
                for="amount"
                class="relative manrope-bold text-primary-blue text-gray-600 text-lg mt-4"
              >Amount Paid: </label
              >
              <div>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.0001"
                  v-model.trim="paymentData.amount"
                  class="manrope-bold text-md input-text-field w-96 ml-4"
                  :class="{ 'border-red': v.amount.$error }"
                />
                <p
                  v-if="v.amount.$error"
                  class="text-red manrope-bold text-left ml-4 text-sm"
                >
                  {{ v.amount.$errors[0].$message }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button
              v-if="!state.submitted"
              class="
                manrope-bold
                dowload-btn
                transition
                duration-300
                hover:bg-link-water hover:text-primary-blue
                flex-shrink
              "
            >
              Confirm Payment
            </button>
            <p
              v-else
              class="manrope-bold absolute bottom-6 text-primary-blue text-md"
            >
              Confirming Payment...
            </p>
          </div>
        </form>
      </VerifyPaymentModal>
    </div>
  </div>
</template>

<script>
import fileDownload from 'js-file-download';
import ImageModal from './Modals/ImageModal.vue';
import VerifyPaymentModal from './Modals/VerifyPaymentModal.vue';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, numeric, minValue } from '@vuelidate/validators';
import axios from 'axios';
import * as api from '../api/index.js';

export default {
  name: 'PaymentCard',
  components: {
    ImageModal,
    VerifyPaymentModal,
  },
  props: {
    payment: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      worker: null,
      submitted: false,
    });
    const paymentData = reactive({
      paymentAcc: 'BDO',
      refNumber: null,
      amount: null,
    })
    const store = useStore();
    const showModal = ref(false);
    const showVerifyPaymentModal = ref(false);

    const rules = {
      refNumber: { required, numeric },
      amount: { required, minValue: minValue(1) },
    };

    const v = useVuelidate(rules, paymentData);

    if (JSON.parse(localStorage.getItem('user')) == null) {
      state.worker = store.state.worker.worker.username
    }

    function toggleModal() {
      showModal.value = !showModal.value;
    }

    function toggleVerifyPaymentModal() {
      showVerifyPaymentModal.value = !showVerifyPaymentModal.value;
    }

    async function confirmPayment() {
      const validated = await v.value.$validate();

      if (validated) {
        state.submitted = true;

        try {
          // verify payment receipt
          await api.verifyPayment(props.payment.id, paymentData);
          
          // get updated payment
          const payment = await api.getPayment(props.payment.id);

          // get updated order set
          const orderSet = await api.getOrderSet(payment.data.orderSetId);

          // create updated data object
          const data = {
            paymentAcc: payment.data.paymentAcc,
            refNumber: payment.data.refNumber,
            amount: payment.data.amount,
            confirmed: payment.data.confirmed,
            dateConfirmed: payment.data.dateConfirmed,
            paidDownPayment: orderSet.data.paidDownPayment,
            remBalance: orderSet.data.remBalance,
          }

          // update UI of parent component with updated payment data
          emit('paymentVerify', data);
          toggleVerifyPaymentModal();
          
          state.submitted = false;
        } catch (err) {
          console.log(err);
        }
      }
    }

    function downloadImg() {
      axios({
        url: props.payment.filePath,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        // get filename and file type
        const fileType = props.payment.filePath.substring(props.payment.filePath.lastIndexOf('.'));
        const filename = props.payment.filename.substring(props.payment.filename.indexOf('/') + 1) + fileType;

        fileDownload(response.data, filename);
      });
    }
    return { state, 
             v, 
             paymentData,
             showModal, 
             showVerifyPaymentModal, 
             toggleModal, 
             toggleVerifyPaymentModal, 
             confirmPayment,
             downloadImg,
           };
  },
};
</script>

<style>
.payment-card {
  transition: 1500ms;
}

.payment-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.receipt-content {
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
  width: 50%;
  height: 3rem;
  vertical-align: middle;
  outline: none;
}

.receipt-img {
  max-width: 100%;
  max-height: 75%;
}

.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 48rem;
  height: 2rem;
}
</style>
