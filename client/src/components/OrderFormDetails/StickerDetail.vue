<template>
  <div>
    <label for="product" class="manrope-bold text-xl mr-4 mt-2 text-primary-blue">
      Stickers
    </label>
    <br />
    <p class="manrope-regular text-lg text-justify mt-2">
      We print high-quality vinyl stickers for all types of use. Our stickers 
      are printed using Latex Technology. This makes our labels 100% waterproof,
      odorless, and scratch-resistant! Our ink uses no harmful chemicals, making 
      it perfect for sensitive environments such as food preparation areas and hospitals.
    </p>
    <p class="manrope-regular text-lg text-justify mt-3">
      Our services include precision die cutting to ensure all the stickers are cut to the 
      exact shape and size.
    </p>
    <p class="manrope-bold text-lg text-justify mt-5 mb-5">
      Sample Photos: 
    </p>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import * as api from '../../api';

export default {
  name: 'StickerDetail',
};
</script>
<style>
.order-img {
  width: 75%;
  height: 75%;
}
</style>
