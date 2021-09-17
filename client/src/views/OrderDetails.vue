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
              +63 {{ state.order.contactNo }}
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

            <br />
            <EditOrderSetModal
              :editOrderSet="showEditOrderSetModal"
              @close="toggleEditOrderSetModal"
            >
              <div class="flex flex-col mt-10">
                <label class="manrope-bold text-xl"
                  >Order Set
                  <span class="manrope-bold text-primary-blue"
                    >#{{ state.order.id }}</span
                  ></label
                >
                <hr class="report-border" />
                <div class="flex mb-5">
                  <label
                    for="name"
                    class="
                      relative
                      manrope-bold
                      text-gray-600 text-md
                      mt-4
                      text-primary-blue
                    "
                    >Name of Receiver:</label
                  >
                  <div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      v-model.trim="updateData.name"
                      class="manrope-regular input-text-field w-80 ml-8"
                      :class="{ 'border-red': !state.nameValidation }"
                      @keyup="isValidName(updateData.name)"
                    />
                    <p
                      class="ml-9 text-red manrope-bold text-left text-sm"
                      v-if="!state.nameValidation"
                    >
                      Value may only contain letters
                    </p>
                  </div>
                </div>

                <div class="flex mb-5">
                  <label
                    for="email"
                    class="
                      relative
                      manrope-bold
                      text-gray-600 text-md
                      mt-4
                      text-primary-blue
                    "
                    >Email Address:</label
                  >
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      v-model.trim="updateData.email"
                      class="manrope-regular input-text-field w-80 ml-14"
                      :class="{ 'border-red': v.email.$error }"
                    />
                    <p
                      class="ml-14 text-red manrope-bold text-left text-sm"
                      v-if="v.email.$error"
                    >
                      {{ v.email.$errors[0].$message }}
                    </p>
                  </div>
                </div>

                <div class="flex mb-5">
                  <label
                    for="contactno"
                    class="
                      relative
                      manrope-bold
                      text-gray-600 text-md
                      mt-4
                      text-primary-blue
                    "
                    >Contact Number:</label
                  >
                  <div class="flex">
                    <p
                      class="absolute ml-4 mt-2 left-40 text-lg manrope-regular"
                    >
                      +63
                    </p>
                    <div>
                      <input
                        id="contactno"
                        name="contactno"
                        type="number"
                        v-model.trim="updateData.contactNo"
                        class="
                          manrope-regular
                          input-text-field
                          w-80
                          pl-9
                          pb-0.5
                          text-lg
                          ml-9
                        "
                        :class="{ 'border-red': v.contactNo.$error }"
                      />
                      <p
                        class="ml-9 text-red manrope-bold text-left text-sm"
                        v-if="v.contactNo.$error"
                      >
                        {{ v.contactNo.$errors[0].$message }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex mb-5">
                  <label
                    for="deliveryaddress"
                    class="
                      relative
                      manrope-bold
                      text-gray-600 text-md
                      mt-4
                      text-primary-blue
                    "
                    >Delivery Address:</label
                  >
                  <div>
                    <input
                      id="deliveryaddress"
                      name="deliveryaddress"
                      type="text"
                      v-model.trim="updateData.address"
                      class="manrope-regular input-text-field w-80 ml-9"
                    />
                  </div>
                </div>

                <div class="flex">
                  <label
                    for="width"
                    class="
                      relative
                      manrope-bold
                      text-gray-600 text-md
                      mt-4
                      text-primary-blue
                    "
                    >Order Status:</label
                  >
                  <select
                    name="orderstatus"
                    id="orderstatus"
                    v-model.trim="updateData.status"
                    class="dropdown-field w-72 ml-16"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Waiting for Downpayment">
                      Waiting for Downpayment
                    </option>
                    <option value="Processing">Processing</option>
                    <option value="Ready for Delivery">
                      Ready for Delivery
                    </option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div class="flex">
                <button
                  class="
                    manrope-bold
                    dowload-btn
                    transition
                    duration-300
                    hover:bg-link-water hover:text-primary-blue
                    flex-shrink
                    content-center
                  "
                  @click="updateOrderSet"
                >
                  Update Information
                </button>
              </div>
            </EditOrderSetModal>
            <button
              v-if="state.isStaff"
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
            >
              Edit Order Set
            </button>
          </div>
        </div>

        <div class="overflow-y-auto max-h-screen pt-2 pb-2 mt-5">
          <order-card
            v-for="(order, index) in state.orders"
            :key="order.id"
            :order="order"
            :isStaff="state.isStaff"
            @orderUpdate="orderUpdate(order, index, $event)"
          />
        </div>

        <div v-if="state.report != null" class="mb-2">
          <!-- resolve report view modal -->
          <ResolveReportModal
            :resolveReport="showResolveReportModal"
            @close="toggleResolveReportModal"
          >
            <div class="flex flex-col mt-10">
              <p class="text-primary-blue text-left text-lg manrope-bold mb-2">
                Add comment regarding resolution (optional):
              </p>
              <textarea
                class="
                  manrope-bold
                  text-justify text-md
                  w-auto
                  h-64
                  border-2
                  rounded-md
                  border-primary-blue
                  p-2
                  placeholder-link-water
                "
                placeholder="Input comment here..."
                v-model.trim="reportData.resolveComment"
              />
              <div class="flex items-center justify-center">
                <button
                  class="
                    manrope-bold
                    dowload-btn
                    transition
                    duration-300
                    hover:bg-link-water hover:text-primary-blue
                    flex-shrink
                  "
                  @click="resolveReport"
                >
                  Resolve Issue
                </button>
              </div>
            </div>
          </ResolveReportModal>

          <!-- cancel report view modal -->
          <CancelReportModal
            :cancelReport="showCancelReportModal"
            @close="toggleCancelReportModal"
          >
            <div class="flex flex-col mt-10">
              <p class="text-primary-blue text-left text-lg manrope-bold mb-2">
                Add comment regarding cancellation (optional):
              </p>
              <textarea
                class="
                  manrope-bold
                  text-justify text-md
                  w-auto
                  h-64
                  border-2
                  rounded-md
                  border-primary-blue
                  p-2
                  placeholder-link-water
                "
                placeholder="Input comment here..."
                v-model.trim="reportData.cancelComment"
              />
              <div class="flex items-center justify-center">
                <button
                  class="
                    manrope-bold
                    dowload-btn
                    transition
                    duration-300
                    hover:bg-link-water hover:text-primary-blue
                    flex-shrink
                  "
                  @click="cancelReport"
                >
                  Cancel Issue
                </button>
              </div>
            </div>
          </CancelReportModal>

          <!-- add note view modal -->
          <AddNoteModal :addNote="showAddNoteModal" @close="toggleAddNoteModal">
            <div class="flex flex-col mt-10">
              <textarea
                class="
                  manrope-bold
                  text-justify text-md
                  w-auto
                  h-72
                  border-2
                  rounded-md
                  border-primary-blue
                  p-2
                  placeholder-link-water
                "
                :class="{ 'border-red': v2.note.$error }"
                placeholder="Input note here..."
                v-model.trim="reportData.note"
              />
              <p
                v-if="v2.note.$error"
                class="text-red manrope-bold text-left text-sm"
              >
                {{ v2.note.$errors[0].$message }}
              </p>
              <div class="flex items-center justify-center">
                <button
                  class="
                    manrope-bold
                    dowload-btn
                    transition
                    duration-300
                    hover:bg-link-water hover:text-primary-blue
                    flex-shrink
                  "
                  @click="addNote"
                >
                  Create Note
                </button>
              </div>
            </div>
          </AddNoteModal>

          <!-- view notes view modal -->
          <ViewNotesModal
            :viewNotes="showViewNotesModal"
            @close="toggleViewNotesModal"
          >
            <div
              v-if="reportData.emptyNotes"
              class="flex items-center justify-start mt-10"
            >
              <p class="text-red text-lg manrope-bold">
                No notes created yet for this report.
              </p>
            </div>
            <div v-else class="overflow-y-scroll mt-7 h-96">
              <div
                v-for="note in state.report.notes"
                :key="note"
                class="
                  p-3
                  mt-4
                  bg-light-blue
                  rounded-xl
                  order-card
                  text-justify
                  manrope-bold
                  break-all
                "
              >
                {{ note }}
              </div>
            </div>
          </ViewNotesModal>

          <h1
            v-if="state.worker"
            class="manrope-bold text-lg mt-10 text-primary-blue"
          >
            {{ state.report.user }} ({{ state.report.userFullName }}) submitted
            a report to this order set.
          </h1>

          <div class="mt-8">
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
                  hover:bg-link-water hover:text-primary-blue
                  w-28
                  max-h-xs
                  rounded-xl
                  bg-primary-blue
                "
                @click="toggleViewNotesModal"
              >
                View Notes
              </button>
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
                  hover:bg-link-water hover:text-primary-blue
                  w-28
                  max-h-xs
                  ml-2
                  rounded-xl
                  bg-primary-blue
                "
                @click="toggleAddNoteModal"
              >
                Add Note +
              </button>
              <button
                v-if="
                  state.worker &&
                  state.report.status !== 'Resolved' &&
                  state.report.status !== 'Cancelled'
                "
                class="
                  manrope-regular
                  text-white
                  inline-block
                  transition
                  duration-300
                  ease-in-out
                  ml-2
                  text-center text-sm
                  hover:bg-link-water hover:text-primary-blue
                  w-28
                  max-h-xs
                  rounded-xl
                  bg-primary-blue
                "
                @click="toggleResolveReportModal"
              >
                Resolve Issue
              </button>
              <button
                v-if="
                  state.worker &&
                  state.report.status !== 'Resolved' &&
                  state.report.status !== 'Cancelled'
                "
                class="
                  manrope-regular
                  text-white
                  inline-block
                  transition
                  duration-300
                  ease-in-out
                  ml-2
                  text-center text-sm
                  hover:bg-link-water hover:text-primary-blue
                  w-28
                  max-h-xs
                  rounded-xl
                  bg-primary-blue
                "
                @click="toggleCancelReportModal"
              >
                Cancel Issue
              </button>
            </div>
            <hr class="report-border mt-1" />

            <div
              v-if="state.report.status === 'Resolved'"
              class="flex flex-col mt-3"
            >
              <h1 class="manrope-bold text-xl">Issue Resolved.</h1>
              <div v-if="state.report.comment" class="flex flex-row mt-3">
                <p class="manrope-bold text-lg">Comments:</p>
                <br />
                <p class="text-lg pl-1 text-justify">
                  {{ state.report.comment }}
                </p>
              </div>
              <hr class="report-border mt-3" />
            </div>

            <div
              v-if="state.report.status === 'Cancelled'"
              class="flex flex-col mt-3"
            >
              <h1 class="manrope-bold text-xl">Issue Cancelled.</h1>
              <div v-if="state.report.comment" class="flex flex-row mt-3">
                <p class="manrope-bold text-lg">Comments:</p>
                <br />
                <p class="text-lg pl-1 text-justify">
                  {{ state.report.comment }}
                </p>
              </div>
              <hr class="report-border mt-3" />
            </div>

            <div class="flex flex-row mt-3 mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Status:</p>
              <p class="text-lg pl-1">{{ state.report.status }}</p>
            </div>

            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Issued by:</p>
              <p class="text-lg pl-1">
                {{ state.report.user }} ({{ state.report.userFullName }})
              </p>
            </div>

            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">
                Date of Issue:
              </p>
              <p class="text-lg pl-1">{{ state.report.dateRequested }}</p>
            </div>

            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">
                Type of Issue:
              </p>
              <p class="text-lg pl-1">{{ state.report.type }}</p>
            </div>

            <div class="flex flex-row mb-2">
              <p class="manrope-bold text-lg text-primary-blue">Description:</p>
              <br />
              <p class="text-lg pl-1 text-justify">
                {{ state.report.description }}
              </p>
            </div>

            <p class="manrope-bold text-lg mb-4 text-primary-blue">Images:</p>
            <div
              class="
                flex flex-row
                overflow-x-scroll
                items-center
                justify-center
              "
            >
              <div
                v-for="image in state.report.files"
                :key="image.filename"
                class="flex items-center pl-10 w-1/4 h-1/4"
              >
                <!-- NOTE: USE IF ACCESSING FROM CLOUDINARY -->
                <a :href="image.filePath" target="_blank">
                  <img
                    :src="image.filePath"
                    onerror="this.onerror=null;this.src='../src/assets/nopreview.png'"
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
              !state.isStaff
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
              state.order.status !== 'Cancelled' &&
              !state.isStaff
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
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import OrderCard from '../components/OrderCard.vue';
import EditOrderSetModal from '../components/Modals/EditOrderSetModal.vue';
import ResolveReportModal from '../components/Modals/ResolveReportModal.vue';
import CancelReportModal from '../components/Modals/CancelReportModal.vue';
import AddNoteModal from '../components/Modals/AddNoteModal.vue';
import ViewNotesModal from '../components/Modals/ViewNotesModal.vue';
import * as api from '../api';
import { email, numeric, maxLength, minLength } from '@vuelidate/validators';

export default {
  name: 'OrderDetails',
  components: {
    SideBar,
    PageHeader,
    OrderCard,
    EditOrderSetModal,
    ResolveReportModal,
    CancelReportModal,
    AddNoteModal,
    ViewNotesModal,
  },
  setup() {
    const showEditOrderSetModal = ref(false);
    const showResolveReportModal = ref(false);
    const showCancelReportModal = ref(false);
    const showAddNoteModal = ref(false);
    const showViewNotesModal = ref(false);
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      worker: null,
      order: null,
      orders: null,
      report: null,
      empty: true,
      isStaff: false,
      nameValidation: false,
    });

    const updateData = reactive({
      name: null,
      email: null,
      contactNo: null,
      address: null,
      status: null,
      price: null,
    });

    const reportData = reactive({
      resolveComment: '',
      cancelComment: '',
      note: '',
      emptyNotes: true,
    });

    const rules = {
      note: { required },
    };

    const v2 = useVuelidate(rules, reportData);

    async function resolveReport() {
      try {
        // create resolve report update object
        const data = {
          status: 'Resolved',
        };

        // check if comment was added by staff
        if (reportData.resolveComment !== '') {
          data['comment'] = reportData.resolveComment;
        }

        // update report status
        const result = await api.updateReportStatus(state.report.id, data);

        // if update successful, update UI
        if (result.status === 204) {
          // report is resolved
          state.report.status = 'Resolved';
          state.report.comment = reportData.resolveComment;

          // close modal
          toggleResolveReportModal();
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function cancelReport() {
      try {
        // create resolve report update object
        const data = {
          status: 'Cancelled',
        };

        // check if comment was added by staff
        if (reportData.cancelComment !== '') {
          data['comment'] = reportData.cancelComment;
        }

        // update report status
        const result = await api.updateReportStatus(state.report.id, data);

        // if update successful, update UI
        if (result.status === 204) {
          // report is cancelled
          state.report.status = 'Cancelled';
          state.report.comment = reportData.cancelComment;

          // close modal
          toggleCancelReportModal();
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function addNote() {
      const validated = await v2.value.$validate();

      if (validated) {
        try {
          // add note to report in the database
          const result = await api.addNote(state.report.id, {
            note: reportData.note,
          });

          // if successful, update note list in UI
          if (result.status === 204) {
            // add new note to notes list
            state.report.notes.push(reportData.note);

            // update view notes empty message, if empty before
            if (reportData.emptyNotes) {
              reportData.emptyNotes = false;
            }

            // close modal
            toggleAddNoteModal();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    const updateRules = {
      email: { email },
      contactNo: { numeric, minLength: minLength(9), maxLength: maxLength(10) },
    };

    const v = useVuelidate(updateRules, updateData);

    function toggleEditOrderSetModal() {
      showEditOrderSetModal.value = !showEditOrderSetModal.value;
    }

    function toggleResolveReportModal() {
      showResolveReportModal.value = !showResolveReportModal.value;
    }

    function toggleCancelReportModal() {
      showCancelReportModal.value = !showCancelReportModal.value;
    }

    function toggleAddNoteModal() {
      showAddNoteModal.value = !showAddNoteModal.value;
    }

    function toggleViewNotesModal() {
      showViewNotesModal.value = !showViewNotesModal.value;
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
        const contactNo = state.order.contactNo;
        state.order.contactNo = parseInt(
          contactNo.replace(contactNo.substring(0, 2), '')
        );

        isValidName(state.order.name);

        // initialize updateData
        updateData.name = state.order.name;
        updateData.email = state.order.email;
        updateData.contactNo = state.order.contactNo;
        updateData.address = state.order.address;
        updateData.status = state.order.status;

        // get orders of order set
        const orders = await api.getOrdersFromOrderSet(route.params.id);
        state.orders = orders.data;

        // if order set has been reported by client
        if (state.order.reported) {
          const report = await api.getOrderSetReport(route.params.id);
          state.report = report.data;

          // check if report data has staff notes
          if (state.report.notes.length != 0) {
            reportData.emptyNotes = false;
          }
        }

        state.empty = false;
      } catch (err) {
        console.log(err);

        state.empty = false;
      }
    }

    async function updateOrderSet() {
      try {
        const validated = await v.value.$validate();
        if (validated && state.nameValidation) {
          const res = await api.updateOrderSet(state.order.id, updateData);

          if (res.status === 204) {
            state.order.name = updateData.name;
            state.order.email = updateData.email;
            state.order.contactNo = updateData.contactNo;
            state.order.address = updateData.address;
            state.order.status = updateData.status;

            toggleEditOrderSetModal();
            if (updateData.status === 'Waiting for Downpayment') {
              const emailData = {
                name: updateData.name,
                email: updateData.email,
                id: state.order.id,
                downPayment: parseFloat(state.order.price * 0.5).toFixed(2),
                totalCost: parseFloat(state.order.price).toFixed(2),
              };
              await api.sendEmailProjectCost(emailData);
            }
            if (updateData.status === 'Complete') {
              const emailData = {
                name: updateData.name,
                email: updateData.email,
                id: state.order.id,
                rmBal: state.order.remBalance,
              };
              await api.sendEmailOrderComplete(emailData);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function orderUpdate(order, index, update) {
      const res = {};
      Object.keys(order).forEach((k) => (res[k] = update[k] ?? order[k]));
      state.orders[index] = res;
      const sum = state.orders
        .filter(({ price }) => price != -1)
        .reduce((total, order) => total + parseFloat(order.price), 0);
      console.log('Sum: ' + sum);
      if (sum != 0) {
        updateData.price = sum;
        const result = await api.updateOrderSet(state.order.id, updateData);

        if (result.status === 204) {
          state.order.price = parseFloat(updateData.price).toFixed(2);
        }
      } else {
        state.order.price = -1;
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

    function isValidName(name) {
      state.nameValidation = /^[a-zA-Z ]*$/.test(name) ? true : false;
    }

    return {
      state,
      route,
      updateData,
      reportData,
      v,
      v2,
      orderUpdate,
      toggleEditOrderSetModal,
      toggleResolveReportModal,
      toggleCancelReportModal,
      toggleAddNoteModal,
      toggleViewNotesModal,
      resolveReport,
      cancelReport,
      addNote,
      showEditOrderSetModal,
      showResolveReportModal,
      showCancelReportModal,
      showAddNoteModal,
      showViewNotesModal,
      updateOrderSet,
      isValidName,
    };
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

.dowload-btn {
  position: absolute;
  background-color: #0f4c81;
  color: white;
  border-radius: 20px;
  bottom: 15px;
  width: 50%;
  left: 25%;
  height: 3rem;
  vertical-align: middle;
  outline: none;
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

.dowload-btn {
  position: absolute;
  background-color: #0f4c81;
  color: white;
  border-radius: 20px;
  bottom: 15px;
  width: 50%;
  height: 3rem;
  vertical-align: middle;
  outline: none;
}

.order-card {
  transition: 1500ms;
}

.order-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}
</style>
