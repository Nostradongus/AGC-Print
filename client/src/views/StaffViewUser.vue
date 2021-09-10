<template>
  <div>
    <side-bar />
    <page-header title="View Users">
      <div class="grid justify-start mx-8 my-8 content-end">
        <input
          type="text"
          class="h-10 lg:w-96 md:w-80 border search"
          placeholder="Search"
          v-model.trim="state.search"
          v-on:keyup="searchUsers(state.search)"
        />
      </div>

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
      search: null,
    });

    async function getInitUsers() {
      try {
        const res = await api.getUsers();
        state.users = state.allUsers = res.data;
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
