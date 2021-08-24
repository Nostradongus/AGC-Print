<template>
  <div class="min-h-screen bg-primary-blue flex">
    <div class="register-rectangle relative m-auto mt-8 mb-8">
      <p class="manrope-regular text-3xl text-center mt-10">
        Create an Account
      </p>
      <div class="text-center">
        <div class="flex flex-wrap justify-evenly mt-12">
          <div class="relative">
            <input
              id="firstname"
              name="firstname"
              type="text"
              class="manrope-regular name-text-field"
              v-model="state.firstname"
              :class="{ 'text-field-error': v.firstname.$error }"
            />
            <label
              for="firstname"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >First Name</label
            >
            <p
              v-if="v.firstname.$error"
              class="text-red manrope-bold text-left text-sm"
            >
              {{ v.firstname.$errors[0].$message }}
            </p>
            <p v-else class="text-red manrope-bold text-left text-sm invisible">
              placeholder
            </p>
          </div>
          <div class="relative">
            <input
              id="lastname"
              name="lastname"
              type="text"
              class="manrope-regular name-text-field"
              v-model="state.lastname"
              :class="{ 'text-field-error': v.lastname.$error }"
            />
            <label
              for="lastname"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Last Name</label
            >
            <p
              class="text-red manrope-bold text-left text-sm"
              v-if="v.lastname.$error"
            >
              {{ v.lastname.$errors[0].$message }}
            </p>
            <p v-else class="text-red manrope-bold text-left text-sm invisible">
              placeholder
            </p>
          </div>
        </div>

        <div class="relative mt-6">
          <input
            id="username"
            name="username"
            type="text"
            class="manrope-regular login-text-field"
            v-model="state.username"
            :class="{
              'text-field-error': v.username.$error,
            }"
          />
          <label
            for="email"
            class="
              absolute
              manrope-regular
              left-14
              -top-3.5
              text-gray-600 text-md
            "
            >Username</label
          >
          <p
            class="text-red manrope-bold text-left ml-14 text-sm"
            v-if="v.username.$error"
          >
            {{ v.username.$errors[0].$message }}
          </p>
          <div v-else-if="state.error">
            <p
              class="text-red manrope-bold text-left ml-14 text-sm"
              v-if="state.error.usernameError"
            >
              {{ state.error.error }}
            </p>
          </div>
          <p
            v-else
            class="text-red manrope-bold text-left ml-14 text-sm invisible"
          >
            placeholder
          </p>
        </div>
        <div class="relative mt-6">
          <input
            id="email"
            name="email"
            type="text"
            class="manrope-regular login-text-field"
            v-model="state.email"
            :class="{ 'text-field-error': v.email.$error }"
          />
          <label
            for="email"
            class="
              absolute
              manrope-regular
              left-14
              -top-3.5
              text-gray-600 text-md
            "
            >E-mail</label
          >
          <p
            class="text-red manrope-bold text-left ml-14 text-sm"
            v-if="v.email.$error"
          >
            {{ v.email.$errors[0].$message }}
          </p>
          <div v-else-if="state.error">
            <p
              class="text-red manrope-bold text-left ml-14 text-sm"
              v-if="state.error.emailError"
            >
              {{ state.error.error }}
            </p>
          </div>
          <p
            v-else
            class="text-red manrope-bold text-left ml-14 text-sm invisible"
          >
            placeholder
          </p>
        </div>
        <div class="relative mt-6">
          <div class="flex flex-row items-center justify-center">
            <p class="absolute left-14 text-lg manrope-regular">+63</p>
            <input
              id="contactno"
              name="contactNo"
              type="number"
              class="manrope-regular login-text-field pl-10 text-md"
              v-model="state.contactNo"
              :class="{ 'text-field-error': v.contactNo.$error }"
            />
          </div>

          <label
            for="contactNo"
            class="
              absolute
              manrope-regular
              left-14
              -top-3.5
              text-gray-600 text-md
            "
            >Contact No.</label
          >
          <p
            class="text-red manrope-bold text-left ml-14 text-sm"
            v-if="v.contactNo.$error"
          >
            {{ v.contactNo.$errors[0].$message }}
          </p>
          <div v-else-if="state.error">
            <p
              class="text-red manrope-bold text-left ml-14 text-sm"
              v-if="state.error.contactNoError"
            >
              {{ state.error.error }}
            </p>
          </div>
          <p
            v-else
            class="text-red manrope-bold text-left ml-14 text-sm invisible"
          >
            placeholder
          </p>
        </div>
        <div class="relative mt-6">
          <input
            id="password"
            name="password"
            type="password"
            class="manrope-regular login-text-field"
            v-model="state.password"
            :class="{ 'text-field-error': v.password.$error }"
          />
          <label
            for="password"
            class="
              absolute
              manrope-regular
              left-14
              -top-3.5
              text-gray-600 text-md
            "
            >Password</label
          >
          <p
            class="text-red manrope-bold text-left ml-14 text-sm"
            v-if="v.password.$error"
          >
            {{ v.password.$errors[0].$message }}
          </p>
          <p
            v-else
            class="text-light-gray manrope-bold text-left ml-14 text-sm"
          >
            Password should contain at least 8 characters
          </p>
        </div>
        <div class="relative mt-6">
          <input
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            class="manrope-regular login-text-field"
            v-model="state.confirmPassword"
            :class="{ 'text-field-error': v.confirmPassword.$error }"
          />
          <label
            for="confirmpassword"
            class="
              absolute
              manrope-regular
              left-14
              -top-3.5
              text-gray-600 text-md
            "
            >Confirm Password</label
          >
          <p
            class="text-red manrope-bold text-left ml-14 text-sm"
            v-if="!passwordConfirmed"
          >
            Passwords don't match
          </p>
          <p
            v-else-if="v.confirmPassword.$error"
            class="text-red manrope-bold text-left ml-14 text-sm"
          >
            {{ v.confirmPassword.$errors[0].$message }}
          </p>
        </div>
        <button
          type="submit"
          class="manrope-bold login-btn mt-6"
          id="login-btn"
          @click="registerUser"
        >
          Sign Up
        </button>
      </div>
      <router-link class="manrope-bold text-primary-blue" to="/">
        <span class="absolute bottom-10 right-16">Sign in instead</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  required,
  numeric,
  email,
  minLength,
  maxLength,
  sameAs,
} from '@vuelidate/validators';
import * as api from '../api';
export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      contactNo: '',
      password: '',
      confirmPassword: '',
      error: null,
    });

    const rules = {
      firstname: { required },
      lastname: { required },
      username: { required },
      email: { required, email },
      contactNo: { required, numeric, minLength: minLength(9), maxLength: maxLength(10) },
      password: { required, minLength: minLength(8) },
      confirmPassword: { required },
    };

    const v = useVuelidate(rules, state);

    const passwordConfirmed = computed(
      () => state.password === state.confirmPassword
    );

    async function registerUser() {
      const data = {
        firstname: state.firstname,
        lastname: state.lastname,
        username: state.username,
        email: state.email,
        contactNo: `63${state.contactNo}`,
        password: state.password,
        confirmPassword: state.confirmPassword,
      };
      try {
        const validated = await v.value.$validate();
        console.log(v.value);

        if (validated && passwordConfirmed.value) {
          await api.signUp(data);
          const loginData = {
            username: state.username,
            password: state.password,
          };
          const result = await api.signIn(loginData);
          store.dispatch('loginUser', result.data);
          router.push({ name: 'MyOrders' });
        }
      } catch (err) {
        console.log(err.response.data);
        state.error = err.response.data;
      }
    }

    return { state, registerUser, v, passwordConfirmed };
  },
};
</script>

<style>
/* Hide arrow buttons in number input type */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.register-rectangle {
  width: 35rem;
  height: 48rem;

  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.25);
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

.login-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 28rem;
  height: 2.5rem;
}

.name-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 12rem;
  height: 3rem;
}

.text-field-error {
  border-bottom-color: red;
}

.login-btn {
  background-color: #0f4c81;
  color: white;
  border-radius: 1.5rem;
  width: 28rem;
  height: 3rem;
}
</style>
