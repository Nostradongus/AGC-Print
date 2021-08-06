<template>
  <div class="min-h-screen min-w-full">
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
    <div class="h-full relative w-5/6 float-right" id="right">
      <div class="h-24 bg-primary-blue">
        <p class="absolute manrope-extrabold text-5xl text-white ml-4 mt-8">
          My Order History
        </p>
      </div>
      <div class="p-8">
        <div
          class="
            bg-white
            mx-auto
            border-gray-500 border
            text-gray-700
            mb-0.5
            h-30
          "
        >
          <div class="flex p-3 border-l-8">
            <div class="my-auto border-r-2 pr-3">
              <span class="text-lg manrope-regular">Order #00000001</span>
            </div>
            <div class="flex-1">
              <div class="ml-3 space-y-1 border-r-2 pr-3">
                <div class="manrope-extrabold">TARPAULIN</div>
                <div class="text-md manrope-regular">
                  <span class="text-md manrope-bold">Complete name:</span>
                  Sonson Dela Cruz
                </div>
                <div class="text-md manrope-regular">
                  <span class="text-md manrope-bold"> Delivery Address:</span>
                  123 Konda Village, Narukami Island, Inazuma
                </div>
                <div class="text-md manrope-regular">
                  <span class="text-md manrope-bold">Date Ordered:</span>
                  January 1, 2021
                </div>
              </div>
            </div>
            <div>
              <div class="ml-3 my-8 p-1 w-20 mr-12">
                <div class="text-md manrope-bold text-center">Status</div>
              </div>
            </div>
            <div>
              <a href="/order-details">
                <button
                  class="
                    text-primary-blue
                    manrope-regular
                    rounded-sm
                    my-10
                    mr-4
                    ml-2
                    focus:outline-none
                    bg-gray-500
                  "
                >
                  View Details >
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
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
