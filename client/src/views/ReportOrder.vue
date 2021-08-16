<template>
  <div>
    <side-bar />
    <page-header title="Report Order">
      <!-- Order Details -->
      <div
        class="
          bg-light-blue
          text-lg
          manrope-regular
          rounded-xl
          p-6
          m-8
          h-30
          grid grid-cols-2
        "
      >
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Order Number:</h3>
            <p>Test 12345</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Total Project Cost:</h3>
            <p>12345</p>
          </div>
        </div>
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Status:</h3>
            <p>Test Complete</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Delivery Address:</h3>
            <p>Test 12345</p>
          </div>
        </div>
      </div>
      <!-- Report Form -->
      <form class="flex flex-col m-8" enctype="multipart/form-data">
        <div class="flex flex-row mb-8 items-center">
          <h3 class="w-1/3 text-center manrope-bold">What is the issue?</h3>
          <select class="w-full lg:w-1/2 dropdown-field">
            <option value="placeholder" disabled selected hidden>
              Select one
            </option>
            <option value="Damage Product">Damage Product</option>
            <option value="Print Quality">Bad Print Quality</option>
            <option value="Wrong Item">Wrong Item / Product</option>
            <option value="Scratches">Scratches on the Print</option>
            <option value="Wrong Size">Wrong Size</option>
            <option value="Color Output">
              Color output is far from the final output
            </option>
            <option value="Billing">Billing concerns</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div class="flex flex-row mb-8">
          <h3 class="w-1/3 text-center manrope-bold">Detailed Description</h3>
          <textarea
            class="w-full lg:w-1/2 manrope-regular input-text-field h-64"
            placeholder="Tell us about your report"
          />
        </div>
        <div class="flex flex-row mb-8 items-center">
          <h3 class="w-1/3 text-center manrope-bold">Upload Image/s</h3>
          <input class="w-full lg:w-1/2" type="file" />
        </div>
        <div class="flex justify-end lg:mr-48">
          <button
            class="
              manrope-regular
              text-white
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-link-water hover:text-primary-blue
              mb-8
              mt-8
              rounded-xl
              bg-primary-blue
              p-3
            "
          >
            Submit Report
          </button>
        </div>
      </form>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
export default {
  name: 'ReportOrder',
  components: { SideBar, PageHeader },
};
</script>
