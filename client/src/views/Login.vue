<template>
  <div class="min-h-screen bg-primary-blue flex">
    <div class="login-rectangle relative m-auto">
      <img class="w-40 h-40 m-auto mt-8" src="../assets/logo.png" />
      <p class="manrope-regular text-3xl text-center mt-2 mb-4">
        Sign in to your account
      </p>
      <p
        class="manrope-bold error-msg-field text-center mb-8 invisible"
        id="error-msg"
      >
        Invalid username or password
      </p>
      <div class="text-center">
        <form href="/order">
          <div class="relative">
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
          </div>
          <div class="relative mt-12">
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
          </div>
          <input
            class="manrope-bold login-btn mt-10"
            type="submit"
            value="Sign in"
            id="login-btn"
          />
        </form>
      </div>
      <a class="manrope-bold text-primary-blue" href="/register">
        <span class="absolute bottom-20 right-16">Don't have an account?</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap');

.login-rectangle {
  width: 35rem;
  height: 42rem;

  background: #ffffff;
  border: 2px solid #c4c4c4;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
}

.error-msg-field {
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: red;
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
  height: 3rem;
}

.login-btn {
  background-color: #0f4c81;
  color: white;
  border-radius: 20px;
  width: 28rem;
  height: 3rem;
}
</style>