<template>
<div>
  <side-bar/>
  <page-header title="Delivery Information">
        <div class="p-8 mt-8">
        <form>
          <div class="relative">
            <input
              id="completename"
              name="completename"
              type="text"
              class="manrope-regular input-text-field"
              v-model="state.name"
            />
            <label
              for="completename"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Complete Name</label
            >
          </div>
          <div class="relative mt-12">
            <input
              id="email"
              name="email"
              type="text"
              class="manrope-regular input-text-field"
              v-model="state.email"
            />
            <label
              for="email"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >E-mail Address</label
            >
          </div>
          <div class="relative mt-12">
            <input
              id="contactno"
              name="contactno"
              type="text"
              class="manrope-regular input-text-field"
              v-model="state.contactNo"
            />
            <label
              for="contactno"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Contact Number</label
            >
          </div>
          <div class="relative mt-12">
            <input
              id="billingaddress"
              name="billingaddress"
              type="text"
              class="manrope-regular input-text-field"
              v-model="state.address"
            />
            <label
              for="billingaddress"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Billing Address</label
            >
          </div>
          <label
            for="next-btn"
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
              mt-12
              rounded-xl
              bg-primary-blue
            "
          >
            <button @click="addToCart">Next</button>
        </label>
        </form>
      </div>

  </page-header>

</div>

</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'DeliveryInformation',
  components: {
    SideBar, 
    PageHeader,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    let state = reactive({
      name: '',
      email: '',
      contactNo: '',
      address: '',
    });

    async function updateOrderFromCart() {
      // get order id
      const data = store.dispatch('getOrder'); 

      // update specified order with delivery information
      const result = await api.updateOrderFromCart(data.id, state);

      // go to order details page
      router.push({ name: 'OrderDetails' });
    }

    return { state, updateOrderFromCart };
  }
};
</script>

<style>
.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 48rem;
  height: 3rem;
}

.next-btn {
  width: 10rem;
  height: 5rem;
  border-radius: 20px;
}

.sidebar {
  width: 20rem;
  height: 100vh;
  background: #e7edf2;
}

.header {
  width: 100vw;
  height: 11rem;
}

.content-box {
  display: flex;
  flex-flow: row wrap;
}

.sidebar-btn {
  width: 10rem;
  height: 5rem;
  border-radius: 20px;
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
</style>
