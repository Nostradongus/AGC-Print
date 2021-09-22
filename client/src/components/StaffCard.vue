<template>
  <div class="px-8 pt-3 pb-1">
    <div class="mx-auto mb-0.5 h-30 bg-light-blue rounded-xl p-3">
      <EditStaffModal
        :editStaff="showEditStaffModal"
        @close="toggleEditStaffModal"
      >
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
                v-model.trim="staffData.firstname"
                :placeholder="props.worker.firstname"
                :class="{ 'border-red': vUpdateWorker.firstname.$error }"
              />
              <p
                class="ml-4 text-red manrope-bold text-left text-sm"
                v-if="vUpdateWorker.firstname.$error"
              >
                {{ vUpdateWorker.firstname.$errors[0].$message }}
              </p>
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
                :class="{ 'border-red': vUpdateWorker.lastname.$error }"
                >Last name</label
              >
              <div>
                <input
                  name="lastname"
                  type="text"
                  class="manrope-regular input-text-field w-36 ml-4"
                  v-model.trim="staffData.lastname"
                  :placeholder="props.worker.lastname"
                  :class="{ 'border-red': vUpdateWorker.lastname.$error }"
                />
                <p
                  class="ml-4 text-red manrope-bold text-left text-sm"
                  v-if="vUpdateWorker.lastname.$error"
                >
                  {{ vUpdateWorker.lastname.$errors[0].$message }}
                </p>
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
                >Username:</label
              >
              <h1 class="manrope-regular mt-4 ml-4">
                {{ props.worker.username }}
              </h1>
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
                >E-mail address:</label
              >
              <div>
                <input
                  name="email"
                  type="email"
                  class="manrope-regular input-text-field w-60 ml-4"
                  v-model.trim="staffData.email"
                  :placeholder="props.worker.email"
                  :class="{ 'border-red': vUpdateWorker.email.$error }"
                />
                <p
                  class="ml-4 text-red manrope-bold text-left text-sm"
                  v-if="vUpdateWorker.email.$error"
                >
                  {{ vUpdateWorker.email.$errors[0].$message }}
                </p>
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
                    v-model.trim="staffData.contactNo"
                    :placeholder="contactNo"
                    :class="{ 'border-red': vUpdateWorker.contactNo.$error }"
                  />
                  <p
                    class="ml-9 text-red manrope-bold text-left text-sm"
                    v-if="vUpdateWorker.contactNo.$error"
                  >
                    {{ vUpdateWorker.contactNo.$errors[0].$message }}
                  </p>
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
                  v-model.trim="staffData.password"
                  :class="{ 'border-red': vUpdateWorker.password.$error }"
                  @keyup="isValidPassword()"
                />
                <p
                  class="ml-4 text-red manrope-bold text-left text-sm"
                  v-if="vUpdateWorker.password.$error"
                >
                  {{ vUpdateWorker.password.$errors[0].$message }}
                </p>
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
                  v-model.trim="staffData.confirmPassword"
                  :class="{
                    'border-red': !updateWorkerValidation.passwordValidation,
                  }"
                  @keyup="isValidPassword()"
                />
                <p
                  class="ml-4 text-red manrope-bold text-left text-sm"
                  v-if="!updateWorkerValidation.passwordValidation"
                >
                  Passwords does not match.
                </p>
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
          @click="updateWorker"
        >
          Update Information
        </button>
      </EditStaffModal>
      <ConfirmDeleteModal
        :confirmDelete="showConfirmDeleteModal"
        @close="toggleConfirmDeleteModal"
      >
        <label class="manrope-bold text-gray-600 text-lg text-center mt-12"
          >Are you sure you would like to delete staff?
        </label>
        <div class="flex justify-center mt-8">
          <button
            class="
              manrope-bold
              confirm-btn
              transition
              duration-300
              float-left
              absolute
              bottom-3
              left-20
              hover:bg-link-water hover:text-primary-blue
            "
            @click="toggleConfirmDeleteModal"
          >
            Cancel
          </button>
          <button
            class="
              manrope-bold
              confirm-btn
              transition
              duration-300
              absolute
              bottom-3
              right-20
              hover:bg-red hover:text-white
            "
            @click="deleteWorker"
          >
            Delete
          </button>
        </div>
      </ConfirmDeleteModal>
      <div class="flex p-1 z-0">
        <div class="my-auto pr-3 w-1/5">
          <img
            src="../assets/logo.png"
            class="h-24 w-24"
            alt="AGC Print Logo"
          />
        </div>
        <div class="flex-1">
          <div class="my-auto ml-3 mt-5">
            <div class="manrope-extrabold text-2xl my-auto">
              {{ worker.firstname }} {{ worker.lastname }}
            </div>
            <div class="manrope-bold text-primary-blue text-xl my-auto">
              {{ worker.username }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end justify-center">
          <button
            class="
              text-primary-blue
              manrope-bold
              rounded-md
              mr-4
              pt-0.5
              pl-1
              pr-1
              ml-2
              mb-3
              focus:outline-none
              bg-gray-500
              transition
              duration-100
              ease-in-out
              hover:bg-light-gray
            "
            @click="toggleEditStaffModal"
          >
            Edit Information >
          </button>
          <button
            class="
              text-primary-blue
              manrope-bold
              rounded-md
              mr-4
              pt-0.5
              pl-2
              pr-2
              ml-2
              focus:outline-none
              bg-gray-500
              transition
              duration-100
              ease-in-out
              hover:bg-red hover:text-white
            "
            @click="toggleConfirmDeleteModal"
          >
            Delete Staff
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditStaffModal from './Modals/EditStaffModal.vue';
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal.vue';
import { reactive, ref } from 'vue';
import {
  alpha,
  email,
  numeric,
  maxLength,
  minLength,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import * as api from '../api';
export default {
  name: 'StaffCard',
  components: {
    EditStaffModal,
    ConfirmDeleteModal,
  },
  props: {
    worker: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const staffData = reactive({
      username: props.worker.username,
      initEmail: props.worker.email,
      firstname: null,
      lastname: null,
      email: null,
      contactNo: null,
      password: null,
      confirmPassword: null,
    });

    const updateWorkerValidation = reactive({
      passwordValidation: true,
    });

    const updateWorkerRules = {
      firstname: { alpha },
      lastname: { alpha },
      email: { email },
      contactNo: {
        numeric,
        minLength: minLength(9),
        maxLength: maxLength(10),
      },
      password: { minLength: minLength(8) },
    };

    const vUpdateWorker = useVuelidate(updateWorkerRules, staffData);

    const showEditStaffModal = ref(false);
    const showConfirmDeleteModal = ref(false);
    const contactNo = ref(
      parseInt(
        props.worker.contactNo.replace(
          props.worker.contactNo.substring(0, 2),
          ''
        )
      )
    );

    function toggleEditStaffModal() {
      showEditStaffModal.value = !showEditStaffModal.value;
      setAll(staffData, null);
      staffData.username = props.worker.username;
      staffData.initEmail = props.worker.email;
    }

    function toggleConfirmDeleteModal() {
      showConfirmDeleteModal.value = !showConfirmDeleteModal.value;
    }

    async function deleteWorker() {
      try {
        // delete worker from database
        toggleConfirmDeleteModal();
        emit('deleteWorker', props.worker.username);
      } catch (err) {
        console.log(err.response);
      }
    }

    async function updateWorker() {
      try {
        const validated = await vUpdateWorker.value.$validate();
        if (validated && checkBoolean(updateWorkerValidation)) {
          const data = JSON.parse(JSON.stringify(staffData));
          const username = staffData.username;
          toggleEditStaffModal();
          const res = await api.updateWorker(username, data);
          emit('updateWorker', res.data);
          updateWorkerValidation.passwordValidation = true;
        }
      } catch (err) {
        console.log(err.response);
      }
    }

    function setAll(obj, val) {
      Object.keys(obj).forEach(function (index) {
        obj[index] = val;
      });
    }

    function isValidPassword() {
      updateWorkerValidation.passwordValidation =
        (staffData.confirmPassword === staffData.password ? true : false) &&
        staffData.confirmPassword &&
        staffData.password;
      if (!staffData.confirmPassword && !staffData.password) {
        updateWorkerValidation.passwordValidation = true;
      }
      console.log(
        staffData.confirmPassword +
          ' ' +
          staffData.password +
          ' ' +
          updateWorkerValidation.passwordValidation
      );
    }

    function checkBoolean(obj) {
      return Object.values(obj).every(Boolean);
    }

    return {
      props,
      contactNo,
      showEditStaffModal,
      showConfirmDeleteModal,
      toggleEditStaffModal,
      toggleConfirmDeleteModal,
      deleteWorker,
      updateWorker,
      staffData,
      isValidPassword,
      vUpdateWorker,
      updateWorkerValidation,
    };
  },
};
</script>

<style>
.confirm-btn {
  background-color: #0f4c81;
  color: white;
  border-radius: 20px;
  width: 30%;
  height: 2.5rem;
  vertical-align: middle;
  outline: none;
}
</style>
