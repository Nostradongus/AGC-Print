<template>
  <div>
    <side-bar />
    <page-header title="View Orders">
      <p
        class="manrope-bold text-2xl text-center text-primary-blue mt-8"
        v-if="state.empty == null"
      >
        Loading data, please wait...
      </p>
      <!-- display all orders of user -->
      <div class="h-full w-full" v-if="state.empty != null">
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
            >
              Orders are sorted by most recent to least recent
            </h1>
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
            >
              Filter Orders By:
            </p>
            <!-- status filter box -->
            <select
              name="type"
              id="type"
              class="w-full md:w-60 md:h-1/2 dropdown-field mt-8"
              v-model="state.status"
              @change="onSelectStatus"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Past">Past</option>
            </select>
          </div>
        </div>
        
        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="
            (state.status === 'Active' && state.shownOrders === null) ||
            (state.status === 'Past' && state.shownOrders === null)
          "
        >
          No orders in "{{ state.status }}" status for now.
        </p>
        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="state.status === 'All' && state.shownOrders === null"
        >
          There are no orders yet.
        </p>
        <div class="overflow-y-auto max-h-screen scrollbar-hidden">
          <OrderSetCard
            v-for="order in state.shownOrders"
            :key="order.id"
            :order="order"
          />
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import OrderSetCard from '../components/OrderSetCard.vue';
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import * as api from '../api';

export default {
  name: 'StaffViewOrder',
  components: {
    OrderSetCard,
    SideBar,
    PageHeader,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      shownOrders: null,
      allOrders: null,
      status: 'All',
      empty: null,
    });

    async function getInitUsersOrders() {
      try {
        // get all active orders of users
        const result = await api.getAllOrderSets();
        state.shownOrders = state.allOrders = result.data;
        if (state.shownOrders.length === 0) {
          state.empty = true;
          state.shownOrders = null;
        } else {
          state.empty = false;
        }
      } catch (err) {
        console.log(err);
      }
    }

    function getAllActiveOrderSets() {
      const active = [
        'Pending',
        'Waiting for Downpayment',
        'Processing',
        'Ready for Delivery',
      ];

      // new list of orders to display according to selected status filter
      const filteredOrders = [];
      console.log('A: ' + state.allOrders.length);
      // get all orders according to selected status filter
      for (let ctr = 0; ctr < state.allOrders.length; ctr++) {
        if (active.includes(state.allOrders[ctr].status)) {
          filteredOrders.push(state.allOrders[ctr]);
        }
      }
      // if no orders on the list have the selected status
      if (filteredOrders.length === 0) {
        state.shownOrders = null;
        state.empty = true;
      } else {
        state.shownOrders = filteredOrders;
        state.empty = false;
      }

      return filteredOrders;
    }

    function getAllPastOrderSets() {
      const past = ['Complete', 'Cancelled'];

      // new list of orders to display according to selected status filter
      const filteredOrders = [];
      console.log('A: ' + state.allOrders.length);
      // get all orders according to selected status filter
      for (let ctr = 0; ctr < state.allOrders.length; ctr++) {
        if (past.includes(state.allOrders[ctr].status)) {
          filteredOrders.push(state.allOrders[ctr]);
        }
      }
      // if no orders on the list have the selected status
      if (filteredOrders.length === 0) {
        state.shownOrders = null;
        state.empty = true;
      } else {
        state.shownOrders = filteredOrders;
        state.empty = false;
      }

      return filteredOrders;
    }

    function onSelectStatus() {
      if (state.status === 'All') {
        state.shownOrders = state.allOrders;
      } else if (state.status === 'Active') {
        state.shownOrders = getAllActiveOrderSets();
      } else if (state.status === 'Past') {
        state.shownOrders = getAllPastOrderSets();
      }
    }

    onBeforeMount(() => {
      // populate staff active orders page with active orders of clients
      if (store.state.worker.worker != null) {
        getInitUsersOrders();
      } else {
        state.empty = false;
      }
    });

    return {
      state,
      onSelectStatus,
    };
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
</style>
