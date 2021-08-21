<template>
  <!-- start sticker form -->
  <form
    @submit.prevent="addToCart"
    class="mt-12"
    id="sticker-form"
    enctype="multi-part/form-data"
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
          >Width (in inches)</label
        >
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
    <div class="flex justify-start">
      <div class="relative mt-20">
        <select
          name="diecut"
          id="diecut"
          class="dropdown-field w-32"
          v-model="state.diecut"
          @change="onSelectDiecut"
        >
          <option value="placeholder" disabled selected hidden>Select one</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label
          for="file"
          class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
          >With die-cut?</label
        >
        <p
          v-if="state.diecutValidation != null && !state.diecutValidation"
          class="text-red manrope-bold text-left text-sm"
        >
          Please select Yes or No.
        </p>
      </div>

      <div class="relative mt-20 ml-8">
        <input
          id="order-image"
          name="order-image"
          ref="file"
          type="file"
          class="manrope-regular w-72"
          min="0"
          @change="onSelectFile"
        />
        <label
          for="order-image"
          class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
          >File Upload</label
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
    </div>

    <div class="relative mt-20">
      <textarea
        id="other-details"
        name="other-details"
        type="text"
        class="manrope-regular input-text-field w-1/4"
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
  <!-- end sticker form -->
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import {
  required,
  numeric,
} from '@vuelidate/validators';
import * as api from '../../api';

export default {
  name: 'StickerForm',
  setup() {
    const file = ref(null);
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      quantity: 1,
      width: '',
      height: '',
      type: 'Sticker',
      diecut: 'placeholder',
      imageFile: null,
      remarks: '',
      fileValidation: null,
      fileTypeValidation: null,
      diecutValidation: null,
    });

    const rules = {
      quantity: {required, numeric},
      width: {required, numeric},
      height: {required, numeric},
    };

    const v = useVuelidate(rules,state);

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

    function onSelectDiecut() {
      state.diecutValidation = state.diecut === 'placeholder' ? false : true;
    }

    async function addToCart() {
      const validated = await v.value.$validate();

      state.fileValidation = file.value.files.length == 0 ? false : true;

      if (state.diecutValidation == null) {
        state.diecutValidation = false;
      }

      if(validated && state.fileValidation && state.fileTypeValidation && state.diecutValidation){
        // create FormData to store order data
        const formData = new FormData();
        formData.append('quantity', state.quantity);
        formData.append('width', state.width);
        formData.append('height', state.height);
        formData.append('type', state.type);
        formData.append('diecut', state.diecut);
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

    return { file, state, onSelectFile, onSelectDiecut, addToCart, v };
  },
};
</script>

<style></style>
