<template>
  <div>
    <side-bar />
    <page-header title="Staff">
      <p
        class="manrope-bold text-2xl text-center text-primary-blue mt-8"
        v-if="state.empty == null"
      >
        Loading data, please wait...
      </p>
      <AddStaffModal :addStaff="showAddStaffModal" @close="toggleAddStaffModal">
        <div class="flex flex-col mt-10">
          <label class="text-2xl manrope-bold text-primary-blue"
            >Staff's Information</label
          >
          <hr class="modal-border" />
          <div class="flex">
            <label
              for="firstname"
              class="
                relative
                manrope-bold
                text-gray-600 text-md
                mt-4
                text-primary-blue
              "
              >First name</label
            >
            <div>
              <input
                id="firstname"
                name="firstname"
                type="text"
                class="manrope-regular input-text-field w-36 ml-4"
                v-model.trim="staff.firstname"
              />
              <p class="ml-9 text-red manrope-bold text-left text-sm"></p>
            </div>
            <div class="flex">
              <label
                for="lastname"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  ml-4
                  text-primary-blue
                "
                >Last name</label
              >
              <div>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  class="manrope-regular input-text-field w-36 ml-4"
                  v-model.trim="staff.lastname"
                />
                <p class="ml-9 text-red manrope-bold text-left text-sm"></p>
              </div>
            </div>
          </div>

          <div>
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
                >Username</label
              >
              <div>
                <input
                  id="width"
                  name="width"
                  type="number"
                  class="manrope-regular input-text-field w-48 ml-4"
                  v-model.trim="staff.username"
                />
                <p class="ml-9 text-red manrope-bold text-left text-sm"></p>
              </div>
            </div>
            <div class="flex">
              <label
                for="email"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >E-mail address</label
              >
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="manrope-regular input-text-field w-60 ml-4"
                  v-model.trim="staff.email"
                />
                <p class="ml-9 text-red manrope-bold text-left text-sm"></p>
              </div>
            </div>
            <div class="flex">
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
                <p class="absolute ml-4 mt-2 left-40 text-lg manrope-regular">
                  +63
                </p>
                <div>
                  <input
                    id="contactno"
                    name="contactno"
                    type="number"
                    class="
                      manrope-regular
                      input-text-field
                      w-80
                      pl-9
                      pb-0.5
                      text-lg
                      ml-9
                    "
                    v-model.trim="staff.contactNo"
                  />
                </div>
              </div>
            </div>
            <div class="flex">
              <label
                for="password"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Password</label
              >
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="manrope-regular input-text-field w-60 ml-4"
                  v-model.trim="staff.password"
                />
                <p class="ml-9 text-red manrope-bold text-left text-sm"></p>
              </div>
            </div>
            <div class="flex">
              <label
                for="confirmpassword"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Confirm Password</label
              >
              <div>
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  class="manrope-regular input-text-field w-60 ml-4"
                  v-model.trim="staff.confirmPassword"
                />
                <p class="ml-9 text-red manrope-bold text-left text-sm"></p>
              </div>
            </div>
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
            justify-center
          "
          @click="registerWorker"
        >
          Create Staff Account
        </button>
      </AddStaffModal>
      <div
        v-if="!state.empty"
        class="flex flex-row justify-end mx-8 my-4 content-around"
      >
        <button
          class="
            flex
            manrope-regular
            text-white
            transition
            duration-300
            ease-in-out
            text-center text-md
            hover:bg-link-water hover:text-primary-blue
            w-40
            h-12
            mt-2
            pt-2
            my-auto
            rounded-xl
            bg-primary-blue
          "
          @click="toggleAddStaffModal"
        >
          <div class="mx-auto flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 my-auto mt-1 ml-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="mt-1 ml-4 mr-4">Add Staff</span>
          </div>
        </button>
      </div>
      <div class="overflow-y-auto max-h-screen scrollbar-hidden mb-5">
        <StaffCard
          v-for="worker in state.workers"
          :key="worker.username"
          :worker="worker"
        />
      </div>
    </page-header>
  </div>
</template>

<script>
import StaffCard from '../components/StaffCard.vue';
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import AddStaffModal from '../components/Modals/AddStaffModal.vue';
import { reactive, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';
export default {
  name: 'AdminViewStaff',
  components: {
    StaffCard,
    SideBar,
    PageHeader,
    AddStaffModal,
  },
  setup() {
    const showAddStaffModal = ref(false);
    const store = useStore();
    const state = reactive({
      empty: null,
      workers: null,
    });
    const staff = reactive({
      firstname: null,
      lastname: null,
      username: null,
      email: null,
      contactNo: null,
      password: null,
      confirmPassword: null,
    });

    async function getInitWorkers() {
      try {
        // get all workers
        const result = await api.getWorkers();
        state.workers = result.data;
        if (state.workers.length === 0) {
          state.empty = true;
        } else {
          state.empty = false;
        }
      } catch (err) {
        console.log(err);
      }
    }

    function toggleAddStaffModal() {
      showAddStaffModal.value = !showAddStaffModal.value;
    }

    async function registerWorker() {
      try {
        toggleAddStaffModal();
        const res = await api.registerWorker(staff);
        state.workers.push(res);
      } catch (err) {
        console.log(err);
      }
    }

    onBeforeMount(() => {
      // populate staff list
      if (store.state.worker.worker != null) {
        getInitWorkers();
      } else {
        state.empty = false;
      }
    });
    return {
      state,
      staff,
      getInitWorkers,
      showAddStaffModal,
      toggleAddStaffModal,
      registerWorker,
    };
  },
};
</script>

<style></style>
