<template>
  <div>
    <side-bar />
    <page-header title="Delivery Information">
      <div class="p-8 mt-8">
        <form>
          <div class="relative">
            <input
              id="completename"
              name="completename"
              type="text"
              class="manrope-regular input-text-field"
              :class="{ 'border-red': v.name.$error }"
              v-model="state.name"
              @keypress="isLetter"
              @change="isName(state.name)"
            />
            <label
              for="completename"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Complete Name</label
            >
            <p
              class="text-red manrope-bold text-left text-sm"
              v-if="v.name.$error"
            >
              {{ v.name.$errors[0].$message }}
            </p>
            <p
              class="text-red manrope-bold text-left text-sm"
              v-if="!state.nameValidation"
            >
              Complete name must only contain letters!
            </p>
          </div>
          <div class="relative mt-12">
            <input
              id="email"
              name="email"
              type="text"
              class="manrope-regular input-text-field"
              :class="{ 'border-red': v.email.$error }"
              v-model.trim="state.email"
            />
            <label
              for="email"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >E-mail Address</label
            >
            <p
              class="text-red manrope-bold text-left text-sm"
              v-if="v.email.$error"
            >
              {{ v.email.$errors[0].$message }}
            </p>
          </div>
          <div class="relative mt-12">
            <div class="flex flex-row items-center">
              <p class="absolute text-md text-gray-600">+63</p>
              <input
                id="contactno"
                name="contactno"
                type="text"
                class="manrope-regular input-text-field pl-10 pt-0.5 text-md"
                :class="{ 'border-red': v.contactNo.$error }"
                v-model.trim="state.contactNo"
              />
            </div>
            <label
              for="contactno"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Contact Number</label
            >
            <p
              class="text-red manrope-bold text-left text-sm"
              v-if="v.contactNo.$error"
            >
              {{ v.contactNo.$errors[0].$message }}
            </p>
          </div>
          <div class="relative mt-12">
            <input
              id="billingaddress"
              name="billingaddress"
              type="text"
              class="manrope-regular input-text-field"
              :class="{ 'border-red': v.address.$error }"
              v-model="state.address"
            />
            <label
              for="billingaddress"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Delivery Address</label
            >
            <p
              class="text-red manrope-bold text-left text-sm"
              v-if="v.address.$error"
            >
              {{ v.address.$errors[0].$message }}
            </p>
          </div>
          <label
            for="next-btn"
            class="
              manrope-regular
              text-white
              inline-block
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-light-blue hover:text-primary-blue
              w-32
              mt-12
              rounded-xl
              bg-primary-blue
              p-3
            "
            v-if="!state.submitted"
          >
            <button @click="confirmOrdersFromCart">Place Order</button>
          </label>

          <p
            v-else
            class="mb-8 mt-14 px-2 manrope-bold text-primary-blue text-lg text-left"
          >
            Submitting details, please wait...
          </p>
        </form>
      </div>
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import {
  required,
  numeric,
  email,
  minLength,
  maxLength,
} from '@vuelidate/validators';
import * as api from '../api';

export default {
  name: 'DeliveryInformation',
  components: {
    SideBar,
    PageHeader,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      name: '',
      email: '',
      contactNo: '',
      address: '',
      nameValidation: true,
      submitted: false,
    });

    const rules = {
      name: { required },
      email: { required, email },
      contactNo: {
        required,
        numeric,
        minLength: minLength(9),
        maxLength: maxLength(10),
      },
      address: { required },
    };

    const v = useVuelidate(rules, state);

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

    async function confirmOrdersFromCart(e) {
      e.preventDefault();
      const validated = await v.value.$validate();

      if (validated && isName(state.name)) {
        // indicate that the delivery information form was submitted
        state.submitted = true;

        // get delivery information data together with the orders made
        const data = {
          orders: JSON.parse(localStorage.getItem('order')),
          name: state.name,
          email: state.email,
          contactNo: `63${state.contactNo}`,
          address: state.address,
        };

        // confirm and add orders to the database
        const res = await api.addOrderSet(data);

        store.dispatch('setOrderConfirmed', res.data);

        // go to order details page
        router.push({ name: 'OrderConfirmed' });

        // reset field
        state.submitted = false;

        // send email to client
        await api.sendEmailOrderPlaced(res.data.id, data.name, data.email);
      }
    }

    return { state, confirmOrdersFromCart, isLetter, isName, v };
  },
};
</script>

<style>
.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 48rem;
  height: 3rem;
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
</style>
