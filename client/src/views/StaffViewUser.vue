<template>
  <div>
    <side-bar />
    <page-header title="View Users" @search="searchUsers">
      <p
        class="manrope-bold text-2xl text-center text-primary-blue mt-8"
        v-if="state.empty == null"
      >
        Loading data, please wait...
      </p>
      <UserCard
        v-for="user in state.allUsers"
        :key="user.username"
        :user="user"
      />
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
</style>
