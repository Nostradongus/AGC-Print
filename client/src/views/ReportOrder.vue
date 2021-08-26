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
      <p class="text-red manrope-bold text-center text-sm">
         You may only submit a report once, multiple file uploads is allowed (Use CTRL or SHIFT key while choosing files). 
      </p>
      <form 
        @submit.prevent="submitReport"
        class="flex flex-col m-8"
        enctype="multipart/form-data">
        <div class="flex flex-row mb-3 items-center">
          <h3 class="w-1/3 text-center manrope-bold">What is the issue?</h3>
          <select 
            name="type"
            id="type"
            class="w-full lg:w-1/2 dropdown-field"
            v-model="state.type"
            @change="onSelectType"
          >
            <option value="placeholder" disabled selected hidden>
              Select one
            </option>
            <option value="Damaged Product">Damaged Product</option>
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
        </div>
        <div class="flex flex-row mb-5 items-center">
          <div class="w-1/3" />
          <p
            v-if="state.typeValidation != null && !state.typeValidation && state.alreadyReported != true"
            class="text-red manrope-bold text-left text-sm"
          >
            Please select type of issue.
          </p>
        </div>
        <div class="flex flex-row mb-3">
          <h3 class="w-1/3 text-center manrope-bold">Detailed Description</h3>
          <textarea
            id="description"
            name="description"
            class="w-full lg:w-1/2 manrope-regular input-text-field h-64"
            placeholder="Tell us about your report"
            v-model="state.description"
            @change="onChange"
          />
        </div>
        <div class="flex flex-row mb-5 items-center">
          <div class="w-1/3" />
          <p
            v-if="v.description.$error && !state.descValidation && state.alreadyReported != true"
            class="text-red manrope-bold text-center text-sm"
          >
            Please explain the issue regarding the order.
          </p>
        </div>
        <div class="flex flex-row mb-3 items-center">
          <h3 class="w-1/3 text-center manrope-bold">Upload Image/s</h3>
          <div class="w-full lg:w-1/2">
            <input
              id="report-file"
              name="report-file"
              ref="file"
              type="file"
              @change="onSelectFile"
              multiple
            />
          </div>
        </div>
        <div class="flex flex-row mb-3 items-center">
          <div class="w-1/3" />
          <p
            v-if="state.fileValidation != null && !state.fileValidation && state.alreadyReported != true"
            class="text-red manrope-bold text-left text-sm"
          >
            No File Uploaded Yet.
          </p>
          <p
            v-if="state.fileTypeValidation != null && !state.fileTypeValidation && state.alreadyReported != true"
            class="text-red manrope-bold text-left text-sm"
          >
            File/s must be in .jpg, .png, or .pdf format.
          </p>
        </div>
        <div class="flex justify-end lg:mr-48"> 
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
                mb-2
                mt-8
                mx-32
                rounded-xl
                bg-primary-blue
                p-3
              "
              :to="`/order-details/${route.params.id}`"
              >Back</router-link
            >
          </div>
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
            "
          >
            Submit Report
          </button>
        </div>
        <div class="flex justify-end lg:mr-40">
          <p
            v-if="state.reportSubmitted"
            class="text-primary-blue manrope-bold text-center text-sm"
          >
            Report succesfully submitted!.
          </p>
          <p
            v-if="state.alreadyReported && !state.reportSubmitted"
            class="text-primary-blue manrope-bold text-center text-sm"
          >
            You have already submitted a report.
          </p>
        </div>
      </form>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { ref, reactive, onMounted } from 'vue';
import * as api from '../api';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  name: 'ReportOrder',
  components: { SideBar, PageHeader },
  setup() {
    let file = ref(null);
    const route = useRoute();
    let state = reactive({
      order: null,
      type: 'placeholder',
      description: '',
      fileValidation: null,
      fileTypeValidation: null,
      typeValidation: null,
      descValidation: null,
      reportFile: null,
      reportSubmitted: false,
      alreadyReported: false,
    });

    const rules = {
      type: { required },
      description: { required }
    };

    const v = useVuelidate(rules, state);

    function onSelectFile() {
      state.reportSubmitted = false;
      state.fileValidation = file.value.files.length == 0 ? false : true;
      if (state.fileValidation) {
        state.reportFile = file.value.files[0];
      }
    }

    function onChange() {
      state.reportSubmitted = false;
    }

    function onSelectType() {
      state.reportSubmitted = false;
      state.typeValidation = state.type !== 'placeholder' ? true : false;
    }

    onMounted(() => {
      getOrderDetails();
    });

    function onSelectFile() {
      state.reportSubmitted = false;
      state.fileValidation = file.value.files.length == 0 ? false : true;

      // check if there is/are uploaded file/s by user
      if (state.fileValidation) {
        // valid file type extensions
        const extensions = ['png', 'jpg', 'jpeg', 'pdf'];

        // temporary flag value
        state.fileTypeValidation = true;

        // validate file type of uploaded file/s
        for (let ctr = 0; ctr < file.value.files.length && state.fileTypeValidation; ctr++) {
          // get uploaded file's extension
          const fileExtension = file.value.files[ctr].name.substring(file.value.files[ctr].name.indexOf('.') + 1);

          // check if uploaded file contains valid file type extension
          state.fileTypeValidation = extensions.includes(fileExtension);
        }
      } else {
        state.fileTypeValidation = null;
      }
    }

    async function getOrderDetails() {
      try {
        const res = await api.getOrderSet(route.params.id);
        state.order = res.data;
      } catch (err) {
        console.log(err);
      }
    }

    async function submitReport(e) {
      e.preventDefault();

      state.reportSubmitted = false;
      
      // get field validation results
      const validated = await v.value.$validate();

      // check if report file has been uploaded by user
      state.fileValidation = file.value.files.length == 0 ? false : true;

      // check if report type has been specified by user or not
      state.typeValidation = state.type !== 'placeholder' ? true : false;

      // check if report description has been given by user
      state.descValidation = state.description !== '' ? true : false

      const isValid = validated && state.fileValidation && 
                      state.typeValidation && state.descValidation &&
                      state.fileTypeValidation && !state.alreadyReported;

      if (isValid) {
        // create FormData to store user report data with uploaded file
        const formData = new FormData();
        formData.append('orderSetId', route.params.id);
        formData.append('type', state.type);
        formData.append('description', state.description);
        for (let ctr = 0; ctr < file.value.files.length; ctr++) {
          formData.append('report-file', file.value.files[ctr]);
        }

        // add user report data to database
        const res = await api.addReport(formData);

        // if user report successfully submitted
        if (res.data != null && typeof res.data !== 'undefined') {
          // confirm that order set has been already reported
          await api.updateOrderSetReported(route.params.id, { status: true });

          // set indicator that user report was submitted successfully
          state.reportSubmitted = true;
          state.alreadyReported = true;

          // reset fields
          state.fileValidation = null;
          state.fileTypeValidation = null;
          state.typeValidation = null;
          state.type = 'placeholder';
          state.description = '';
          document.getElementById('report-file').value = ''; // remove recently uploaded file
        }
      }
    }
    
    return { 
             state, 
             file, 
             onSelectFile, 
             onSelectType, 
             onChange, 
             v, 
             submitReport,
             route
           };
  },
};
</script>
