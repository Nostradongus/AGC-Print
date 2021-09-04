<template>
  <transition name="modal-animation">
    <div v-show="previewOrders" class="modal flex justify-center items-center">
      <transition name="modal-animation-inner">
        <div
          v-show="previewOrders"
          class="modal-inner flex flex-col"
        >
          <!-- modal header -->
          <h1
            class="
              manrope-extrabold 
              absolute
              top-2
              left-2
              px-2 
              text-primary-blue 
              text-left 
              text-lg
            "
          >
            Orders:
          </h1>
          <i @click="close" class="far fa-times-circle"></i>

          <!-- horizontal divider -->
          <hr 
            class="
              border-primary-blue 
              bg-primary-blue 
              manrope-bold 
              border-solid 
              border-2
              mb-0.5
              absolute
              top-10 
              right-0 
              w-full 
              justify-center
            "
          >

          <!-- order list contents -->
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['previewOrders'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };

    return { close };
  },
}
</script>

<style lang="scss" scoped>
.modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(113, 113, 122, 0.75);
  transition-property: opacity;
}

.modal-inner {
  position: relative;
  max-width: 640px;
  width: 40%;
  height: 75%;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 16px 16px;

  .fa-times-circle {
    position: absolute;
    top: 12px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
    color: #c52e14;

    &:hover {
      color: #0f4c81;
    }
  }
}
</style>