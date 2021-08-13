<template>
  <div>
    <side-bar />
    <page-header title="New Order">
      <div class="flex flew-nowrap">
        <div class="container p-8 shadow-lg rounded-xl m-8 mr-2">
          <label for="product" class="manrope-regular text-xl mr-4 mt-2"
            >Choose a product:</label
          >
          <select
            name="product"
            id="product"
            v-model="state.selected"
            class="dropdown-field"
          >
            <option value="tarpaulin">Tarpaulin</option>
            <option value="wallpaper">Wallpaper</option>
            <option value="canvasprint">Canvas Print</option>
            <option value="sticker">Sticker</option>
          </select>
          <tarpaulin-form v-if="state.selected === 'tarpaulin'" />
          <wallpaper-form v-if="state.selected === 'wallpaper'" />
          <canvas-print-form v-if="state.selected === 'canvasprint'" />
          <sticker-form v-if="state.selected === 'sticker'" />
        </div>

        <div class="col-auto container p-8 shadow-lg rounded-xl ml-2 m-8">
          <TarpaulinDetail v-if="state.selected === 'tarpaulin'" />
          <WallpaperDetail v-if="state.selected === 'wallpaper'" />
          <CanvasDetail v-if="state.selected === 'canvasprint'" />
          <StickerDetail v-if="state.selected === 'sticker'" />
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import { reactive } from 'vue';
import TarpaulinForm from '../components/OrderForms/TarpaulinForm.vue';
import WallpaperForm from '../components/OrderForms/WallpaperForm.vue';
import CanvasPrintForm from '../components/OrderForms/CanvasPrintForm.vue';
import StickerForm from '../components/OrderForms/StickerForm.vue';
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';

import TarpaulinDetail from '../components/OrderFormDetails/TarpaulinDetail.vue';
import StickerDetail from '../components/OrderFormDetails/StickerDetail.vue';
import WallpaperDetail from '../components/OrderFormDetails/WallpaperDetail.vue';
import CanvasDetail from '../components/OrderFormDetails/CanvasDetail.vue';

export default {
  components: {
    TarpaulinForm,
    WallpaperForm,
    CanvasPrintForm,
    StickerForm,
    SideBar,
    PageHeader,
    TarpaulinDetail,
    StickerDetail,
    WallpaperDetail,
    CanvasDetail,
  },
  name: 'Order',
  setup() {
    const state = reactive({
      selected: 'tarpaulin',
    });
    return { state };
  },
};
</script>

<style>
.header {
  width: 100vw;
  height: 11rem;
}

.sidebar-btn {
  width: 80%;
  height: 5rem;
  border-radius: 20px;
}

.content-box {
  display: flex;
  flex-flow: row wrap;
}

.dropdown-field {
  border: 0px;
  outline: 0px;
  width: 28rem;
  height: 3rem;
}

.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  height: 3rem;
}

.manrope-regular {
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
}

.manrope-bold {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
}

.manrope-extrabold {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
}
</style>
