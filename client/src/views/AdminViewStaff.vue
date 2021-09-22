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
                for="username"
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
                  name="username"
                  type="text"
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
        v-if="state.empty != null"
        class="flex flex-row justify-start mx-8 my-4 content-around"
      >
        <p
          class="manrope-bold left-0 -top-3.5 text-xl pt-4 px-1 text-red flex-1"
          v-if="state.empty"
        >
          There are no staff yet.
        </p>
        <div v-else class="flex-1">
          <div
            v-if="state.empty != null && !state.empty"
            class="flex flex-row justify-start mt-4 content-end"
          >
            <h1
              class="
                manrope-extrabold
                text-lg text-center
                mt-1.5
                mr-3
                text-primary-blue
              "
            >
              Search Staff:
            </h1>
            <input
              type="text"
              class="
                h-10
                lg:w-96
                md:w-80
                border
                search
                placeholder-primary-blue
                text-primary-blue
              "
              placeholder="Search by Username..."
              v-model.trim="state.search"
              v-on:keyup="searchWorker(state.search)"
            />
          </div>
        </div>
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
      <p
        class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
        v-if="
          state.workers != null && !state.workers.length && state.search !== ''
        "
      >
        No users with "{{ state.search }}" username.
      </p>
      <div class="overflow-y-auto max-h-screen scrollbar-hidden mb-5">
        <StaffCard
          v-for="(worker, index) in state.workers"
          :key="worker.username"
          :worker="worker"
          @deleteWorker="deleteWorker(index, $event)"
          @updateWorker="updateWorker(worker, index, $event)"
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
import { reactive, onBeforeMount, ref, computed } from 'vue';
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
      search: null,
      allWorkers: null,
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
        state.workers = state.allWorkers = result.data;
        if (state.workers.length === 0) {
          state.empty = true;
        } else {
          state.empty = false;
        }
      } catch (err) {
        state.empty = true;
        console.log(err);
      }
    }

    function toggleAddStaffModal() {
      showAddStaffModal.value = !showAddStaffModal.value;
    }

    async function registerWorker() {
      try {
        staff.contactNo = `63${staff.contactNo}`;
        toggleAddStaffModal();
        const res = await api.registerWorker(staff);
        if (res.status == 201) {
          state.workers.push(res.data);
        }

        console.log(res.error);
      } catch (err) {
        console.log(err.response);
      }
    }

    async function deleteWorker(index, username) {
      try {
        await api.deleteWorker(username);
        state.workers.splice(index, 1);
      } catch (err) {
        console.log(err);
      }
    }

    async function updateWorker(worker, index, update) {
      try {
        update.contactNo = `63${update.contactNo}`;
        const res = {};
        Object.keys(worker).forEach((k) => (res[k] = update[k] ?? worker[k]));
        await api.updateWorker(update.initUsername, update);
        state.workers[index] = res;
      } catch (err) {
        console.log(err.response);
      }
    }

    function searchWorker(search) {
      state.workers = computed(() => {
        return state.allWorkers.filter((worker) => {
          return worker.username.match(search);
        });
      });
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
      deleteWorker,
      updateWorker,
      searchWorker,
    };
  },
};
</script>

<style></style>
