<template>
  <div class="h-full relative w-5/6 float-right" id="right">
    <div class="h-24 bg-primary-blue">
      <p class="absolute manrope-extrabold text-5xl text-white ml-4 mt-8">
        {{ title }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Header Title',
    },
  },
};
</script>

<style></style>
