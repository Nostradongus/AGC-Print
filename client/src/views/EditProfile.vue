<template>
    <div>
    <side-bar />
    <page-header title="Edit Profile">
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
            <input
              id="email"
              name="email"
              type="email"
              value=""
              class="manrope-regular login-text-field"
            />
          </div>
        </div>
        <div id="contactdetails">
          <h1 class="manrope-regular text-2xl">Contact Details</h1>
          <hr class="border-3">
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Contact Number</h1>
            <div class="flex flex-row items-center justify-center">
                <p class="absolute left-72 ml-4 text-lg manrope-regular">+63</p>
                <input
                id="contactno"
                name="contactno"
                type="number"
                class="manrope-regular login-text-field pl-10 text-md"
                />
          </div>
          </div>
        </div> 
        <div id="password">
          <h1 class="manrope-regular text-2xl">Password</h1>
          <hr class="border-3">
          <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">New Password</h1>
            <div class="flex flex-row items-center justify-center">
                <input
                    id="password"
                    name="password"
                    type="password"
                    class="manrope-regular login-text-field"
                />
            </div>
        </div>
        <div class="p-4 flex">
            <h1 class="manrope-regular text-xl w-64">Confirm Password</h1>
            <div class="flex flex-row items-center justify-center">
                <input
                    id="password"
                    name="password"
                    type="password"
                    class="manrope-regular login-text-field"
                />
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
            to="/profile"
            >Cancel</router-link
          >     
          <router-link
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
            to="/profile"
            >Save Changes</router-link
          >     
        </div>
          
      </div>
        </page-header>
    </div>
    

</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
export default({
    name: 'EditProfile',
    components: {
        SideBar,
        PageHeader,
    }   
})
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
