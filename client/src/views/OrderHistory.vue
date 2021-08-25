<template>
  <div>
    <side-bar />
    <page-header title="Order History">
      <!-- display all orders of user -->
      <div v-if="!state.empty" class="h-full w-full">
        <!-- message and status filter option box -->
        <div class="flex items-end mb-5">
          <div class="flex-1">
            <!-- order sort message -->
            <h1
              class="
                manrope-bold
                left-0
                -top-3.5
                text-lg
                pt-8
                px-8
                text-primary-blue
              "
            >Orders are sorted by most recent to least recent</h1
            >
          </div>
          <div class="flex flex-row items-center mr-10">
            <!-- status filter box label -->
            <p
              class="
                manrope-bold
                left-0
                -top-3.5
                text-lg
                pt-8
                px-3
                text-primary-blue
              "
            >Filter Orders By Status: </p
            >
            <!-- status filter box -->
            <select 
              name="type"
              id="type"
              class="w-full md:w-60 md:h-1/2 dropdown-field mt-8"
              v-model="state.status"
              @change="onSelectStatus"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Waiting for Downpayment">Waiting for Downpayment</option>
              <option value="Processing">Processing</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Complete">Complete</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <p
          class="
            manrope-bold
            left-0
            -top-3.5
            text-xl
            pt-3
            px-8
            text-red
          "
          v-if="state.emptyStatus"
        >No orders in "{{ state.status }}" status for now</p
        >
        <div class="overflow-y-auto max-h-screen scrollbar-hidden">
          <OrderSetCard
            v-for="order in state.orders"
            :key="order.id"
            :order="order"
          />
        </div>
      </div>
      <div v-if="state.empty">
        <div class="mx-8 mt-8 text-2xl relative">
          You currently don't have any orders.
        </div>
        <router-link
          class="
            m-8
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
            p-2
          "
          to="/order"
        >
          Add Order
        </router-link>
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import OrderSetCard from '../components/OrderSetCard.vue';
import { reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';

export default {
  name: 'OrderHistory',
  components: {
    OrderSetCard,
    SideBar,
    PageHeader,
  },
  setup() {
    const store = useStore();
    let state = reactive({
      username: store.state.user.user.username,
      orders: null,
      ordersBackup: null,
      status: 'All',
      emptyStatus: false,
      empty: null,
    });

    async function getInitUserOrders() {
      try {
        // get all user order sets at first 
        const result = await api.getUserOrderSets(state.username);
        state.orders = result.data;
        state.ordersBackup = result.data;
        if (state.orders.length !== 0) {
          state.empty = false;
        } else {
          state.empty = true;
        }
      } catch (err) {
        console.log(err.response.data);

        // since no order sets, indicate as empty
        state.empty = true;
      }
    }

    function onSelectStatus() {
      if (state.status === 'All') {
        state.orders = state.ordersBackup;
        state.emptyStatus = false;
      } else {
        // new list of orders to display according to selected status filter 
        const filteredOrders = [];

        // get all orders according to selected status filter
        for (let ctr = 0; ctr < state.ordersBackup.length; ctr++) {
          if (state.ordersBackup[ctr].status === state.status) {
            filteredOrders.push(state.ordersBackup[ctr]);
          }
        }

        // set filtered orders list
        state.orders = filteredOrders;

        // if no orders on the list have the selected status
        if (state.orders.length === 0) {
          state.emptyStatus = true;
        } else {
          state.emptyStatus = false;
        }
      }
    }

    onBeforeMount(() => {
      // populate user order history page with previous ('Completed') orders
      if (store.state.user.user != null) {
        getInitUserOrders();
      } else {
        state.empty = false;
      }
    });

    return { state, getInitUserOrders, onSelectStatus };
  },
};
</script>

<style>
.header {
  width: 100vw;
  height: 11rem;
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

.dropdown-field {
  border: 0px;
  outline: 0px;
  width: 28rem;
  height: 3rem;
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

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
</style>
