<template>
  <transition name="modal-animation">
    <div v-show="showModal" class="modal flex justify-center items-center">
      <transition name="modal-animation-inner">
        <div
          v-show="showModal"
          class="modal-inner flex flex-col justify-center items-center"
        >
          <i @click="close" class="far fa-times-circle"></i>

          <button
            class="
              manrope-bold
              dowload-btn
              transition
              duration-300
              hover:bg-link-water hover:text-primary-blue
            "
          >
            Download Receipt
          </button>

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
  background-color: rgba(255, 255, 255, 0.7);
}

.modal-inner {
  position: relative;
  max-width: 640px;
  width: 30%;
  height: 70%;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 16px 16px;

  i {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: #0f4c81;
    }
  }
}

.dowload-btn {
  position: absolute;
  background-color: #0f4c81;
  color: white;
  border-radius: 20px;
  bottom: 15px;
  width: 50%;
  height: 3rem;
  vertical-align: middle;
}
</style>
