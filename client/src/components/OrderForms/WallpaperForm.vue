<template>
  <!-- start wallpaper form -->
  <form
    @submit.prevent="addToCart"
    class="mt-12"
    id="wallpaper-form"
    enctype="multi-part/form-data"
  >
    <div class="relative">
      <input
        id="quantity"
        name="quantity"
        type="number"
        class="manrope-regular input-text-field w-48"
        :class="{ 'border-red': v.quantity.$error }"
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
          step="0.01"
          class="manrope-regular input-text-field w-48"
          :class="{ 'border-red': v.width.$error }"
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
          step="0.01"
          class="manrope-regular input-text-field w-48"
          :class="{ 'border-red': v.height.$error }"
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
      <input
        id="order-image"
        ref="file"
        type="file"
        class="manrope-regular w-72"
        min="0"
        @change="onSelect"
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
        File must be in .jpg, .png, .svg, .psd, or .ai format.
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
      v-if="!state.submitted"
    >
      Next
    </button>
    
    <p
      v-else
      class="mt-8 mb-8 manrope-bold text-primary-blue text-lg text-left"
    >
      Adding to cart, please wait...
    </p>
  </form>
  <!-- end wallpaper form -->
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import {
  required,
  numeric,
  minValue,
  maxValue
} from '@vuelidate/validators';
import * as api from '../../api';

export default {
  name: 'WallpaperForm',
  setup() {
    const file = ref(null);
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      quantity: 1,
      width: '',
      height: '',
      type: 'Wallpaper',
      imageFile: null,
      remarks: '',
      fileValidation: null,
      submitted: false,
    });

    const rules = {
      quantity: {required, numeric, minValue: minValue(1), maxValue: maxValue(1000)},
      width: {required, numeric, minValue: minValue(6), maxValue: maxValue(120)},
      height: {required, numeric, minValue: minValue(6), maxValue: maxValue(120)},
    };

    const v = useVuelidate(rules,state);

    function onSelect() {
      state.fileValidation = file.value.files.length == 0 ? false : true;

      // check if there is uploaded file by user
      if (state.fileValidation) {
        state.orderFile = file.value.files[0];

        // valid file type extensions
        const extensions = ['png', 'jpg', 'jpeg', 'svg', 'ai', 'psd'];

        // get uploaded file's extension
        const fileExtension = state.orderFile.name.substring(state.orderFile.name.lastIndexOf('.') + 1);

        // check if uploaded file contains valid file type extension
        state.fileTypeValidation = extensions.includes(fileExtension);
      } else {
        state.fileTypeValidation = null;
      }
    }

    async function addToCart() {
      const validated = await v.value.$validate();

      state.fileValidation = file.value.files.length == 0 ? false : true;

      if(validated && state.fileValidation && state.fileTypeValidation){
        // indicate that order form has been submitted
        state.submitted = true;

        // create FormData to store order data
        const formData = new FormData();
        formData.append('quantity', state.quantity);
        formData.append('width', state.width);
        formData.append('height', state.height);
        formData.append('type', state.type);
        formData.append('remarks', state.remarks);
        formData.append('order-file', state.orderFile);
        formData.append('user', store.state.user.user.username); 

        // add order data to cart and get generated order id
        const res = await api.addToCart(formData);
        console.log(res);
        // store generated order id to vue local storage
        store.dispatch('setOrder', res.data);

        // go to delivery information page
        router.push({ name: 'ViewCart' });        
      }
    }

    return { file, state, onSelect, addToCart, v };
  },
};
</script>

<style></style>
