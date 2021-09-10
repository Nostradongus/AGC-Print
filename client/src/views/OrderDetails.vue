<template>
  <div>
    <side-bar />
    <page-header title="Order Details">
      <p 
        class="manrope-bold text-2xl text-center text-primary-blue mt-8" 
        v-if="state.empty"
      >
        Loading data, please wait...
      </p>
      <div class="p-8" v-if="!state.empty">
        <!-- Order Details -->
        <div class="flex">
          <div class="flex-1">
            <span class="text-lg manrope-bold">Order Set #: </span>
            <span class="text-lg manrope-regular">{{ state.order.id }}</span>

            <br />

            <span class="text-lg manrope-bold">Name of Receiver: </span>
            <span class="text-lg manrope-regular">{{ state.order.name }}</span>

            <br />

            <span class="text-lg manrope-bold">Email Address: </span>
            <span class="text-lg manrope-regular">{{ state.order.email }}</span>

            <br />

            <span class="text-lg manrope-bold">Contact Number: </span>
            <span class="text-lg manrope-regular">
              +{{ state.order.contactNo }}
            </span>

            <br />

            <span class="text-lg manrope-bold">Delivery Address: </span>
            <span class="text-lg manrope-regular">{{
              state.order.address
            }}</span>
          </div>
          <div>
            <span class="text-lg manrope-bold">Order Status: </span>
            <span class="text-lg manrope-regular">{{
              state.order.status
            }}</span>

            <br />

            <span class="text-lg manrope-bold">Total Price: </span>
            <span
              v-if="state.order.price !== -1"
              class="text-lg manrope-regular"
              >₱ {{ state.order.price }}</span
            >
            <span
              v-else-if="state.order.price === -1"
              class="text-lg manrope-regular"
              >Pending Total Price</span
            >

            <br /><br /><br />
            <EditOrderSetModal :editOrderSet="showEditOrderSetModal" @close="toggleEditOrderSetModal">
              <form class="">
                <div class="flex flex-col mt-10">
                  <label
                  class="
                    manrope-regular
                    text-gray-600 text-xl
                  "
                  >Order Set <span class="manrope-bold text-primary-blue">#{{state.order.id}}</span></label
                >
                  <hr>
                  <div class="flex">
                    <label
                      for="name"
                      class="relative manrope-regular text-gray-600 text-md mt-4"
                      >Name of Receiver</label
                    >
                    <input
                      id="name"
                      name="name"
                      type="text"
                      :value="state.order.name"
                      class="manrope-regular input-text-field w-32 ml-9"
                    />
                  </div>
                  <div class="flex">
                    <label
                      for="email"
                      class="relative manrope-regular text-gray-600 text-md mt-4"
                      >Email Address</label
                    >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      :value="state.order.email"
                      class="manrope-regular input-text-field w-60 ml-14"
                    />
                  </div>
                  <div class="flex">
                    <label
                      for="contactno"
                      class="relative manrope-regular text-gray-600 text-md mt-4"
                      >Contact Number</label
                    >
                    <div class="flex">
                      <p class="absolute ml-4 mt-3 left-40 text-lg manrope-regular">+63</p>
                      <input
                        id="contactno"
                        name="contactno"
                        type="number"
                        :value="state.order.contactNo % 63000000000"
                        class="manrope-regular input-text-field w-72 pl-10 text-lg ml-9"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <label
                      for="deliveryaddress"
                      class="relative manrope-regular text-gray-600 text-md mt-4"
                      >Delivery Address</label
                    >
                    <input
                      id="deliveryaddress"
                      name="deliveryaddress"
                      type="text"
                      :value="state.order.address"
                      class="manrope-regular input-text-field w-72 ml-9"
                    />
                  </div>
                  <div class="flex">
                    <label
                      for="width"
                      class="relative manrope-regular text-gray-600 text-md mt-4"
                      >Order Status</label
                    >
                    <select
                      name="orderstatus"
                      id="orderstatus"
                      class="dropdown-field w-72 ml-16"
                    >
                      <option value="Pending" :selected="state.order.status==='Pending'">Pending</option>
                      <option value="Waiting for Downpayment" :selected="state.order.status==='Waiting for Downpayment'">
                        Waiting for Downpayment
                      </option>
                      <option value="Processing" :selected="state.order.status==='Processing'">Processing</option>
                      <option value="Ready for Delivery" :selected="state.order.status==='Ready for Delivery'">Ready for Delivery</option>
                      <option value="Complete" :selected="state.order.status==='Complete'">Complete</option>
                    </select>
                  </div>
                </div>
                <button
                  class="
                    manrope-bold
                    dowload-btn
                    transition
                    duration-300
                    hover:bg-link-water hover:text-primary-blue
                    flex-shrink
                  "
                >
                  Update Information
                </button>
              </form>
            </EditOrderSetModal>
            <button
              class="
                manrope-regular
                text-white
                inline-block
                transition
                duration-300
                ease-in-out
                text-center text-md
                hover:bg-link-water hover:text-primary-blue
                w-40
                h-10
                mt-2
                p-1
                rounded-xl
                bg-primary-blue
              "
              @click="toggleEditOrderSetModal"
              >Edit Order Set</button
            >
          </div>
        </div>

        <div class="overflow-y-auto max-h-screen pt-2 pb-2 mt-5">
          <order-card
            v-for="order in state.orders"
            :key="order.id"
            :order="order"
            :isStaff="state.isStaff"
          />
        </div>

        <div v-if="state.report != null" class="mb-2">
          <h1 
            v-if="state.worker == null"
            class="manrope-bold text-lg mt-5 text-primary-blue"
          >
            You have submitted a report to this order set.
          </h1>

          <div class="mt-5">
            <div class="flex flex-row">
              <h1 class="manrope-bold text-2xl text-primary-blue flex-1"> 
                Report Details: 
              </h1>
              <button
                v-if="state.worker"
                class="
                  manrope-regular
                  text-white
                  inline-block
                  transition
                  duration-300
                  ease-in-out
                  text-center text-sm
                  ml-2
                  hover:bg-link-water hover:text-primary-blue w-28
                  max-h-xs
                  rounded-xl
                  bg-primary-blue
                "
                >View Notes</button
              >
              <button
                v-if="state.worker"
                class="
                  manrope-regular
                  text-white
                  inline-block
                  transition
                  duration-300
                  ease-in-out
                  text-center text-sm
                  hover:bg-link-water hover:text-primary-blue w-28
                  max-h-xs
                  ml-2
                  rounded-xl
                  bg-primary-blue
                "
                >Add Note +</button
              >
              <button
                v-if="state.worker && state.report.status !== 'Resolved'"
                class="
                  manrope-regular
                  text-white
                  inline-block
                  transition
                  duration-300
                  ease-in-out
                  ml-2
                  text-center text-sm
                  hover:bg-link-water hover:text-primary-blue w-28
                  max-h-xs
                  rounded-xl
                  bg-primary-blue
                "
                >Resolve Issue</button
              >
              <button
                v-if="state.worker && state.report.status !== 'Resolved'"
                class="
                  manrope-regular
                  text-white
                  inline-block
                  transition
                  duration-300
                  ease-in-out
                  ml-2
                  text-center text-sm
                  hover:bg-link-water hover:text-primary-blue w-28
                  max-h-xs
                  rounded-xl
                  bg-primary-blue
                "
                >Cancel Issue</button
              >
            </div>
            <hr class="report-border mt-1" />

            <div class="flex flex-row mt-3 mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Status: </p>
              <p class="text-lg pl-1"> {{ state.report.status }} </p>
            </div>

            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Issued by: </p>
              <p class="text-lg pl-1"> {{ state.report.user }} ({{ state.report.userFullName }}) </p>
            </div>

            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Date of Issue: </p>
              <p class="text-lg pl-1"> {{ state.report.dateRequested }} </p>
            </div>
            
            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Type of Issue: </p>
              <p class="text-lg pl-1"> {{ state.report.type }} </p>
            </div>

            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Description: </p>
              <br>
              <p class="text-lg pl-1 text-justify"> 
                {{ state.report.description }}
              </p>
            </div>

            <p class="manrope-bold text-lg mb-4 text-primary-blue">Images: </p>
            <div class="flex flex-row overflow-x-scroll items-center justify-center">
              <div 
                v-for="image in state.report.files" 
                :key="image.filename" 
                class="flex items-center pl-10 w-1/4 h-1/4"
              >
                <!-- NOTE: USE IF ACCESSING FROM CLOUDINARY -->
                <a :href="image.filePath" target="_blank">
                  <img
                    :src="image.filePath"
                    onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
                    alt="Order Image"
                    class="order-img"
                    border="0"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mb-8" v-if="!state.empty">
        <div class="flex-1" v-if="state.order">
          <router-link
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
              mx-8
              p-3
              rounded-xl
              bg-primary-blue
            "
            :to="state.isStaff ? `/view-order-list` : `/my-orders`"
            >Back</router-link
          >
        </div>
        
      
        <div v-if="state.order">
          <router-link
            v-if="
              state.order.status === 'Complete' &&
              state.order.reported != true &&
              state.isStaff != true
            "
            class="
              manrope-regular
              text-white
              inline-block
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-link-water hover:text-primary-blue
              mx-8
              p-3
              rounded-xl
              bg-primary-blue
            "
            :to="`/report-order/${route.params.id}`"
            >Report Order</router-link
          >
          <router-link
            v-if="
              state.order.price !== -1 &&
              state.order.status !== 'Complete' &&
              state.order.status !== 'Pending' &&
              state.isStaff != true
            "
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
              mx-8
              p-3
              rounded-xl
              bg-primary-blue
            "
            :to="`/payment-order/${route.params.id}`"
            >Pay Here</router-link
          >
        </div>
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { reactive, onMounted, ref } from 'vue';
import OrderCard from '../components/OrderCard.vue';
import EditOrderSetModal from '../components/Modals/EditOrderSetModal.vue';
import * as api from '../api';

export default {
  name: 'OrderDetails',
  components: { SideBar, PageHeader, OrderCard, EditOrderSetModal },
  setup() {
    const showEditOrderSetModal = ref(false);
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      worker: null,
      order: null,
      orders: null,
      report: null,
      empty: true,
      isStaff: false,
    });

    function toggleEditOrderSetModal(){
      showEditOrderSetModal.value = !showEditOrderSetModal.value;
    }

    if (JSON.parse(localStorage.getItem('user')) == null) {
      state.worker = store.state.worker.worker.username;
    }

    onMounted(() => {
      loadOrder();
      isStaff();
    });

    async function loadOrder() {
      try {
        // get order set
        const orderSet = await api.getOrderSet(route.params.id);
        state.order = orderSet.data;

        // get orders of order set
        const orders = await api.getOrdersFromOrderSet(route.params.id);
        state.orders = orders.data;

        // if order set has been reported by client
        if (state.order.reported) {
          const report = await api.getOrderSetReport(route.params.id);
          state.report = report.data;
        }

        state.empty = false;
      } catch (err) {
        console.log(err);

        state.empty = false;
      }
    }

    async function isStaff() {
      try {
        const staff = JSON.parse(localStorage.getItem('worker'));
        if (staff) {
          state.isStaff = true;
        }
      } catch (err) {
        console.log(err);
      }
    }
    return { state, route, toggleEditOrderSetModal, showEditOrderSetModal };
  },
};
</script>

<style lang="postcss">
.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 48rem;
  height: 3rem;
}

.background-black {
  background-color: black;
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

.desc-paragraph {
  text-indent: 5%;
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

.report-border {
  border-style: solid;
  @apply border-light-blue;
  @apply bg-light-blue;
  border-width: 2.5px;
}
</style>
