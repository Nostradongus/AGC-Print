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
                  v-model.trim="staffData.lastname"
                  :placeholder="props.worker.lastname"
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
                    v-model.trim="staffData.contactNo"
                    :placeholder="contactNo"
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
                  v-model.trim="staffData.password"
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
                  v-model="staffData.confirmPassword"
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
      staffData.firstname = null;
      staffData.lastname = null;
      staffData.email = null;
      staffData.contactNo = null;
      staffData.password = null;
      staffData.confirmPassword = null;
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
        // const update = {};
        // if (staffData.firstname) {
        //   update['firstname'] = staffData.firstname;
        // }
        // if (staffData.lastname) {
        //   update['lastname'] = staffData.lastname;
        // }
        // if (staffData.email) {
        //   update['email'] = staffData.email;
        // }
        // if (staffData.contactNo) {
        //   update['contactNo'] = staffData.contactNo;
        // }
        // if (staffData.password) {
        //   update['password'] = staffData.password;
        // }
        // if (staffData.confirmPassword) {
        //   update['confirmPassword'] = staffData.confirmPassword;
        // }
        if (staffData.contactNo) {
          staffData.contactNo = `63${staffData.contactNo}`;
        }
        emit('updateWorker', staffData);
        toggleEditStaffModal();
      } catch (err) {
        console.log(err.response);
      }
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
