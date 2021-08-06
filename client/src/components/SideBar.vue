<template>
  <div class="bg-light-blue h-full w-1/6 fixed text-center" id="sidebar">
    <img class="h-36 w-36 m-auto mt-4" src="../assets/logo.png" alt="logo" />
    <ul class="text-center mt-4" role="listbox">
      <li>
        <a
          href="/order"
          class="
            sidebar-btn
            text-primary-blue
            transition
            duration-300
            ease-in-out
            bg-light-blue
            hover:bg-link-water
            inline-flex
            items-center
            px-6
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 mr-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="manrope-extrabold text-2xl">Order</span>
        </a>
      </li>
      <li>
        <a
          href="/order-history"
          class="
            sidebar-btn
            text-primary-blue
            transition
            duration-300
            ease-in-out
            bg-light-blue
            hover:bg-link-water
            inline-flex
            items-center
            px-6
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 mr-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="manrope-extrabold text-2xl">History</span>
        </a>
      </li>
      <li>
        <a
          href=""
          class="
            sidebar-btn
            text-primary-blue
            transition
            duration-300
            ease-in-out
            bg-light-blue
            hover:bg-link-water
            inline-flex
            items-center
            px-6
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 mr-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="manrope-extrabold text-2xl">Profile</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>

<style></style>
