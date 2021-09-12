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
            <div class="manrope-bold text-primary-blue text-xl my-auto">{{user.username}}</div>
          </div>
        </div>
        <div class="flex items-center">
            <router-link :to="`/profile/${user.username}`">
            <button
              class="
                text-primary-blue
                mr-4
                ml-2
                manrope-bold
                rounded-md
                pt-0.5
                pl-2
                pr-2
                focus:outline-none
                bg-gray-500
                transition duration-100 ease-in-out hover:bg-light-gray
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