<template>
  <div>
    <side-bar />
    <page-header title="Report Order">
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
        v-if="state.order"
      >
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Order Number:</h3>
            <p>{{ state.order.id }}</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Total Project Cost:</h3>
            <p v-if="state.order.price === -1">Pending Price</p>
            <p v-else>{{ state.order.price }}</p>
          </div>
        </div>
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Status:</h3>
            <p>{{ state.order.status }}</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Delivery Address:</h3>
            <p>{{ state.order.address }}</p>
          </div>
        </div>
      </div>
      <!-- Report Form -->
      <form
        @submit.prevent="reportOrder"
        class="flex flex-col m-8"
        enctype="multipart/form-data"
      >
        <div class="flex flex-row items-center mb-8">
          <h3 class="w-1/3 text-center manrope-bold">What is the issue?</h3>
          <div class="w-full lg:w-1/2">
            <select class="w-full dropdown-field" v-model="state.issue">
              <option value="placeholder" disabled selected hidden>
                Select one
              </option>
              <option value="Damage Product">Damage Product</option>
              <option value="Print Quality">Bad Print Quality</option>
              <option value="Wrong Item">Wrong Item / Product</option>
              <option value="Scratches">Scratches on the Print</option>
              <option value="Wrong Size">Wrong Size</option>
              <option value="Color Output">
                Color output is far from the final output
              </option>
              <option value="Billing">Billing concerns</option>
              <option value="Others">Others</option>
            </select>
            <p
              v-if="state.issueValidation != null && !state.issueValidation"
              class="text-red manrope-bold text-left text-sm"
            >
              Please select an issue.
            </p>
          </div>
        </div>
        <div class="flex flex-row mb-8">
          <h3 class="w-1/3 text-center manrope-bold">Detailed Description</h3>
          <div class="w-full lg:w-1/2">
            <textarea
              class="w-full manrope-regular input-text-field h-64"
              placeholder="Tell us about your report"
              v-model="state.remarks"
            />
            <p
              v-if="v.remarks.$error"
              class="text-red manrope-bold text-left text-sm"
            >
              Please Explain Your Issue Regarding Product.
            </p>
          </div>
        </div>
        <div class="flex flex-row mb-8 items-center">
          <h3 class="w-1/3 text-center manrope-bold">Upload Image/s</h3>
          <div class="w-full lg:w-1/2">
            <input
              name="report-image"
              ref="file"
              type="file"
              @change="onSelectFile"
            />
            <p
              v-if="state.fileValidation != null && !state.fileValidation"
              class="text-red manrope-bold text-left text-sm"
            >
              No File Uploaded Yet.
            </p>
          </div>
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
              mb-8
              mt-8
              rounded-xl
              bg-primary-blue
              p-3
            "
          >
            Submit Report
          </button>
        </div>
      </form>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { reactive, onMounted, ref } from 'vue';
import * as api from '../api';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  name: 'ReportOrder',
  components: { SideBar, PageHeader },
  setup() {
    const file = ref(null);
    const route = useRoute();
    const state = reactive({
      order: null,
      issue: 'placeholder',
      remarks: '',
      issueValidation: null,
      fileValidation: null,
    });

    const rules = {
      remarks: { required },
    };

    const v = useVuelidate(rules, state);

    onMounted(() => {
      getOrderDetails();
    });

    function onSelectFile() {
      state.imageFile = file.value.files[0];
    }

    async function getOrderDetails() {
      try {
        const res = await api.getOrderSet(route.params.id);
        state.order = res.data;
      } catch (err) {
        console.log(err);
      }
    }

    async function reportOrder() {
      try {
        state.fileValidation = file.value.files.length === 0 ? false : true;
        state.issueValidation = state.issue === 'placeholder' ? false : true;
        const validated = await v.value.$validate();

        if (validated && state.fileValidation && state.issueValidation) {
          //TODO: API CALL FOR Report Order
          const formData = new FormData();
        }
      } catch (err) {
        console.log(err);
      }
    }
    return { file, state, onSelectFile, v, reportOrder };
  },
};
</script>
