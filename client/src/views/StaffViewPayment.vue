<template>
  <div>
    <side-bar />
    <page-header title="Payments">
      <p
        class="manrope-bold text-2xl text-center text-primary-blue mt-8"
        v-if="state.empty == null"
      >
        Loading data, please wait...
      </p>
      <!-- display all user payments -->
      <div class="h-full w-full" v-if="state.empty != null && !state.empty">
        <!-- message and status filter option box -->
        <div class="flex items-end mb-5">
          <div class="flex-1">
            <!-- payment sort message -->
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
              Payments are sorted by most recent to least recent
            </h1>
          </div>
          <div v-if="state.empty != null && !state.empty" class="flex flex-row items-center mr-10">
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
              Filter Payments By:

              <!-- status filter box -->
              <select
                name="type"
                id="type"
                class="w-full md:w-60 md:h-1/2 dropdown-field mt-4 ml-2"
                v-model="state.status"
                @change="onSelectStatus"
              >
                <option value="All">All</option>
                <option value="Payment Pending Verification">
                  Payment Pending Verification
                </option>
                <option value="Verified">Verified</option>
              </select>
            </label>
          </div>
        </div>
        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="
            state.status !== 'All' && state.emptyStatus
          "
        >
          No payments in "{{ state.status }}" status for now.
        </p>
        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
          v-if="state.status === 'All' && state.emptyStatus"
        >
          There are no payments yet.
        </p>
        <div class="overflow-y-auto max-h-screen scrollbar-hidden">
          <PaymentDetailsCard
            v-for="payment in state.payments"
            :key="payment.id"
            :payment="payment"
          />
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import PaymentDetailsCard from '../components/PaymentDetailsCard.vue';
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import * as api from '../api';

export default {
  name: 'StaffViewPayment',
  components: {
    PaymentDetailsCard,
    SideBar,
    PageHeader,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      payments: null,
      paymentsBackup: null,
      status: 'All',
      empty: null,
      emptyStatus: false,
    });

    async function getInitUserPayments() {
      try {
        // get all active orders of users
        const result = await api.getAllPayments();
        state.payments = state.paymentsBackup = result.data;

        // check if reports list is empty
        state.empty = state.emptyStatus = state.payments.length === 0;
      } catch (err) {
        state.empty = state.emptyStatus = true;
        console.log(err);
      }
    }

    function onSelectStatus() {
      if (state.status === 'All') {
        state.payments = state.paymentsBackup;
        state.emptyStatus = false;
      } else {
        // new list of reports to display according to selected status filter
        const filteredPayments = [];

        // get all reports according to selected status filter
        for (let ctr = 0; ctr < state.paymentsBackup.length; ctr++) {
          if (state.paymentsBackup[ctr].confirmed && state.status === 'Verified' ||
              !state.paymentsBackup[ctr].confirmed && state.status === 'Payment Pending Verification') {
            filteredPayments.push(state.paymentsBackup[ctr]);
          } 
        }

        // set filtered reports list
        state.payments = filteredPayments;

        // if no reports on the list have the selected status
        if (state.payments.length === 0) {
          state.emptyStatus = true;
        } else {
          state.emptyStatus = false;
        }
      }
    }

    onBeforeMount(() => {
      // populate staff active orders page with active orders of clients
      if (store.state.worker.worker != null) {
        getInitUserPayments();
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
