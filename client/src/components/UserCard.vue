<template>
    <div class="px-8 pt-3 pb-1">
    <div 
      class="mx-auto mb-0.5 h-30 bg-light-blue rounded-xl p-3"
    >
      <div class="flex p-1 z-0">
        <div class="my-auto pr-3 w-1/5">
          <img src="../assets/logo.png" class="h-24 w-24" alt="" />
        </div>
        <div class="flex-1">
          <div class="my-auto ml-3 mt-5">
            <div class="manrope-extrabold text-2xl my-auto">{{user.firstname}} {{user.lastname}}</div>
            <div class="manrope-regular text-light-gray text-xl my-auto">{{user.username}}</div>
          </div>
        </div>
        <div>
            <router-link :to="`/profile/${user.username}`">
            <button
              class="
                text-primary-blue
                manrope-regular
                rounded-sm
                my-10
                mr-4
                pt-0.5
                ml-2
                focus:outline-none
                bg-gray-500
              "
            >
              View User Information >
            </button>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UserCard',
    props: {
        user: {
            type: Object,
        },
    },
}
</script>

<style>

</style>