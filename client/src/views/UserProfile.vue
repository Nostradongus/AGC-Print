<template>
  <div>
    <side-bar />
    <page-header title="Profile">

      <p 
        class="manrope-bold text-2xl text-center text-primary-blue mt-8" 
        v-if="state.empty"
      >
        Loading data, please wait...
      </p>

      <div v-if="!state.empty" class="p-8 flex">
        <div class="img-container">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="ml-6">
          <h1 class="manrope-bold text-5xl text-primary-blue" id="fullname">
            {{ state.name }}
          </h1>
          <br />
          <h1 class="manrope-regular text-3xl text-light-gray" id="role">
            Client
          </h1>
          <router-link
            v-if="state.worker == null"
            class="
              manrope-regular
              text-primary-blue text-xl
              inline-block
              transition
              duration-300
              ease-in-out
              text-center text-md
              hover:bg-primary-blue hover:text-white
              py-3
              px-12
              mt-20
              rounded-3xl
              bg-light-blue
            "
            :to="`/edit-profile/${state.username}`"
            >Edit Profile</router-link
          >
        </div>
      </div>
      <div v-if="!state.empty" class="px-8">
        <div id="accountinformation">
          <h1 class="manrope-bold text-2xl text-primary-blue">Account Information</h1>
          <hr class="profile-border" />
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Username</h1>
            <h1 class="manrope-regular text-xl" id="username">
              {{ state.username }}
            </h1>
          </div>
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">E-mail</h1>
            <h1 class="manrope-regular text-xl" id="email">
              {{ state.email }}
            </h1>
          </div>
        </div>
        <div id="accountinformation">
          <h1 class="manrope-bold text-2xl text-primary-blue">Contact Details</h1>
          <hr class="profile-border" />
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Contact Number</h1>
            <h1 class="manrope-regular text-xl" id="contactno">
              +{{ state.contact }}
            </h1>
          </div>
        </div>
      </div>
      <div v-if="state.worker != null" class=" px-8">
          <h1 class="manrope-bold text-2xl text-primary-blue">All Orders</h1>
          <hr class="profile-border" />
          <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="
            state.orders == null
          "
        >
          This user has not yet made any orders.
        </p>
        <div class="overflow-y-auto max-h-screen scrollbar-hidden">
          <OrderSetCard
            v-for="order in state.orders"
            :key="order.id"
            :order="order"
          />
        </div>
          
        </div>
    </page-header>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import OrderSetCard from '../components/OrderSetCard.vue';
import { onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'UserProfile',
  components: {
    SideBar,
    PageHeader,
    OrderSetCard,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      username: route.params.username,
      worker: null,
      orders: null,
      email: null,
      name: null,
      contact: null,
      empty: true,
    });

    onMounted(() => {
      getUserDetails();
      getUserOrders();
    });

    if (JSON.parse(localStorage.getItem('user')) == null) {
      state.worker = store.state.worker.worker.username
    }

    async function getUserDetails() {
      try {
        const result = await api.getUser(state.username);
        state.email = result.data.email;
        state.name = result.data.firstname + " " + result.data.lastname;
        state.contact = result.data.contactNo;
      } catch (err) {
        console.log(err);
      }
      state.empty = false;
    }

    async function getUserOrders() {
      try {
        const result = await api.getUserOrderSets(state.username);
        state.orders = result.data;
      } catch (err) {
        console.log(err);
      }
    }
    return { state };
  },
};
</script>

<style lang="postcss">
.header {
  width: 100vw;
  height: 11rem;
}

.img-container {
  width: 15rem;
  height: 15rem;
  border-radius: 20px;
  background-color: #e7edf2;
}

.sidebar-btn {
  width: 80%;
  height: 5rem;
  border-radius: 20px;
}

.content-box {
  display: flex;
  flex-flow: row wrap;
}

.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  height: 3rem;
}

.manrope-regular {
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
}

.manrope-bold {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
}

.manrope-extrabold {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
}

.profile-border {
  border-style: solid;
  @apply border-light-blue;
  @apply bg-light-blue;
  border-width: 2.5px;
}
</style>
