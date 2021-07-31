<template>
  <div class="min-h-screen bg-primary-blue flex">
    <div class="register-rectangle relative m-auto">
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
          </div>
          <div class="relative">
            <input
              id="lastname"
              name="lastname"
              type="text"
              class="manrope-regular name-text-field"
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
          </div>
        </div>
        <div class="flex flex-wrap justify-evenly">
          <p class="text-red manrope-bold invisible text-sm">Error message</p>
          <p class="text-red manrope-bold invisible text-sm">Error message</p>
        </div>

        <div class="relative mt-6">
          <input
            id="username"
            name="username"
            type="text"
            class="manrope-regular login-text-field"
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
          <p class="text-red manrope-bold text-left ml-14 invisible text-sm">
            Error message
          </p>
        </div>
        <div class="relative mt-6">
          <input
            id="email"
            name="email"
            type="text"
            class="manrope-regular login-text-field"
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
          <p class="text-red manrope-bold text-left ml-14 invisible text-sm">
            Error message
          </p>
        </div>
        <div class="relative mt-6">
          <input
            id="contactno"
            name="contactno"
            type="text"
            class="manrope-regular login-text-field"
          />
          <label
            for="contactno"
            class="
              absolute
              manrope-regular
              left-14
              -top-3.5
              text-gray-600 text-md
            "
            >Contact No.</label
          >
          <p class="text-red manrope-bold text-left ml-14 invisible text-sm">
            Error message
          </p>
        </div>
        <div class="relative mt-6">
          <input
            id="password"
            name="password"
            type="password"
            class="manrope-regular login-text-field"
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
          <p class="text-red manrope-bold text-left ml-14 invisible text-sm">
            Error message
          </p>
        </div>
        <div class="relative mt-6">
          <input
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            class="manrope-regular login-text-field"
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
          <p class="text-red manrope-bold text-left ml-14 invisible text-sm">
            Error message
          </p>
        </div>
        <input
          class="manrope-bold login-btn mt-6"
          type="submit"
          value="Sign Up"
          id="login-btn"
        />
      </div>
      <a class="manrope-bold text-primary-blue" href="/">
        <span class="absolute bottom-10 right-16">Sign in instead</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
};
</script>

<style>
.register-rectangle {
  width: 35rem;
  height: 48rem;

  background: #ffffff;
  border: 2px solid #c4c4c4;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
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

.login-btn {
  background-color: #0f4c81;
  color: white;
  border-radius: 1.5rem;
  width: 28rem;
  height: 3rem;
}
</style>