<template>
  <div>
    <side-bar />
    <page-header title="Schedule Delivery">
      <p
        class="manrope-bold text-2xl text-center text-primary-blue mt-8"
        v-if="!state.order"
      >
        Loading data, please wait...
      </p>

      <!-- Order Details -->
      <div
        class="
          bg-light-blue
          text-lg
          manrope-regular
          rounded-xl
          p-6
          m-8
          h-30
          grid grid-cols-2
        "
        v-if="state.order"
      >
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Order Set #:</h3>
            <p>{{ state.order.id }}</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Total Project Cost:</h3>
            <p v-if="state.order.price === -1">Pending Price</p>
            <p v-else>₱ {{ state.order.price }}</p>
          </div>
        </div>
        <div>
          <div class="mb-2">
            <h3 class="manrope-bold">Status:</h3>
            <p>{{ state.order.status }}</p>
          </div>
          <div class="mb-2">
            <h3 class="manrope-bold">Delivery Address:</h3>
            <p>{{ state.order.address }}</p>
          </div>
        </div>
      </div>
      <!-- Report Form -->
      <p v-if="state.order" class="text-red manrope-bold text-center text-md">
        You can only set the schedule for delivery once, make sure the set date is final.
      </p>
      <form v-if="state.order" @submit.prevent="submitSchedule" class="flex flex-col m-8">
        <div class="flex flex-row mb-2 items-center">
          <h3 class="w-1/3 text-center manrope-bold">Date of Delivery</h3>
          <input 
            v-model="scheduleData.date" 
            @change="validateDate"
            class="w-full lg:w-1/2 manrope-bold" 
            :class="{ 'border-red': v.date.$error || !state.dateValidation }"
            type="date" 
            :min="state.currDate" />
        </div>
        <div class="flex flex-row mb-8 items-center">
          <div class="w-1/3" />
          <p
            v-if="v.date.$error"
            class="text-red manrope-bold text-left text-sm"
          >
            Please input desired date of delivery.
          </p>
          <p
            v-if="!state.dateValidation"
            class="text-red manrope-bold text-left text-sm"
          >
            Invalid date! Please input a correct date.
          </p>
        </div>
        <div class="flex flex-row mb-2 items-center">
          <h3 class="w-1/3 text-center manrope-bold">Time of Delivery</h3>
          <input 
            v-model="scheduleData.time"
            class="w-full lg:w-1/2 manrope-bold" 
            :class="{ 'border-red': v.time.$error || !state.timeValidation }"
            type="time" />
        </div>
        <div class="flex flex-row mb-8 items-center">
          <div class="w-1/3" />
          <p
            v-if="v.time.$error"
            class="text-red manrope-bold text-left text-sm"
          >
            Please input estimated time of delivery.
          </p>
          <p
            v-if="!state.timeValidation"
            class="text-red manrope-bold text-left text-sm"
          >
            Invalid time! Must be one hour after today's current time.
          </p>
        </div>
        <div class="flex flex-row mb-3">
          <h3 class="w-1/3 text-center manrope-bold">Remarks</h3>
          <textarea
            id="remarks"
            name="remarks"
            v-model="scheduleData.remarks"
            class="w-full lg:w-1/2 manrope-regular input-text-field h-64"
            placeholder="Notes to consider regarding the delivery (optional)"
          />
        </div>
        <div class="flex justify-end lg:mr-48">
          <div class="flex-1">
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
                mb-2
                mt-8
                mx-32
                rounded-xl
                bg-primary-blue
                p-3
              "
              :to="`/order-details/${route.params.id}`"
              >Back</router-link
            >
          </div>
          <button
            class="
              manrope-regular
              text-white
              transition
              duration-300
              ease-in-out
              text-center text-lg
              hover:bg-link-water hover:text-primary-blue
              mb-2
              mt-8
              rounded-xl
              bg-primary-blue
              p-3
              absolute
            "
            v-if="!state.submitted"
          >
            Confirm Schedule
          </button>
          <p
            v-else
            class="mt-11 mb-2 manrope-bold text-primary-blue text-lg text-right"
          >
            Setting schedule, please wait...
          </p>
        </div>
      </form>
    </page-header>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import SideBar from '../components/SideBar.vue';
import { ref, reactive, onMounted } from 'vue';
import * as api from '../api';
import { useRoute, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  name: 'DeliverySchedule',
  components: { SideBar, PageHeader },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      currDate: null,
      order: null,
      dateValidation: true,
      timeValidation: true,
      submitted: false,
    });

    // schedule delivery data object
    const scheduleData = reactive({
      date: null,
      time: null,
      remarks: '',
    });

    // initialize validation rules for date and time inputs
    const rules = {
      date: { required },
      time: { required },
    };

    const v = useVuelidate(rules, scheduleData);

    // to initialize current date today 
    function initCurrentDate() {
      // get today's date for date input start value 
      const today = new Date();

      // initialize current date today
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate() + 1; // starting day should be tomorrow
      // format month and day if needed
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }

      // set current date
      state.currDate = `${year}-${month}-${day}`;
    }

    // to validate date inputted
    function validateDate() {
      // get date values from current date and inputted date
      const currDate = state.currDate.split("-");
      const inputDate = scheduleData.date.split("-");

      // temporary set date validation value to true
      state.dateValidation = true;

      // check year first, year inputted should not be less than the current year
      if (parseInt(inputDate[0]) < parseInt(currDate[0]) || inputDate[0].length !== 4) {
        state.dateValidation = false;
      } else if (parseInt(inputDate[0]) === parseInt(currDate[0])) {
        // check month afterwards, month inputted should not be less than the current month
        if (parseInt(inputDate[1]) < parseInt(currDate[1])) {
          state.dateValidation = false;
        }
        // check day afterwards, day inputted should be tomorrow after the current day or so on
        else if (parseInt(inputDate[1]) === parseInt(currDate[1]) && parseInt(inputDate[2]) + 1 <= parseInt(currDate[2])) {
          state.dateValidation = false;
        }
      }
    }

    // to validate time inputted
    function validateTime() {
      // check first if date inputted is the date today
      if (scheduleData.date === state.currDate && scheduleData.time != null) {
        // get hour inputted
        const setHour = parseInt(scheduleData.time.split(":")[0]);

        // get current hour
        const hour = new Date().getHours();

        // time inputted must be one hour after the current time
        state.timeValidation = !(parseInt(setHour) <= hour);
      } else {
        // time is valid since inputted date is not today
        state.timeValidation = true;
      }
    }

    async function getOrderDetails() {
      try {
        const res = await api.getOrderSet(route.params.id);
        state.order = res.data;
      } catch (err) {
        console.log(err);
      }
    }
    
    onMounted(() => {
      initCurrentDate();
      getOrderDetails();
    });

    async function submitSchedule() {
      // get field validation results
      const validated = await v.value.$validate();

      if (validated && state.timeValidation) {
        // indicate that schedule delivery form has been submitted
        state.submitted = true; 

        // create schedule delivery object
        const delivery = {
          date: scheduleData.date,
          time: scheduleData.time, 
        };

        // if user has remarks for the delivery
        if (scheduleData.remarks.length !== 0) {
          delivery['remarks'] = scheduleData.remarks;
        }

        // schedule delivery for order set
        const res = await api.setDelivery(route.params.id, delivery);

        // reset submission indicator
        state.submitted = false;
        
        // if database query successful
        if (res.status === 204) {
          // go back to order details page afterwards
          router.push({ path: `/order-details/${route.params.id}` });
        }
      }
    }

    return { state, route, v, scheduleData, validateDate, validateTime, submitSchedule };
  },
};
</script>

<style></style>
