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
          Create an Order
        </p>
      </div>
      <div class="p-8 mt-8">
        <label for="product" class="manrope-regular text-xl mr-4 mt-2"
          >Choose a product:</label
        >
        <select name="product" id="product" class="dropdown-field">
          <option value="placeholder" disabled selected hidden>
            Select one
          </option>
          <option value="tarpaulin">Tarpaulin</option>
          <option value="wallpaper">Wallpaper</option>
          <option value="canvasprint">Canvas Print</option>
          <option value="sticker">Sticker</option>
        </select>

        <form class="mt-12 hidden" id="tarpaulin-form">
          <div class="relative">
            <input
              id="quantity"
              name="quantity"
              type="number"
              class="manrope-regular input-text-field w-48"
              min="1"
            />
            <label
              for="quantity"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Quantity</label
            >
          </div>
          <div class="flex">
            <div class="relative mt-12">
              <input
                id="width"
                name="width"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="width"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Width (in inches)</label
              >
            </div>
            <div class="relative mt-12 ml-4">
              <input
                id="height"
                name="height"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="height"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Height (in inches)</label
              >
            </div>
          </div>
          <div class="relative mt-12">
            <input
              id="numeyelets"
              name="numeyelets"
              type="number"
              class="manrope-regular input-text-field w-48"
              min="0"
            />
            <label
              for="numeyelets"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Number of Eyelets (0 if none)</label
            >
          </div>
          <div class="relative mt-20">
            <input
              id="file"
              name="file"
              type="file"
              class="manrope-regular w-72"
              min="0"
            />
            <label
              for="file"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >File Upload</label
            >
          </div>
          <input class="hidden" type="submit" id="next-btn" />
        </form>

        <form class="mt-12 hidden" id="wallpaper-form">
          <div class="relative">
            <input
              id="quantity"
              name="quantity"
              type="number"
              class="manrope-regular input-text-field w-48"
              min="1"
            />
            <label
              for="quantity"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Quantity</label
            >
          </div>
          <div class="flex">
            <div class="relative mt-12">
              <input
                id="width"
                name="width"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="width"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Width (in inches)</label
              >
            </div>
            <div class="relative mt-12 ml-4">
              <input
                id="height"
                name="height"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="height"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Height (in inches)</label
              >
            </div>
          </div>
          <div class="relative mt-20">
            <input
              id="file"
              name="file"
              type="file"
              class="manrope-regular w-72"
              min="0"
            />
            <label
              for="file"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >File Upload</label
            >
          </div>
          <input class="hidden" type="submit" id="next-btn" />
        </form>

        <form class="mt-12 hidden" id="canvas-print-form">
          <div class="relative">
            <input
              id="quantity"
              name="quantity"
              type="number"
              class="manrope-regular input-text-field w-48"
              min="1"
            />
            <label
              for="quantity"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Quantity</label
            >
          </div>
          <div class="flex">
            <div class="relative mt-12">
              <input
                id="width"
                name="width"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="width"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Width (in inches)</label
              >
            </div>
            <div class="relative mt-12 ml-4">
              <input
                id="height"
                name="height"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="height"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Height (in inches)</label
              >
            </div>
          </div>
          <div class="relative mt-20">
            <select name="frame" id="frame" class="dropdown-field w-72">
              <option value="placeholder" disabled selected hidden>
                Select one
              </option>
              <option value="3/4inches">3/4 inches</option>
              <option value="1.5inches">1.5 inches</option>
              <option value="shadowbox">Shadow Box</option>
              <option value="glassless">Glassless Frame</option>
              <option value="floating">Floating Frame</option>
              <option value="print">Print only</option>
            </select>
            <label
              for="frame"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >Frame</label
            >
          </div>
          <div class="relative mt-20 hidden">
            <select
              name="framefinishing"
              id="framefinishing"
              class="dropdown-field w-72"
            >
              <option value="placeholder" disabled selected hidden>
                Select one
              </option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="matte">Matte</option>
              <option value="glossy">Glossy</option>
            </select>
            <label
              for="frame"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >Frame Finishing</label
            >
          </div>
          <div class="relative mt-20 hidden">
            <select
              name="frameedges"
              id="frameedges"
              class="dropdown-field w-48"
            >
              <option value="placeholder" disabled selected hidden>
                Select one
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label
              for="frameedges"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >Stretcher Frame Edges?</label
            >
          </div>
          <div class="relative mt-20">
            <input
              id="file"
              name="file"
              type="file"
              class="manrope-regular w-72"
              min="0"
            />
            <label
              for="file"
              class="
                absolute
                manrope-regular
                left-0
                -top-8
                text-gray-600 text-md
              "
              >File Upload</label
            >
          </div>
          <input class="hidden" type="submit" id="next-btn" />
        </form>

        <form class="mt-12 hidden" id="sticker-form">
          <div class="relative">
            <input
              id="quantity"
              name="quantity"
              type="number"
              class="manrope-regular input-text-field w-48"
              min="1"
            />
            <label
              for="quantity"
              class="
                absolute
                manrope-regular
                left-0
                -top-3.5
                text-gray-600 text-md
              "
              >Quantity</label
            >
          </div>
          <div class="flex">
            <div class="relative mt-12">
              <input
                id="width"
                name="width"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="width"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Width (in inches)</label
              >
            </div>
            <div class="relative mt-12 ml-4">
              <input
                id="height"
                name="height"
                type="number"
                class="manrope-regular input-text-field w-48"
                min="1"
              />
              <label
                for="height"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-3.5
                  text-gray-600 text-md
                "
                >Height (in inches)</label
              >
            </div>
          </div>
          <div class="flex justify-start">
            <div class="relative mt-20">
              <select name="diecut" id="diecut" class="dropdown-field w-32">
                <option value="placeholder" disabled selected hidden>
                  Select one
                </option>
                <option value="tarpaulin">Yes</option>
                <option value="wallpaper">No</option>
              </select>
              <label
                for="file"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-8
                  text-gray-600 text-md
                "
                >With die-cut?</label
              >
            </div>

            <div class="relative mt-20 ml-8">
              <input
                id="file"
                name="file"
                type="file"
                class="manrope-regular w-72"
                min="0"
              />
              <label
                for="file"
                class="
                  absolute
                  manrope-regular
                  left-0
                  -top-8
                  text-gray-600 text-md
                "
                >File Upload</label
              >
            </div>
          </div>

          <input class="hidden" type="submit" id="next-btn" />
        </form>
      </div>
      <label
        for="next-btn"
        class="
          manrope-regular
          text-white
          inline-block
          transition
          duration-300
          ease-in-out
          text-center text-lg
          hover:bg-link-water
          hover:text-primary-blue
          w-32
          ml-8
          mb-8
          rounded-xl
          bg-primary-blue
        "
      >
        <a href="/view-cart">Next</a>
      </label>
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