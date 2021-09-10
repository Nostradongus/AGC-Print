<template>
  <div class="px-8 pt-3 pb-5">
    <div class="bg-light-blue rounded-xl p-4 mx-auto mb-0.5 h-30 cart-card">
      <!-- order image view modal -->
      <ImageModal :showModal="showImageModal" @close="toggleImageModal">
        <div class="image-content flex flex-col justify-center items-center">
          <img
            :src="order.filePath"
            onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
            alt="Order Image"
            class="flex-grow content-img self-center"
          />
          <button
            class="
              manrope-bold
              dowload-btn
              transition
              duration-300
              hover:bg-link-water hover:text-primary-blue
              flex-shrink
            "
            @click="downloadImg"
          >
            Download File
          </button>
        </div>
      </ImageModal>
      <EditOrderModal :editOrder="showEditOrderModal" @close="toggleEditOrderModal">
        <form class="items-center">
          <div class=" flex flex-col mt-10">
            <label
              class="
                manrope-regular
                text-gray-600 text-2xl
              "
              >Product Type: <span class="manrope-bold text-primary-blue">{{order.type}}</span></label
            >
            <hr>
            <!-- Tarpaulin Form -->
            <div v-if="order.type === 'Tarpaulin'"> 
              <div class="flex">
                <label
                  for="quantity"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Quantity</label
                >
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  :value="order.quantity"
                  class="manrope-regular input-text-field w-32 ml-4"
                />
              </div>
              <div class="flex">
                <label
                  for="width"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Width (in inches)</label
                >
                <input
                  id="width"
                  name="width"
                  type="number"
                  :value="order.width"
                  class="manrope-regular input-text-field w-32 ml-9"
                />
              </div>
              <div class="flex">
                <label
                  for="height"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Height (in inches)</label
                >
                <input
                  id="height"
                  name="height"
                  type="number"
                  :value="order.height"
                  class="manrope-regular input-text-field w-32 ml-8"
                />
              </div>
              <div class="flex">
                <label
                  for="noeyelets"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Number of Eyelets</label
                >
                <input
                  id="noeyelets"
                  name="noeyelets"
                  type="number"
                  :value="order.eyelets"
                  class="manrope-regular input-text-field w-32 ml-8"
                />
              </div>
              <div class="flex">
                <label
                  for="price"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Price</label
                >
                <div class="flex ml-16">
                  <p class="absolute ml-10 mt-2 text-lg manrope-regular">₱</p>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    :value="order.price === -1 ? 0 : order.price"
                    class="manrope-regular input-text-field w-36 pl-6 text-lg ml-9"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label
                  for="other-details"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Other Details</label
                >
                <textarea
                  id="other-details"
                  name="other-details"
                  type="text"
                  class="manrope-regular input-text-field w-full h-24"
                  min="0"
                  :value="order.remarks"
                ></textarea>      
              </div>
            </div>
            <!-- Wallpaper Form -->
            <div v-if="order.type === 'Wallpaper'">
              <div class="flex">
                <label
                  for="quantity"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Quantity</label
                >
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  :value="order.quantity"
                  class="manrope-regular input-text-field w-32 ml-4"
                />
              </div>
              <div class="flex">
                <label
                  for="width"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Width (in inches)</label
                >
                <input
                  id="width"
                  name="width"
                  type="number"
                  :value="order.width"
                  class="manrope-regular input-text-field w-32 ml-9"
                />
              </div>
              <div class="flex">
                <label
                  for="height"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Height (in inches)</label
                >
                <input
                  id="height"
                  name="height"
                  type="number"
                  :value="order.height"
                  class="manrope-regular input-text-field w-32 ml-8"
                />
              </div>
              <div class="flex">
                <label
                  for="price"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Price</label
                >
                <div class="flex ml-16">
                  <p class="absolute ml-10 mt-2 text-lg manrope-regular">₱</p>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    :value="order.price === -1 ? 0 : order.price"
                    class="manrope-regular input-text-field w-36 pl-6 text-lg ml-9"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label
                  for="other-details"
                  class="relative manrope-regular text-gray-600 text-md"
                  >Other Details</label
                >
                <textarea
                  id="other-details"
                  name="other-details"
                  type="text"
                  class="manrope-regular input-text-field w-full h-24"
                  min="0"
                  :value="order.remarks"
                ></textarea>      
              </div>
            </div>
            <!-- Canvas print Form -->
            <div v-if="order.type === 'Canvas Print'">
              <div class="flex">
                <label
                  for="quantity"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Quantity</label
                >
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  :value="order.quantity"
                  class="manrope-regular input-text-field w-32 ml-4"
                />
              </div>
              <div class="flex">
                <label
                  for="width"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Width (in inches)</label
                >
                <input
                  id="width"
                  name="width"
                  type="number"
                  :value="order.width"
                  class="manrope-regular input-text-field w-32 ml-9"
                />
              </div>
              <div class="flex">
                <label
                  for="height"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Height (in inches)</label
                >
                <input
                  id="height"
                  name="height"
                  type="number"
                  :value="order.height"
                  class="manrope-regular input-text-field w-32 ml-8"
                />
              </div>
              <div class="flex">
                <label
                  for="frame"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Frame</label
                >
                <select
                  name="frame"
                  id="frame"
                  class="dropdown-field w-72 ml-4"
                  v-model="state.frameOption"
                  @change="onSelectFrameOption"
                >
                  <option value="3/4 Inches" :selected="order.frameOption === '3/4 Inches'">3/4 Inches</option>
                  <option value="1.5 Inches" :selected="order.frameOption === '1.5 Inches'">1.5 Inches</option>
                  <option value="Shadow Box" :selected="order.frameOption === 'Shadow Box'">Shadow Box</option>
                  <option value="Glassless Frame" :selected="order.frameOption === 'Glassless Frame'">Glassless Frame</option>
                  <option value="Floating Frame" :selected="order.frameOption === 'Floating Frame'">Floating Frame</option>
                  <option value="Print Only" :selected="order.frameOption === 'Print Only'">Print Only</option>
                </select>
              </div>
              
              <div
                class="flex"
                v-if="
                  state.frameOption !== '3/4 Inches' &&
                  state.frameOption !== '1.5 Inches' &&
                  state.frameOption !== 'placeholder' &&
                  state.frameOption !== 'Print Only'
                "
              >
                <label
                  for="frame"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Frame Finishing</label
                >
                <select
                  name="framefinishing"
                  id="framefinishing"
                  class="dropdown-field w-72 ml-4"
                  v-model="state.frameFinishing"
                  @change="onSelectFrameFinishing"
                >
                  <option value="placeholder" disabled hidden 
                    :selected="state.frameOption !== '3/4 Inches' &&
                    state.frameOption !== '1.5 Inches' &&
                    state.frameOption !== 'placeholder' &&
                    state.frameOption !== 'Print Only'">
                    Select one
                  </option>
                  <option value="Black" :selected="order.frameFinishing === 'Black'">Black</option>
                  <option value="White" :selected="order.frameFinishing === 'White'">White</option>
                  <option value="Matte" :selected="order.frameFinishing === 'Matte'">Matte</option>
                  <option value="Glossy" :selected="order.frameFinishing === 'Glossy'">Glossy</option>
                </select>
              </div>
              <div
                class="flex"
                v-if="
                  state.frameOption === '3/4 Inches' || state.frameOption === '1.5 Inches'
                "
              >
                <label
                  for="frameedges"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Stretcher Frame Edges</label
                >
                <select
                  name="frameedges"
                  id="frameedges"
                  class="dropdown-field w-48 ml-4"
                  v-model="state.frameEdges"
                  @change="onSelectFrameEdges"
                >
                  <option value="placeholder" disabled hidden :selected="state.frameOption === '3/4 Inches' || state.frameOption === '1.5 Inches'">Select one</option>
                  <option value="White Edges" :selected="order.frameEdges==='White Edges'">White Edges</option>
                  <option value="Black Edges" :selected="order.frameEdges==='Printed Edges'">Printed Edges</option>
                </select>
                
                <p
                  v-if="state.frameEdgesValidation != null && !state.frameEdgesValidation"
                  class="text-red manrope-bold text-left text-sm"
                >
                  Please select a frame edge.
                </p>
              </div>
              <div class="flex">
                <label
                  for="price"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Price</label
                >
                <div class="flex ml-16">
                  <p class="absolute ml-10 mt-2 text-lg manrope-regular">₱</p>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    :value="order.price === -1 ? 0 : order.price"
                    class="manrope-regular input-text-field w-36 pl-6 text-lg ml-9"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label
                  for="other-details"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Other Details</label
                >
                <textarea
                  id="other-details"
                  name="other-details"
                  type="text"
                  class="manrope-regular input-text-field w-full h-24"
                  min="0"
                  :value="order.remarks"
                ></textarea>      
              </div>
            </div>
            <!-- Sticker Form -->
            <div v-if="order.type === 'Sticker'">
              <div class="flex">
                <label
                  for="quantity"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Quantity (min. 100)</label
                >
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  :value="order.quantity"
                  class="manrope-regular input-text-field w-32 ml-4"
                />
              </div>
              <div class="flex">
                <label
                  for="width"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Width (in inches)</label
                >
                <input
                  id="width"
                  name="width"
                  type="number"
                  :value="order.width"
                  class="manrope-regular input-text-field w-32 ml-9"
                />
              </div>
              <div class="flex">
                <label
                  for="height"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Height (in inches)</label
                >
                <input
                  id="height"
                  name="height"
                  type="number"
                  :value="order.height"
                  class="manrope-regular input-text-field w-32 ml-8"
                />
              </div>
              <div class="flex">
                <label
                  for="file"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >With die-cut?</label
                >
                <select
                  name="diecut"
                  id="diecut"
                  class="dropdown-field w-32 ml-8 mt-1"
                >
                  <option value="Yes" :selected="order.diecut === 'Yes'">Yes</option>
                  <option value="No" :selected="order.diecut === 'No'">No</option>
                </select>
              </div>
              <div class="flex">
                <label
                  for="price"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Price</label
                >
                <div class="flex ml-16">
                  <p class="absolute ml-10 mt-2 text-lg manrope-regular">₱</p>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    :value="order.price === -1 ? 0 : order.price"
                    class="manrope-regular input-text-field w-36 pl-6 text-lg ml-9"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label
                  for="other-details"
                  class="relative manrope-regular text-gray-600 text-md mt-4"
                  >Other Details</label
                >
                <textarea
                  id="other-details"
                  name="other-details"
                  type="text"
                  class="manrope-regular input-text-field w-full h-24"
                  min="0"
                  :value="order.remarks"
                ></textarea>      
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            class="
              manrope-bold
              dowload-btn
              transition
              duration-300
              hover:bg-link-water hover:text-primary-blue
              flex-shrink
            "
          >
            Update Information
          </button>
        </form>
      </EditOrderModal>
      <div class="flex p-3">
        <div class="my-auto pr-3 w-1/3">
          <span class="text-md manrope-regular">Order #{{ order.id }}</span>
        </div>
        <div class="flex items-center pl-8 w-80 max-h-52">
          <!-- NOTE: USE IF ACCESSING FROM LOCAL STORAGE -->
          <!-- <img
            :src="`http://localhost:5000/order_images/${order.filename}`"
            onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
            alt="Order Image"
            class="order-img"
            border="0"
          /> -->
          <!-- NOTE: USE IF ACCESSING FROM CLOUDINARY -->
          <img
            :src="order.filePath"
            onerror="this.onerror=null;this.src='http://localhost:5000/assets/nopreview.png'"
            alt="Order Image"
            class="order-img h-full w-full object-contain cursor-pointer"
            border="0"
            @click="toggleImageModal"
          />
        </div>
        <div class="w-1/3 flex flex-col justify-center items-center">
          <div class="ml-3 space-y-1 pr-3">
            <div class="text-md manrope-regular">
              <span class="text-md manrope-bold"> Type:</span>
              {{ order.type }}
            </div>
            <div class="text-md manrope-regular">
              <span class="text-md manrope-bold"> Dimensions:</span>
              {{ order.width }} x {{ order.height }}
            </div>
            <div v-if="order.eyelets != null" class="text-md manrope-regular">
              <span class="text-md manrope-bold">Number of Eyelets:</span>
              {{ order.eyelets }}
            </div>
            <div
              v-if="
                order.frameOption != null && order.frameOption !== 'placeholder'
              "
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame:</span>
              {{ order.frameOption }}
            </div>
            <div
              v-if="
                order.frameOption === '3/4inches' ||
                order.frameOption === '1.5inches'
              "
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame Edges:</span>
              {{ order.frameEdges }}
            </div>
            <div
              v-if="
                order.frameFinishing != null &&
                order.frameFinishing !== 'placeholder'
              "
              class="text-md manrope-regular"
            >
              <span class="text-md manrope-bold">Frame Finishing:</span>
              {{ order.frameFinishing }}
            </div>
            <div v-if="order.diecut != null" class="text-md manrope-regular">
              <span class="text-md manrope-bold">Die-cut:</span>
              {{ order.diecut }}
            </div>
            <div class="text-md manrope-regular truncate w-52">
              <span v-if="order.remarks !== ''" class="text-md manrope-bold"
                >Remarks:</span
              >
              {{ order.remarks }}
            </div>
          </div>
        </div>
        <div
          class="w-1/3 flex flex-col justify-center text-center items-center"
        >
          <label for="quantity" class="text-md manrope-bold">Quantity</label>
          <p>{{ order.quantity }}</p>
        </div>
        <div
          class="w-1/6 flex flex-col justify-center text-center items-center"
        >
          <div class="flex" v-if="order.price === -1">Pending Price</div>
          <div class="flex" v-else>₱ {{ order.price }}</div>
          <div class="flex" v-if="isStaff">
            <button
              class="
                manrope-regular
                text-white
                inline-block
                transition
                duration-300
                ease-in-out
                text-center text-xs
                hover:bg-link-water hover:text-primary-blue
                w-20
                h-6
                mx-8
                mt-2
                p-1
                rounded-xl
                bg-primary-blue
              "
              @click="toggleEditOrderModal"
              >Edit</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageModal from './Modals/ImageModal.vue';
import EditOrderModal from './Modals/EditOrderModal.vue';
import { reactive, ref } from 'vue';
import axios from 'axios';
export default {
  name: 'OrderCard',
  components: {
    ImageModal,
    EditOrderModal,
  },
  props: {
    order: {
      type: Object,
    },
    isStaff: {
      type: Boolean,
    },
  },
  setup(props) {
    const showImageModal = ref(false);
    const showEditOrderModal = ref(false);
    let state = reactive({
      frameOption: 'placeholder',
      frameFinishing: 'placeholder',
      frameEdges: 'placeholder',
      frameValidation: null,
      frameOptionValidation: null,
      frameFinishingValidation: null,
      frameEdgesValidation: null,
    });

    function onSelectFrameOption() {
      state.frameOptionValidation =
        state.frameOption !== 'placeholder' ? true : false;
      if (
        state.frameOption === '3/4 Inches' ||
        state.frameOption === '1.5 Inches'
      ) {
        state.frameFinishing = 'placeholder';
        state.frameFinishingValidation = null;
      }
      if (
        state.frameOption === 'Shadow Box' ||
        state.frameOption === 'Glassless Frame' ||
        state.frameOption === 'Floating Frame'
      ) {
        state.frameEdges = 'placeholder';
        state.frameEdgesValidation = null;
      }
    }

    function onSelectFrameFinishing() {
      state.frameFinishingValidation =
        state.frameFinishing !== 'placeholder' ? true : false;
    }

    function onSelectFrameEdges() {
      state.frameEdgesValidation =
        state.frameEdges !== 'placeholder' ? true : false;
    }

    function toggleImageModal() {
      showImageModal.value = !showImageModal.value;
    }

    function toggleEditOrderModal() {
      showEditOrderModal.value = !showEditOrderModal.value;
      state.frameOption = props.order.frameOption;
      state.frameFinishing = props.order.frameFinishing;
      state.frameEdges = props.order.frameEdges;
    }

    function downloadImg() {
      axios({
        url: props.order.filePath,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        
        // get filename and file type
        const fileType = props.order.filePath.substring(props.order.filePath.lastIndexOf('.'));
        const filename = props.order.filename.substring(props.order.filename.indexOf('/') + 1) + fileType;

        link.setAttribute('download', filename);
        document.body.appendChild(link);

        link.click();
      });
    }
    return { state, showImageModal, showEditOrderModal, toggleImageModal, toggleEditOrderModal, 
      onSelectFrameOption,
      onSelectFrameFinishing,
      onSelectFrameEdges, downloadImg };
  }
};
</script>

<style>
.cart-card {
  transition: 1500ms;
}

.cart-card:hover {
  transition: 1500ms;
  box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}

.order-img {
  max-width: 75%;
  max-height: 75%;
}

.input-text-field {
  outline: 0;
  border-width: 0 0 2px;
  border-bottom-color: #c4c4c4;
  width: 48rem;
  height: 2rem;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.image-content {
  height: 90%;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 45px;
}

.dowload-btn {
  position: absolute;
  background-color: #0f4c81;
  color: white;
  border-radius: 20px;
  bottom: 15px;
  width: 50%;
  height: 3rem;
  vertical-align: middle;
  outline: none;
}

.content-img {
  max-width: 100%;
  max-height: 75%;
}
</style>
