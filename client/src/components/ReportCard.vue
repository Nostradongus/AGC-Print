<template>
  <div class="px-8 pt-3 pb-5">
    <div
      class="mx-auto mb-0.5 h-30 bg-light-blue rounded-xl p-3 report-card"
    >
      <!-- report details -->
      <div class="flex p-1">
        <div class="my-auto pr-3 w-1/5">
          <span class="text-md manrope-regular">Report #{{ report.id }}</span>
        </div>
        <div class="flex-1">
          <div class="space-y-1 ml-3 mt-1">
            <div class="manrope-extrabold">Order Set #: {{ report.orderSetId }}</div>
            <div class="text-sm manrope-regular">
              <span class="text-md manrope-bold">User:</span>
              {{ report.user }} ({{ report.userFullName }})
            </div>
            <div class="text-sm manrope-regular">
              <span class="text-sm manrope-bold"> Type of Issue:</span>
              {{ report.type }}
            </div>
            <div class="text-sm manrope-regular">
              <span class="text-sm manrope-bold">Date Reported:</span>
              {{ report.dateRequested }}
            </div>
          </div>
        </div>
        <div>
          <div class="report-status">
            <div class="text-md manrope-bold text-center">
              {{ report.status }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <router-link :to="`/order-details/${report.orderSetId}`">
            <button
              class="
                text-primary-blue
                manrope-bold
                rounded-md
                mr-4
                pt-0.5
                pl-2
                pr-2
                ml-2
                focus:outline-none
                bg-gray-500
                transition duration-100 ease-in-out hover:bg-light-gray
              "
            >
              View Report >
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportCard',
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
.report-status {
  @apply flex items-center mx-10 h-full;
}

.report-card {
  transition: 1500ms;
}

.report-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}
</style>