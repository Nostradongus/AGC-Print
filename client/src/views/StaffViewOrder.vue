<template>
  <div>
    <side-bar />
    <page-header title="Orders">
      <p
        class="manrope-bold text-2xl text-center text-primary-blue mt-8"
        v-if="state.empty == null"
      >
        Loading data, please wait...
      </p>
      <!-- display all orders of user -->
      <div class="flex-1" v-if="state.empty != null && state.shownOrders != null">
        <!-- message and status filter option box -->
        <div class="grid grid-cols-2">
          <div v-if="!state.empty" class="flex flex-row justify-start mx-8 my-8 content-around">
            <h1 class="manrope-extrabold text-lg text-center mt-1.5 mr-3 text-primary-blue"> Search Order: </h1>
            <input
              type="text"
              class="h-10 lg:w-96 md:w-80 border search placeholder-primary-blue text-primary-blue"
              placeholder="Search by Order ID..."
              v-model.trim="state.search"
              v-on:keyup="searchOrders(state.search)"
            />
          </div>
          <div class="grid grid-rows-2 justify-end">
            <div class="mr-10">
              <!-- order sort message -->
              <h1
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
                Orders are sorted by most recent to least recent
              </h1>
            </div>
            <div class="mr-10">
              <!-- status filter box label -->
              <label
                class="
                  manrope-bold
                  left-0
                  -top-3.5
                  text-lg
                  pt-4
                  px-3
                  text-primary-blue
                "
              >
                Filter Orders By:

                <!-- status filter box -->
                <select
                  name="type"
                  id="type"
                  class="w-full md:w-60 md:h-1/2 dropdown-field mt-4 ml-2"
                  v-model="state.status"
                  @change="onSelectStatus"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Past">Past</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="state.shownOrders != null && !state.shownOrders.length && state.search === ''"
        >
          No orders in "{{ state.status }}" status for now.
        </p>

        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="state.shownOrders != null && !state.shownOrders.length && state.search !== ''"
        >
          No orders with "{{ state.search }}" order ID.
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
import { reactive, onBeforeMount, computed } from 'vue';
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
      search: null,
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

    function searchOrders() {
      const active = [
        'Pending',
        'Waiting for Downpayment',
        'Processing',
        'Ready for Delivery',
      ];
      const past = ['Complete', 'Cancelled'];
      if (state.search) {
        if (state.status === 'All') {
          state.shownOrders = computed(() => {
            return state.allOrders.filter((order) => {
              return order.id.match(state.search);
            });
          });
        } else {
          if (state.status === 'Active') {
            state.shownOrders = computed(() => {
              return state.allOrders.filter((order) => {
                return (
                  active.includes(order.status) && order.id.match(state.search)
                );
              });
            });
          } else {
            state.shownOrders = computed(() => {
              return state.allOrders.filter((order) => {
                return (
                  past.includes(order.status) && order.id.match(state.search)
                );
              });
            });
          }
        }
      } else {
        onSelectStatus();
      }
    }

    function onSelectStatus() {
      const active = [
        'Pending',
        'Waiting for Downpayment',
        'Processing',
        'Ready for Delivery',
      ];
      const past = ['Complete', 'Cancelled'];

      if (state.search) {
        searchOrders();
      } else {
        if (state.status === 'All') {
          state.shownOrders = computed(() => state.allOrders);
        } else {
          if (state.status === 'Active') {
            state.shownOrders = computed(() => {
              return state.allOrders.filter((order) => {
                return active.includes(order.status);
              });
            });
          } else {
            state.shownOrders = computed(() => {
              return state.allOrders.filter((order) => {
                return past.includes(order.status);
              });
            });
          }
        }
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
      searchOrders,
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

.search {
  background-position: 2% 50%;
  background-image: url('https://img.icons8.com/material-outlined/24/000000/search--v1.png');
  background-repeat: no-repeat;
  padding-left: 45px;
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
