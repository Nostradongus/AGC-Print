<template>
  <div>
    <side-bar />
    <page-header title="Profile">
      <div class="p-8 flex">
        <div class="img-container">
          <img src="../assets/logo.png" alt="">
        </div>
        <div class="ml-6">
          <h1 class="manrope-bold
                text-5xl
                text-primary-blue" id="fullname">Full Name</h1>
          <br/>
          <h1 class="manrope-regular text-3xl text-light-gray" id="role">Client</h1>
          <router-link
          class="
            manrope-regular
            text-primary-blue
            text-xl
            inline-block
            transition
            duration-300
            ease-in-out
            text-center text-md
            hover:bg-primary-blue hover:text-white
            py-3
            px-12
            mt-20
            rounded-3xl
            bg-light-blue
          "
          to="/edit-profile"
          >Edit Profile</router-link
        >
        </div>
        
      </div>
      <div class="px-8">
        <div id="accountinformation">
          <h1 class="manrope-regular text-2xl">Account Information</h1>
          <hr class="border-3">
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Username</h1>
            <h1 class="manrope-regular text-xl" id="username">username</h1>
          </div>
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">E-mail</h1>
            <h1 class="manrope-regular text-xl" id="email">user@sample.com</h1>
          </div>
        </div>
        <div id="accountinformation">
          <h1 class="manrope-regular text-2xl">Contact Details</h1>
          <hr class="border-3">
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Contact Number</h1>
            <h1 class="manrope-regular text-xl" id="contactno">+639171111111</h1>
          </div>
        </div>     
      </div>
      
    </page-header>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
export default({
  name: 'UserProfile',
  components: {
    SideBar,
    PageHeader,
  }
})
</script>


<style>
.header {
  width: 100vw;
  height: 11rem;
}

.img-container {
  width: 15rem;
  height: 15rem;
  border-radius: 20px;
  background-color: #e7edf2;
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