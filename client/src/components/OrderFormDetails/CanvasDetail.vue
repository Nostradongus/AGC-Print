<template>
  <div>
    <label for="product" class="manrope-bold text-xl mr-4 mt-2 text-primary-blue">
      Canvas Prints
    </label>
    <br />
    <p class="manrope-regular text-lg text-justify mt-2">
      The canvas prints are made from 100% pure cotton canvas that is waterproof 
      and durable. We use HP Latex Technology to ensure that we provide you with 
      the highest quality prints. 
    </p>
    <p class="manrope-regular text-lg text-justify mt-3">
      Our inks are water-based, eco-friendly ink that is odor-free, waterproof, and 
      scratch-resistant. The ink used does not contain any harmful chemicals which makes 
      it perfect for use in sensitive areas such as hospitals and restaurants. 
    </p>
    <p class="manrope-bold text-lg text-justify mt-5 mb-5">
      Sample Photos: 
    </p>
    <div class="flex flex-row">
      <img
        src="../../assets/canvas_image1.jpg"
        alt="Canvas Print Image 1"
        class="w-1/2 mr-3"
        border="0"
      />
      <img
        src="../../assets/canvas_image2.jpg"
        alt="Canvas Print Image 2"
        class="w-1/2"
        border="0"
      />
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import * as api from '../../api';

export default {
  name: 'CanvasDetail',
};
</script>
<style>
.order-img {
  width: 75%;
  height: 75%;
}
</style>
