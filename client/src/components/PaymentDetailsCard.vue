<template>
  <div class="px-8 pt-3 pb-5">
    <div
      class="mx-auto mb-0.5 h-30 bg-light-blue rounded-xl p-3 payment-card"
    >
      <!-- receipt image view modal -->
      <ImageModal :showModal="showModal" @close="toggleModal">
        <div class="receipt-content flex flex-col justify-center items-center">
          <!-- TODO: reference number to be updated soon -->
          <!-- <h3 class="text-lg leading-6 font-medium flex-grow-0 mb-5 self-start">
            Ref# {{ payment.refNumber }}
          </h3> -->

          <img
            :src="payment.filePath"
            onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
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

      <!-- report details -->
      <div class="flex p-1">
        <div class="my-auto pr-3 w-1/5">
          <span class="text-sm manrope-regular">Payment #{{ payment.id }}</span>
        </div>
        <div class="flex-1">
          <div class="space-y-1 ml-3 mt-1">
            <div class="manrope-extrabold">Order Set #: {{ payment.orderSetId }}</div>
            <div class="text-sm manrope-regular">
              <span class="text-md manrope-bold">User:</span>
              {{ payment.user }} ({{ payment.userFullName }})
            </div>
            <div class="text-sm manrope-regular">
              <span class="text-sm manrope-bold">Date Uploaded:</span>
              {{ payment.dateUploaded }}
            </div>
          </div>
        </div>
        <div>
          <div class="payment-status">
            <div v-if="payment.confirmed" class="text-md manrope-bold text-center">
              Verified
            </div>
            <div v-else class="text-md manrope-bold text-center">
              Payment Pending Verification
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button
            class="
              text-primary-blue
              manrope-bold
              rounded-md
              mr-4
              pt-0.5
              pl-1
              pr-1
              ml-2
              mb-3
              focus:outline-none
              bg-gray-500
              transition duration-100 ease-in-out hover:bg-light-gray
            "
            @click="toggleModal"
          >
            View Receipt >
          </button>
          <router-link :to="`/payment-order/${payment.orderSetId}`">
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
              View Payment Portal >
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageModal from './Modals/ImageModal.vue';
import { ref } from 'vue';
import axios from 'axios';
export default {
  name: 'PaymentDetailsCard',
  components: {
    ImageModal,
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
        
        // get filename and file type
        const fileType = props.payment.filePath.substring(props.payment.filePath.lastIndexOf('.'));
        const filename = props.payment.filename.substring(props.payment.filename.indexOf('/') + 1) + fileType;

        link.setAttribute('download', filename);
        document.body.appendChild(link);

        link.click();
      });
    }
    return { showModal, toggleModal, downloadImg };
  },
};
</script>

<style lang="postcss" scoped>
.payment-status {
  @apply flex items-center mx-10 h-full;
}

.payment-card {
  transition: 1500ms;
}

.payment-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}
</style>