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
        v-if="state.worker != null && state.isSystemAdmin == true"
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
        to="/view-staff-list"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 pr-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg
        >Manage Staff</router-link
      >
      <router-link
        v-if="state.username != null"
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
        v-if="state.worker != null"
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
        to="/view-user-list"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-10 w-10 pr-3" 
          viewBox="0 0 20 20" 
          fill="currentColor">
          <path 
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
        View Users</router-link
      >
      <router-link
        v-if="state.worker != null"
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
        to="/view-order-list"
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
        View Orders</router-link
      >
      <router-link
        v-if="state.username != null"
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
        v-if="state.worker != null"
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
        to="/view-report-list"
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
        >View Reports</router-link
      >
      <router-link
        v-if="state.worker != null"
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
        to="/view-payment-list"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 pr-2 pt-1.5 pl-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path 
            fill-rule="evenodd"
            d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
            clip-rule="evenodd"
          />
          <path 
            fill-rule="evenodd"
            d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
            clip-rule="evenodd"
          /></svg
        >View Payments</router-link
      >
      <router-link
        v-if="state.worker != null"
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
        to="/view-delivery-list"
      >
        <svg xmlns="http://www.w3.org/2000/svg" 
        class="h-10 w-10 pr-3" 
        viewBox="0 0 20 20" 
        fill="currentColor">
        <path fill-rule="evenodd" 
        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
        clip-rule="evenodd" />
        </svg
        >View Schedules</router-link
      >
      <router-link
        v-if="state.username != null"
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
        :to="`/profile/${state.username}`"
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
        v-if="state.username != null"
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
        v-if="!state.loggingOut"
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
      <p
        v-else
        class="mt-2 px-4 py-4 manrope-bold text-primary-blue text-xl text-left"
      >
        Logging out...
      </p>
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
      username: null,
      worker: null,
      error: false,
      loggingOut: false,
      isSystemAdmin: false,
    });

    if (JSON.parse(localStorage.getItem('user')) != null) {
      state.username = store.state.user.user.username
    } else {
      if (store.state.worker.worker.isSystemAdmin == false){
        state.worker = store.state.worker.worker.username
        state.isSystemAdmin = false
      } else {
        state.worker = store.state.worker.worker.username
        state.isSystemAdmin = true
      }
      
    }

    async function logoutUser() {
      state.loggingOut = true;
      try {
        await api.signOut();
        store.dispatch('logoutUser');
        store.dispatch('logoutWorker');
        store.dispatch('resetOrder');
        router.push({ name: 'Login' });
      } catch (err) {
        state.error = true;
      }
      state.loggingOut = false;
    }

    return { state, logoutUser };
  },
};
</script>

<style></style>
