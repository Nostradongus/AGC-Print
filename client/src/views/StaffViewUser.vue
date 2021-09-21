<template>
  <div>
    <side-bar />
    <page-header title="Users">
      <div
        v-if="state.empty != null && !state.empty"
        class="flex flex-row justify-start mx-8 my-8 content-end"
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
          Search User:
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
          v-on:keyup="searchUsers(state.search)"
        />
      </div>

      <p
        class="manrope-bold text-2xl text-center text-primary-blue mt-8"
        v-if="state.empty == null"
      >
        Loading data, please wait...
      </p>

      <p
        class="manrope-bold left-0 -top-3.5 text-xl pt-6 px-8 text-red"
        v-if="state.empty != null && state.empty"
      >
        There are no users yet.
      </p>

      <p
        class="manrope-bold left-0 -top-3.5 text-xl pt-3 px-8 text-red"
        v-if="
          state.allUsers != null &&
          !state.allUsers.length &&
          state.search !== ''
        "
      >
        No users with "{{ state.search }}" username.
      </p>

      <div class="max-h-screen overflow-y-scroll scrollbar-hidden mb-5">
        <UserCard
          v-for="user in state.allUsers"
          :key="user.username"
          :user="user"
        />
      </div>
    </page-header>
  </div>
</template>

<script>
import { reactive, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import UserCard from '../components/UserCard.vue';
import * as api from '../api';

export default {
  name: 'StaffViewOrder',
  components: {
    SideBar,
    PageHeader,
    UserCard,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      users: null,
      allUsers: null,
      empty: null,
      search: null,
    });

    async function getInitUsers() {
      try {
        const res = await api.getUsers();
        state.users = state.allUsers = res.data;
        if (state.users.length === 0) {
          state.empty = true;
          state.users = null;
        } else {
          state.empty = false;
        }
      } catch (err) {
        state.empty = true;
        console.log(err);
      }
    }

    function searchUsers(search) {
      state.allUsers = computed(() => {
        return state.users.filter((user) => {
          return user.username.match(search);
        });
      });
    }

    onBeforeMount(() => {
      if (store.state.worker.worker != null) {
        getInitUsers();
      }
    });

    return { state, searchUsers };
  },
};
</script>

<style>
.header {
  width: 100vw;
  height: 11rem;
}

.sidebar-btn {
  width: 80%;
  height: 5rem;
  border-radius: 20px;
}

.content-box {
  display: flex;
  flex-flow: row wrap;
}

.dropdown-field {
  border: 0px;
  outline: 0px;
  width: 28rem;
  height: 3rem;
}

.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  height: 3rem;
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

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
</style>
