<template>
  <nav
    class="
      flex flex-col
      px-4
      pb-4
      sm:w-1/3
      md:block md:pb-0 md:overflow-y-auto md:w-1/4
      lg:w-1/6
      xl:w-1/6
      h-screen
      bg-light-blue
      fixed
    "
  >
    <div style="height: 20%">
      <img class="h-36 w-36 m-auto mt-4" src="../assets/logo.png" alt="logo" />
    </div>
    <div style="height: 65%">
      <router-link
        class="
          text-primary-blue
          flex flex-row
          justify-items-center
          items-center
          px-4
          py-2
          mt-2
          text-xl
          font-semibold
          text-gray-900
          rounded-lg
          hover:bg-link-water
          transition
          duration-500
          ease-in-out
        "
        to="/order"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 pr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clip-rule="evenodd"
          />
        </svg>
        New Order</router-link
      >
      <router-link
        class="
          text-primary-blue
          flex flex-row
          justify-items-center
          items-center
          px-4
          py-2
          mt-2
          text-xl
          font-semibold
          text-gray-900
          rounded-lg
          hover:bg-link-water
          transition
          duration-500
          ease-in-out
        "
        to="/my-orders"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 pr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          /></svg
        >My Orders</router-link
      >
      <router-link
        class="
          text-primary-blue
          flex flex-row
          justify-items-center
          items-center
          px-4
          py-2
          mt-2
          text-xl
          font-semibold
          text-gray-900
          rounded-lg
          hover:bg-link-water
          transition
          duration-500
          ease-in-out
        "
        to=""
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 pr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          /></svg
        >Profile</router-link
      >
      <router-link
        class="
          text-primary-blue
          flex flex-row
          justify-items-center
          items-center
          px-4
          py-2
          mt-2
          text-xl
          font-semibold
          text-gray-900
          rounded-lg
          hover:bg-link-water
          transition
          duration-500
          ease-in-out
        "
        to="/view-cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 pr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          />
        </svg>
        Cart
      </router-link>
    </div>
    <div style="height: 5%">
      <button
        class="
          text-primary-blue
          flex flex-row
          justify-items-center
          items-center
          w-full
          px-4
          py-2
          mt-2
          text-xl
          font-semibold
          text-gray-900
          rounded-lg
          hover:bg-link-water
          transition
          duration-500
          ease-in-out
        "
        @click="logoutUser"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 pr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clip-rule="evenodd"
          /></svg
        >Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { reactive } from 'vue';
import * as api from '../api';
export default {
  name: 'SideBar',
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      error: false,
    });

    async function logoutUser() {
      try {
        await api.signOut();
        store.dispatch('logoutUser');
        store.dispatch('resetOrder');
        router.push({ name: 'Login' });
      } catch (err) {
        state.error = true;
      }
    }

    return { state, logoutUser };
  },
};
</script>

<style></style>
