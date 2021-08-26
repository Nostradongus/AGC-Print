<template>
  <div>
    <side-bar />
    <page-header title="View Orders">
      <!-- display all orders of user -->
      <div class="h-full w-full">
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
              <option value="Active">Active</option>
              <option value="Past">Past</option>
            </select>
          </div>
        </div>
        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="state.empty"
        >
          No orders in "{{ state.status }}" status for now
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
import { reactive, onMounted } from 'vue';
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
      shownorders: null,
      activeorders: null,
      pastorders: null,
      status: 'Active',
      emptyStatus: false,
      empty: true,
    });

    async function getAllActiveOrderSets() {
      try {
        // get all user order sets at first
        const result = await api.getAllActiveOrderSets();
        state.activeorders = result.data;
        if (state.activeorders.length !== 0) {
          state.empty = false;
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }

    async function getAllPastOrderSets() {
      try {
        // get all user order sets at first
        const result = await api.getAllPastOrderSets();
        state.pastorders = result.data;
        if (state.pastorders.length !== 0) {
          state.empty = false;
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }

    function onSelectStatus() {
      if (state.status === 'Active') {
        state.shownorders = state.activeorders;
      } else {
        state.shownorders = state.pastorders;

        // if no orders on the list have the selected status
        // if (state.shownorders.length === 0) {
        //   state.emptyStatus = true;
        // } else {
        //   state.emptyStatus = false;
        // }
      }
    }

    onMounted(() => {
      // populate staff active orders page with active orders of clients
      if (store.state.worker.worker != null) {
        getAllActiveOrderSets();
      } else {
        state.empty = false;
      }
    });

    console.log(state.activeorders);
    console.log(state.pastorders);

    return {
      state,
      getAllActiveOrderSets,
      getAllPastOrderSets,
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
