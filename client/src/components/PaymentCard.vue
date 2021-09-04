<template>
  <div class="bg-light-blue rounded-xl p-4 mx-auto mb-2 h-30 payment-card">
    <div class="grid grid-flow-col grid-cols auto-cols-5 justify-items-stretch">
      <div v-if="!payment.confirmed" class="flex-auto">
        <p class="text-lg manrope-regular">{{ payment.dateUploaded }}</p>
      </div>
      <div v-if="!payment.confirmed" class="flex-auto">
        <p class="text-lg manrope-regular">Payment Pending Verification</p>
      </div>
      <div v-if="payment.confirmed" class="flex-auto">
        <p class="text-lg manrope-regular">Ref #{{ payment.refNumber }}</p>
      </div>
      <div v-if="payment.confirmed" class="flex-auto">
        <p class="text-lg manrope-regular">{{ payment.paymentAcc }}</p>
      </div>
      <div v-if="payment.confirmed" class="flex-auto">
        <p class="text-lg manrope-regular">₱ {{ payment.amount }}</p>
      </div>
      <div v-if="payment.filename" class="flex-auto justify-self-end">
        <button
          class="
            text-primary-blue
            manrope-regular
            rounded-sm
            focus:outline-none
            bg-gray-500
            mr-5
          "
          @click="toggleModal"
          type="button"
        >
          View Details >
        </button>
      </div>
      <!-- Start of Modal -->
      <ReceiptModal :showModal="showModal" @close="toggleModal">
        <div class="receipt-content flex flex-col justify-center items-center">
          <!-- TODO: reference number to be updated soon -->
          <!-- <h3 class="text-lg leading-6 font-medium flex-grow-0 mb-5 self-start">
            Ref# {{ payment.refNumber }}
          </h3> -->

          <img
            :src="payment.filePath"
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
      </ReceiptModal>
      <!-- End of Modal -->
    </div>
  </div>
</template>

<script>
import ReceiptModal from './ReceiptModal.vue';
import { ref } from 'vue';
import axios from 'axios';
export default {
  name: 'PaymentCard',
  components: {
    ReceiptModal,
  },
  props: {
    payment: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const showModal = ref(false);

    function toggleModal() {
      showModal.value = !showModal.value;
    }

    function downloadImg() {
      axios({
        url: props.payment.filePath,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        
        // get filename
        const filename = props.payment.filename.substring(props.payment.filename.indexOf('/') + 1) + ".jpg";

        link.setAttribute('download', filename);
        document.body.appendChild(link);

        link.click();
      });
    }
    return { showModal, toggleModal, downloadImg };
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
</style>
