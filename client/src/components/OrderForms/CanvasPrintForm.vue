<template>
  <!-- start canvas print form -->
  <form class="mt-12" id="canvas-print-form">
    <div class="relative">
      <input
        id="quantity"
        name="quantity"
        type="number"
        class="manrope-regular input-text-field w-48"
        min="1"
      />
      <label
        for="quantity"
        class="absolute manrope-regular left-0 -top-3.5 text-gray-600 text-md"
        >Quantity</label
      >
    </div>
    <div class="flex">
      <div class="relative mt-12">
        <input
          id="width"
          name="width"
          type="number"
          class="manrope-regular input-text-field w-48"
          min="1"
        />
        <label
          for="width"
          class="absolute manrope-regular left-0 -top-3.5 text-gray-600 text-md"
          >Width (in inches)</label
        >
      </div>
      <div class="relative mt-12 ml-4">
        <input
          id="height"
          name="height"
          type="number"
          class="manrope-regular input-text-field w-48"
          min="1"
        />
        <label
          for="height"
          class="absolute manrope-regular left-0 -top-3.5 text-gray-600 text-md"
          >Height (in inches)</label
        >
      </div>
    </div>
    <div class="relative mt-20">
      <select name="frame" id="frame" class="dropdown-field w-72">
        <option value="placeholder" disabled selected hidden>Select one</option>
        <option value="3/4inches">3/4 inches</option>
        <option value="1.5inches">1.5 inches</option>
        <option value="shadowbox">Shadow Box</option>
        <option value="glassless">Glassless Frame</option>
        <option value="floating">Floating Frame</option>
        <option value="print">Print only</option>
      </select>
      <label
        for="frame"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Frame</label
      >
    </div>
    <div class="relative mt-20 hidden">
      <select
        name="framefinishing"
        id="framefinishing"
        class="dropdown-field w-72"
      >
        <option value="placeholder" disabled selected hidden>Select one</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="matte">Matte</option>
        <option value="glossy">Glossy</option>
      </select>
      <label
        for="frame"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Frame Finishing</label
      >
    </div>
    <div class="relative mt-20 hidden">
      <select name="frameedges" id="frameedges" class="dropdown-field w-48">
        <option value="placeholder" disabled selected hidden>Select one</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <label
        for="frameedges"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >Stretcher Frame Edges?</label
      >
    </div>
    <div class="relative mt-20">
      <input
        id="file"
        name="file"
        type="file"
        class="manrope-regular w-72"
        min="0"
      />
      <label
        for="file"
        class="absolute manrope-regular left-0 -top-8 text-gray-600 text-md"
        >File Upload</label
      >
    </div>
    <button
      class="
        manrope-regular
        text-white
        inline-block
        transition
        duration-300
        ease-in-out
        text-center text-lg
        hover:bg-link-water hover:text-primary-blue
        w-32
        mb-8
        mt-8
        rounded-xl
        bg-primary-blue
      "
    >
      Next
    </button>
  </form>
  <!-- end canvas print form -->
</template>

<script>
export default {
  name: 'CanvasPrintForm',
};
</script>

<style></style>
