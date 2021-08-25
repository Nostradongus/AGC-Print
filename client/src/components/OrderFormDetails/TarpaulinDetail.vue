<template>
  <div>
    <label for="product" class="manrope-bold text-xl mr-4 mt-2 text-primary-blue">
      Tarpaulins
    </label>
    <br />
    <p class="manrope-regular text-lg text-justify mt-2">
      Our tarpaulins are perfect for all types of indoor and outdoor use. 
      These prints are made to sustain numerous environmental factors which 
      make them perfect for outdoor use. Our HP Latex inks are odorless and 
      contain no harmful chemicals which make them perfect for food preparation 
      areas and hospitals.
    </p>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import * as api from '../../api';

export default {
  name: 'TarpaulinDetail',
};
</script>
