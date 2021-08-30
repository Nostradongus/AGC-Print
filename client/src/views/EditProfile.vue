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
          <h1 class="manrope-bold text-2xl text-primary-blue">Account Information</h1>
          <hr class="profile-border" />
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Username</h1>
            <h1 class="manrope-regular text-xl" id="username">
              {{ state.username }}
            </h1>
          </div>
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Firstname</h1>
            <div class="flex flex-col">
              <input
                id="firstname"
                name="firstname"
                type="text"
                class="manrope-regular login-text-field"
                :placeholder="state.firstname"
                v-model="formData.firstname"
                :class="{
                  'text-field-error': state.firstnameError,
                }"
                @keyup.delete="() => (state.firstnameError = false)"
                @keypress="isLetter"
                @change="isName(formData.firstname)"
              />
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="state.firstnameError"
              >
                You've entered your current firstname
              </p>
            </div>
          </div>
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Lastname</h1>
            <div class="flex flex-col">
              <input
                id="lastname"
                name="lastname"
                type="text"
                class="manrope-regular login-text-field"
                :placeholder="state.lastname"
                v-model="formData.lastname"
                :class="{
                  'text-field-error': v.email.$error || state.lastnameError,
                }"
                @keyup.delete="() => (state.lastnameError = false)"
                @keypress="isLetter"
                @change="isName(formData.lastname)"
              />
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="state.lastnameError"
              >
                You've entered your current lastname
              </p>
            </div>
          </div>
          <div class="p-4 flex" v-if="!state.nameValidation">
            <h1 class="manrope-regular text-xl w-64" />
            <p
              class="text-red manrope-bold text-left text-sm"
            >
              First and last names must only contain letters!
            </p>
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
                :class="{
                  'text-field-error': v.email.$error || state.emailError,
                }"
                @keyup.delete="() => (state.emailError = false)"
              />
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="v.email.$error"
              >
                {{ v.email.$errors[0].$message }}
              </p>
              <p
                class="text-red manrope-bold text-left text-sm"
                v-else-if="state.emailError"
              >
                Email Already Exists!
              </p>
            </div>
          </div>
        </div>
        <div id="contactdetails">
          <h1 class="manrope-bold text-2xl text-primary-blue">Contact Details</h1>
          <hr class="profile-border" />
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
                  :class="{
                    'text-field-error':
                      v.contactNo.$error || state.contactError,
                  }"
                  @keyup.delete="() => (state.contactError = false)"
                />
              </div>
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="v.contactNo.$error"
              >
                {{ v.contactNo.$errors[0].$message }}
              </p>
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="state.contactError"
              >
                Please enter a new contact number!
              </p>
            </div>
          </div>
        </div>
        <div id="password">
          <h1 class="manrope-bold text-2xl text-primary-blue">Password</h1>
          <hr class="profile-border" />
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">New Password</h1>
            <div class="flex flex-col">
              <input
                name="password"
                type="password"
                class="manrope-regular login-text-field"
                v-model="formData.password"
                :class="{
                  'text-field-error': v.password.$error || state.passwordError,
                }"
                @keyup.delete="() => (state.passwordError = false)"
              />
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="v.password.$error"
              >
                {{ v.password.$errors[0].$message }}
              </p>
              <p
                class="text-red manrope-bold text-left text-sm"
                v-if="state.passwordError"
              >
                Please enter a new password!
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
        <div class="flex mt-6 mb-6">
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
            v-if="!state.submitted"
          >
            Save Changes
          </button>
          <p
            v-else
            class="px-6 pt-2 manrope-bold text-primary-blue text-lg text-left"
          >
            Saving changes, please wait...
          </p>
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
      firstname: store.state.user.user.firstname,
      lastname: store.state.user.user.lastname,
      contact: '',
      emailError: false,
      contactError: false,
      passwordError: false,
      firstnameError: false,
      lastnameError: false,
      nameValidation: true,
      submitted: false,
    });

    const formData = reactive({
      firstname: '',
      lastname: '',
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

    // to check if key inputted in first name and last name is a letter
    function isLetter(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      // if uppercase / lowercase letter or space
      if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32) {
        return true;
      } else {
        evt.preventDefault();
      }
    }

    // to check if first name or last name does not contain numbers and special characters
    function isName(name) {
      const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
      const numbers = "1234567890";

      // default value
      state.nameValidation = true;

      // check if name contains special characters
      for (let ctr = 0; ctr < specialChars.length && state.nameValidation; ctr++) {
        if (name.indexOf(specialChars[ctr]) > -1) {
          state.nameValidation = false;
          return false;
        }
      }

      // check if name contains numbers
      for (let ctr = 0; ctr < numbers.length && state.nameValidation; ctr++) {
        if (name.indexOf(numbers[ctr]) > -1) {
          state.nameValidation = false;
          return false;
        }
      }

      return true;
    }

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
        formData.firstname === '' &&
        formData.lastname === '' &&
        formData.email === '' &&
        formData.contactNo === '' &&
        formData.password === ''
    );

    async function updateUser() {
      const data = {
        username: state.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        contactNo: formData.contactNo,
        password: formData.password,
      };

      if (formData.contactNo !== '') {
        data.contactNo = `63${formData.contactNo}`;
      }

      try {
        const validated = await v.value.$validate();

        if (validated && passwordConfirmed.value && isName(formData.firstname) && isName(formData.lastname)) {
          // indicate that user update form has been submitted
          state.submitted = true;

          await api.patchUser(state.username, data);
          store.dispatch('updateUser', data);
          router.push(`/profile/${state.username}`);
        }
      } catch (err) {
        state.submitted = false;
        if (err.response != null) {
          console.log(err);
          const { response } = err;
          console.log(response.data);
          if (response.data.firstnameError != null) {
            state.firstnameError = response.data.firstnameError;
          }
          if (response.data.lastnameError != null) {
            state.lastnameError = response.data.lastnameError;
          }
          if (response.data.emailError != null) {
            state.emailError = response.data.emailError;
          }
          if (response.data.contactError != null) {
            state.contactError = response.data.contactError;
          }
          if (response.data.passwordError != null) {
            console.log(response.data);
            state.passwordError = response.data.passwordError;
          }
        } else {
          console.log(err);
        }
      }
      state.submitted = false;
    }

    return {
      state,
      formData,
      updateUser,
      isLetter,
      isName,
      v,
      passwordConfirmed,
      isDisabled,
    };
  },
};
</script>

<style lang="postcss">
.login-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 28rem;
  height: 2rem;
}

.profile-border {
  border-style: solid;
  @apply border-light-blue;
  border-width: 2.5px;
}
</style>
