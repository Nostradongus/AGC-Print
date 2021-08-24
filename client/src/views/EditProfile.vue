<template>
  <div>
    <side-bar />
    <page-header title="Edit Profile">
      <div class="p-8 flex">
        <div class="img-container">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="ml-6">
          <h1 class="manrope-bold text-5xl text-primary-blue" id="fullname">
            {{ state.name }}
          </h1>
          <br />
          <h1 class="manrope-regular text-3xl text-light-gray" id="role">
            Client
          </h1>
        </div>
      </div>
      <form @submit.prevent="updateUser" class="px-8">
        <div id="accountinformation">
          <h1 class="manrope-regular text-2xl">Account Information</h1>
          <hr class="border-3" />
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Username</h1>
            <h1 class="manrope-regular text-xl" id="username">
              {{ state.username }}
            </h1>
          </div>
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">E-mail</h1>
            <div class="flex flex-col">
              <input
                id="email"
                name="email"
                type="email"
                class="manrope-regular login-text-field"
                :placeholder="state.email"
                v-model="formData.email"
                :class="{ 'text-field-error': v.email.$error }"
              />
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="v.email.$error"
              >
                {{ v.email.$errors[0].$message }}
              </p>
            </div>
          </div>
        </div>
        <div id="contactdetails">
          <h1 class="manrope-regular text-2xl">Contact Details</h1>
          <hr class="border-3" />
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Contact Number</h1>
            <div class="flex flex-col">
              <div>
                <p class="absolute left-72 ml-4 text-lg manrope-regular">+63</p>
                <input
                  id="contactno"
                  name="contactno"
                  type="number"
                  class="manrope-regular login-text-field pl-10 text-md"
                  :placeholder="state.contact"
                  v-model="formData.contactNo"
                  :class="{ 'text-field-error': v.contactNo.$error }"
                />
              </div>
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="v.contactNo.$error"
              >
                {{ v.contactNo.$errors[0].$message }}
              </p>
            </div>
          </div>
        </div>
        <div id="password">
          <h1 class="manrope-regular text-2xl">Password</h1>
          <hr class="border-3" />
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">New Password</h1>
            <div class="flex flex-col">
              <input
                name="password"
                type="password"
                class="manrope-regular login-text-field"
                v-model="formData.password"
                :class="{ 'text-field-error': v.password.$error }"
              />
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="v.password.$error"
              >
                {{ v.password.$errors[0].$message }}
              </p>
            </div>
          </div>
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Confirm Password</h1>
            <div class="flex flex-col">
              <input
                name="password"
                type="password"
                class="manrope-regular login-text-field"
                v-model="formData.confirmPassword"
                :class="{ 'text-field-error': !passwordConfirmed }"
              />
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="!passwordConfirmed"
              >
                Passwords don't match
              </p>
            </div>
          </div>
        </div>
        <div class="flex mt-6">
          <router-link
            class="
              manrope-regular
              text-primary-blue
              inline-block
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-dark-red hover:text-white
              py-2
              px-8
              rounded-xl
              bg-light-blue
            "
            :to="`/profile/${state.username}`"
            >Cancel</router-link
          >
          <button
            class="
              ml-6
              manrope-regular
              text-white
              inline-block
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-link-water hover:text-primary-blue
              py-2
              px-8
              rounded-xl
              bg-primary-blue
            "
            :disabled="isDisabled"
          >
            Save Changes
          </button>
        </div>
      </form>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { email, minLength, maxLength, numeric } from '@vuelidate/validators';

export default {
  name: 'EditProfile',
  components: {
    SideBar,
    PageHeader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      username: store.state.user.user.username,
      email: store.state.user.user.email,
      name: `${store.state.user.user.firstname} ${store.state.user.user.lastname}`,
      contact: '',
    });

    const formData = reactive({
      email: '',
      contactNo: '',
      password: '',
      confirmPassword: '',
    });

    const rules = {
      email: { email },
      contactNo: { numeric, minLength: minLength(9), maxLength: maxLength(10) },
      password: { minLength: minLength(8) },
    };

    const v = useVuelidate(rules, formData);

    onMounted(() => {
      getContactNumber();
    });

    async function getContactNumber() {
      try {
        const result = await api.getUser(state.username);
        state.contact = result.data.contactNo.slice(2);
      } catch (err) {
        console.log(err);
      }
    }

    const passwordConfirmed = computed(
      () => formData.password === formData.confirmPassword
    );

    const isDisabled = computed(
      () =>
        formData.email === '' &&
        formData.contactNo === '' &&
        formData.password === ''
    );

    async function updateUser() {
      const data = {
        email: formData.email,
        contactNo: formData.contactNo,
        password: formData.password,
      };

      if (formData.contactNo !== '') {
        data.contactNo = `63${formData.contactNo}`;
      }

      try {
        const validated = await v.value.$validate();

        if (validated && passwordConfirmed.value) {
          await api.patchUser(state.username, data);
          store.dispatch('updateUser', data);
          router.push(`/profile/${state.username}`);
        }
      } catch (err) {
        console.log(err);
      }
    }

    return { state, formData, updateUser, v, passwordConfirmed, isDisabled };
  },
};
</script>

<style>
.login-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 28rem;
  height: 2rem;
}
</style>
