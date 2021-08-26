<template>
  <div>
    <label for="product" class="manrope-bold text-xl mr-4 mt-2 text-primary-blue">
      Wallpapers
    </label>
    <br />
    <p class="manrope-regular text-lg text-justify mt-2">
      Our wallpapers are perfect for all types of indoor use. 
      These wallpaper prints can last up to 200 years indoors without fading. 
      Our inks are odorless and contain no harmful chemicals which make them 
      perfect for food preparation areas and hospitals.
    </p>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import * as api from '../../api';

export default {
  name: 'WallpaperDetail',
};
</script>
