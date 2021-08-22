<template>
  <!-- start canvas print form -->
  <form
    @submit.prevent="addToCart"
    class="mt-12"
    id="canvas-print-form"
    enctype="multipart/form-data"
  >
    <div class="relative">
      <input
        id="quantity"
        name="quantity"
        type="number"
        class="manrope-regular input-text-field w-48"
        :class="{ 'border-red': v.quantity.$error }"
        min="1"
        v-model="state.quantity"
      />
      <label
        for="quantity"
        class="absolute manrope-regular left-0 -top-3.5 text-gray-600 text-md"
        >Quantity</label
      >
      <p
        v-if="v.quantity.$error"
        class="text-red manrope-bold text-left text-sm"
      >
        {{ v.quantity.$errors[0].$message }}
      </p>
    </div>
    <div class="flex">
      <div class="relative mt-12">
        <input
          id="width"
          name="width"
          type="number"
          class="manrope-regular input-text-field w-48"
          :class="{ 'border-red': v.width.$error }"
          min="1"
          v-model="state.width"
        />
        <label
          for="width"
          class="absolute manrope-regular left-0 -top-3.5 text-gray-600 text-md"
          >Width (in inches)
        </label>
        <p
          v-if="v.width.$error"
          class="text-red manrope-bold text-left text-sm"
        >
          {{ v.width.$errors[0].$message }}
        </p>
      </div>
      <div class="relative mt-12 ml-4">
        <input
          id="height"
          name="height"
          type="number"
          class="manrope-regular input-text-field w-48"
          :class="{ 'border-red': v.height.$error }"
          min="1"
          v-model="state.height"
        />
        <label
          for="height"
          class="absolute manrope-regular left-0 -top-3.5 text-gray-600 text-md"
          >Height (in inches)</label
        >
        <p
          v-if="v.height.$error"
          class="text-red manrope-bold text-left text-sm"
        >
          {{ v.height.$errors[0].$message }}
        </p>
      </div>
    </div>
    <div class="relative mt-20">
      <select
        name="frame"
        id="frame"
        class="dropdown-field w-72"
        v-model="state.frameOption"
        @change="onSelectFrameOption"
      >
        <option value="placeholder" disabled selected hidden>Select one</option>
        <option value="3/4 Inches">3/4 Inches</option>
        <option value="1.5 Inches">1.5 Inches</option>
        <option value="Shadow Box">Shadow Box</option>
        <option value="Glassless Frame">Glassless Frame</option>
        <option value="Floating Frame">Floating Frame</option>
        <option value="Print Only">Print Only</option>
      </select>
      <label
        for="frame"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Frame</label
      >
      <p
        v-if="
          state.frameOptionValidation != null && !state.frameOptionValidation
        "
        class="text-red manrope-bold text-left text-sm"
      >
        Please select a frame option.
      </p>
    </div>
    <div
      class="relative mt-20"
      v-if="
        state.frameOption !== '3/4 Inches' &&
        state.frameOption !== '1.5 Inches' &&
        state.frameOption !== 'placeholder' &&
        state.frameOption !== 'Print Only'
      "
    >
      <select
        name="framefinishing"
        id="framefinishing"
        class="dropdown-field w-72"
        v-model="state.frameFinishing"
        @change="onSelectFrameFinishing"
      >
        <option value="placeholder" disabled selected hidden>Select one</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
        <option value="Matte">Matte</option>
        <option value="Glossy">Glossy</option>
      </select>
      <label
        for="frame"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Frame Finishing</label
      >
      <p
        v-if="
          state.frameFinishingValidation != null &&
          !state.frameFinishingValidation
        "
        class="text-red manrope-bold text-left text-sm"
      >
        Please select a frame finishing.
      </p>
    </div>
    <div
      class="relative mt-20"
      v-if="
        state.frameOption === '3/4 Inches' || state.frameOption === '1.5 Inches'
      "
    >
      <select
        name="frameedges"
        id="frameedges"
        class="dropdown-field w-48"
        v-model="state.frameEdges"
        @change="onSelectFrameEdges"
      >
        <option value="placeholder" disabled selected hidden>Select one</option>
        <option value="White Edges">White Edges</option>
        <option value="Black Edges">Printed Edges</option>
      </select>
      <label
        for="frameedges"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Stretcher Frame Edges</label
      >
      <p
        v-if="state.frameEdgesValidation != null && !state.frameEdgesValidation"
        class="text-red manrope-bold text-left text-sm"
      >
        Please select a frame edge.
      </p>
    </div>
    <div class="relative mt-20">
      <input
        id="order-file"
        name="order-file"
        type="file"
        ref="file"
        class="manrope-regular w-72"
        min="0"
        @change="onSelectFile"
      />
      <label
        for="order-file"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Upload Image</label
      >
      <p
        v-if="state.fileValidation != null && !state.fileValidation"
        class="text-red manrope-bold text-left text-sm"
      >
        No File Uploaded Yet.
      </p>
      <p
        v-if="state.fileTypeValidation != null && !state.fileTypeValidation"
        class="text-red manrope-bold text-left text-sm"
      >
        File must be in .jpg, .png, .svg, .psd, .ai, or .pdf format.
      </p>
    </div>

    <div class="relative mt-20">
      <textarea
        id="other-details"
        name="other-details"
        type="text"
        class="manrope-regular input-text-field w-full"
        min="0"
        v-model="state.remarks"
      ></textarea>
      <label
        for="other-details"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Other Details</label
      >
    </div>

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
        mb-8
        mt-8
        rounded-xl
        bg-primary-blue
        p-2
      "
    >
      Next
    </button>
  </form>
  <!-- end canvas print form -->
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';
import * as api from '../../api';

export default {
  name: 'CanvasPrintForm',
  setup() {
    const file = ref(null);
    const router = useRouter();
    const store = useStore();
    let state = reactive({
      quantity: 1,
      width: '',
      height: '',
      type: 'Canvas Print',
      frameOption: 'placeholder',
      frameFinishing: 'placeholder',
      frameEdges: 'placeholder',
      remarks: '',
      fileValidation: null,
      fileTypeValidation: null,
      frameValidation: null,
      frameOptionValidation: null,
      frameFinishingValidation: null,
      frameEdgesValidation: null,
    });

    const rules = {
      quantity: { required, numeric },
      width: { required, numeric },
      height: { required, numeric },
      type: { required },
    };

    const v = useVuelidate(rules, state);

    function onSelectFile() {
      state.fileValidation = file.value.files.length == 0 ? false : true;

      // check if there is uploaded file by user
      if (state.fileValidation) {
        state.orderFile = file.value.files[0];

        // valid file type extensions
        const extensions = ['png', 'jpg', 'jpeg', 'svg', 'ai', 'psd', 'pdf'];

        // get uploaded file's extension
        const fileExtension = state.orderFile.name.substring(state.orderFile.name.indexOf('.') + 1);

        // check if uploaded file contains valid file type extension
        state.fileTypeValidation = extensions.includes(fileExtension);
      } else {
        state.fileTypeValidation = null;
      }
    }

    function onSelectFrameOption() {
      state.frameOptionValidation =
        state.frameOption !== 'placeholder' ? true : false;
      if (
        state.frameOption === '3/4 Inches' ||
        state.frameOption === '1.5 Inches'
      ) {
        state.frameFinishing = 'placeholder';
        state.frameFinishingValidation = null;
      }
      if (
        state.frameOption === 'Shadow Box' ||
        state.frameOption === 'Glassless Frame' ||
        state.frameOption === 'Floating Frame'
      ) {
        state.frameEdges = 'placeholder';
        state.frameEdgesValidation = null;
      }
    }

    function onSelectFrameFinishing() {
      state.frameFinishingValidation =
        state.frameFinishing !== 'placeholder' ? true : false;
    }

    function onSelectFrameEdges() {
      state.frameEdgesValidation =
        state.frameEdges !== 'placeholder' ? true : false;
    }

    async function addToCart() {
      const validated = await v.value.$validate();

      state.fileValidation = file.value.files.length == 0 ? false : true;

      if (
        state.frameOption === '3/4 Inches' ||
        state.frameOption === '1.5 Inches'
      ) {
        state.frameValidation =
          state.frameEdges !== 'placeholder' ? true : false;
        if (!state.frameValidation) {
          state.frameEdgesValidation = false;
        }
      } else if (
        state.frameOption === 'Shadow Box' ||
        state.frameOption === 'Glassless Frame' ||
        state.frameOption === 'Floating Frame'
      ) {
        state.frameValidation =
          state.frameFinishing !== 'placeholder' ? true : false;
        if (!state.frameValidation) {
          state.frameFinishingValidation = false;
        }
      } else {
        if (state.frameOption !== 'Print Only') {
          state.frameOptionValidation = false;
        }
        state.frameValidation = state.frameOptionValidation;
      }

      if(validated && state.fileValidation && state.fileTypeValidation && state.frameValidation){
        // create FormData to store order data with uploaded file
        const formData = new FormData();
        formData.append('quantity', state.quantity);
        formData.append('width', state.width);
        formData.append('height', state.height);
        formData.append('type', state.type);
        formData.append('frameOption', state.frameOption);
        formData.append('frameFinishing', state.frameFinishing);
        formData.append('frameEdges', state.frameEdges);
        formData.append('remarks', state.remarks);
        formData.append('order-file', state.orderFile);
        formData.append('user', store.state.user.user.username);

        // add order data to cart and get generated order id
        const res = await api.addToCart(formData);

        // store generated order id to vue local storage
        store.dispatch('setOrder', res.data);

        // go to delivery information page
        router.push({ name: 'ViewCart' });
      }
    }

    return {
      file,
      state,
      onSelectFile,
      onSelectFrameOption,
      onSelectFrameFinishing,
      onSelectFrameEdges,
      addToCart,
      v,
    };
  },
};
</script>

<style></style>
