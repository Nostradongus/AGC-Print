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
        <div class="receipt-content justify-self-start">Ref#</div>
      </ReceiptModal>
      <!-- End of Modal -->
    </div>
  </div>
</template>

<script>
import ReceiptModal from './ReceiptModal.vue';
import { ref } from 'vue';
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
  setup() {
    const showModal = ref(false);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    return { showModal, toggleModal };
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
  margin-bottom: 45px;
}
</style>
