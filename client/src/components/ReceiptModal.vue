<template>
  <transition name="modal-animation">
    <div v-show="showModal" class="modal flex justify-center items-center">
      <transition name="modal-animation-inner">
        <div
          v-show="showModal"
          class="modal-inner flex flex-col justify-center items-center"
        >
          <i @click="close" class="far fa-times-circle"></i>
          <i class="far fa-images fa-3x"></i>

          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['showModal'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };

    return { close };
  },
};
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
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
    color: #c52e14;

    &:hover {
      color: #0f4c81;
    }
  }

  .fa-images {
    position: absolute;
    top: 20px;
    color: #0f4c81;
  }
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
