<template>
  <div>
    <label for="product" class="manrope-regular text-xl mr-4 mt-2">
      Wallpapers
    </label>
    <br />
    <p>
      AGC Print wallpapers are printed using high quality... to be continued
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
