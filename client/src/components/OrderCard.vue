<template>
  <div class="px-8 pt-3 pb-5">
    <div class="bg-light-blue rounded-xl p-4 mx-auto mb-0.5 h-30 cart-card">
      <!-- order image view modal -->
      <ImageModal :showModal="showImageModal" @close="toggleImageModal">
        <div class="image-content flex flex-col justify-center items-center">
          <img
            :src="order.filePath"
            onerror="this.onerror=null;this.src='../src/assets/nopreview.png'"
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
      <EditOrderModal
        :editOrder="showEditOrderModal"
        @close="toggleEditOrderModal"
      >
        <div class="flex flex-col mt-10">
          <label class="manrope-regular text-gray-600 text-2xl"
            >Order
            <span class="manrope-bold text-primary-blue">
              # {{ order.id }} ({{ order.type }})</span
            ></label
          >
          <hr class="modal-border" />
          <div>
            <div class="flex">
              <label
                for="quantity"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Quantity <span v-if="order.type !== 'Sticker'">: </span>
                <span
                  v-if="order.type === 'Sticker'"
                  class="manrope-bold text-primary-blue"
                >
                  (min. 100):</span
                ></label
              >
              <div>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  v-model.trim="updateData.quantity"
                  class="manrope-regular input-text-field w-32 ml-4"
                  :class="{
                    'border-red': v.quantity.$error || !state.qtyValidation,
                  }"
                  @keyup="isValidQty(updateData.quantity)"
                />
                <p
                  class="ml-4 text-red manrope-bold text-left text-sm"
                  v-if="v.quantity.$error"
                >
                  {{ v.quantity.$errors[0].$message }}
                </p>
                <p
                  class="ml-4 text-red manrope-bold text-left text-sm"
                  v-if="!state.qtyValidation"
                >
                  Value must be a positive integer
                </p>
              </div>
            </div>
            <div class="flex">
              <label
                for="width"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Width (in inches):</label
              >
              <div>
                <input
                  id="width"
                  name="width"
                  type="number"
                  v-model.trim="updateData.width"
                  v-on="
                    order.type === 'Canvas Print' || order.type === 'Sticker'
                      ? { keyup: onChangeHeightWidth }
                      : {}
                  "
                  class="manrope-regular input-text-field w-32 ml-9"
                  :class="{ 'border-red': v.width.$error }"
                />
                <p
                  class="ml-9 text-red manrope-bold text-left text-sm"
                  v-if="v.width.$error"
                >
                  {{ v.width.$errors[0].$message }}
                </p>
              </div>
            </div>
            <div class="flex">
              <label
                for="height"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Height (in inches):</label
              >
              <div>
                <input
                  id="height"
                  name="height"
                  type="number"
                  v-model.trim="updateData.height"
                  v-on="
                    order.type === 'Canvas Print' || order.type === 'Sticker'
                      ? { keyup: onChangeHeightWidth }
                      : {}
                  "
                  class="manrope-regular input-text-field w-32 ml-8"
                  :class="{ 'border-red': v.height.$error }"
                />
                <p
                  class="ml-8 text-red manrope-bold text-left text-sm"
                  v-if="v.height.$error"
                >
                  {{ v.height.$errors[0].$message }}
                </p>
              </div>
            </div>
            <div v-if="!state.dimValidation" class="relative mt-2">
              <p class="text-red manrope-bold text-left text-sm">
                Only one between width and height can be greater than 64 to 120
                max!
              </p>
            </div>
            <!-- Tarpaulin Only -->
            <div v-if="order.type === 'Tarpaulin'" class="flex">
              <label
                for="noeyelets"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Number of Eyelets:</label
              >
              <div>
                <input
                  id="noeyelets"
                  name="noeyelets"
                  type="number"
                  v-model.trim="updateData.eyelets"
                  class="manrope-regular input-text-field w-32 ml-8"
                  :class="{ 'border-red': !state.eyeletsValidation }"
                  @keyup="isValidEyelets(updateData.eyelets)"
                />
                <p
                  class="ml-8 text-red manrope-bold text-left text-sm"
                  v-if="!state.eyeletsValidation"
                >
                  Value must be a positive integer
                </p>
              </div>
            </div>
            <!-- Canvas Print Only-->
            <div class="flex" v-if="order.type === 'Canvas Print'">
              <label
                for="frame"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Frame:</label
              >
              <select
                name="frame"
                id="frame"
                class="dropdown-field w-72 ml-4"
                v-model.trim="updateData.frameOption"
                @change="onSelectFrameOption"
              >
                <option value="3/4 Inches">3/4 Inches</option>
                <option value="1.5 Inches">1.5 Inches</option>
                <option value="Shadow Box">Shadow Box</option>
                <option value="Glassless Frame">Glassless Frame</option>
                <option value="Floating Frame">Floating Frame</option>
                <option value="Print Only">Print Only</option>
              </select>
            </div>

            <div
              class="flex"
              v-if="
                updateData.frameOption !== '3/4 Inches' &&
                updateData.frameOption !== '1.5 Inches' &&
                updateData.frameOption !== 'placeholder' &&
                updateData.frameOption !== 'Print Only' &&
                order.type === 'Canvas Print'
              "
            >
              <label
                for="frame"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Frame Finishing:</label
              >
              <div>
                <select
                  name="framefinishing"
                  id="framefinishing"
                  class="dropdown-field w-72 ml-4"
                  v-model.trim="updateData.frameFinishing"
                  @change="onSelectFrameFinishing"
                >
                  <option value="placeholder" disabled hidden>
                    Select one
                  </option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Matte">Matte</option>
                  <option value="Glossy">Glossy</option>
                </select>
                <p
                  v-if="
                    state.frameFinishingValidation == null ||
                    !state.frameFinishingValidation
                  "
                  class="ml-5 text-red manrope-bold text-left text-sm"
                >
                  Please select a frame finishing.
                </p>
              </div>
            </div>

            <div
              class="flex"
              v-if="
                (updateData.frameOption === '3/4 Inches' ||
                  updateData.frameOption === '1.5 Inches') &&
                order.type === 'Canvas Print'
              "
            >
              <label
                for="frameedges"
                class="
                  relative
                  manrope-bold
                  text-gray-600 text-md
                  mt-4
                  text-primary-blue
                "
                >Stretcher Frame Edges:</label
              >
              <div>
                <select
                  name="frameedges"
                  id="frameedges"
                  class="dropdown-field w-48 ml-4"
                  v-model.trim="updateData.frameEdges"
                  @change="onSelectFrameEdges"
                >
                  <option value="placeholder" disabled hidden>
                    Select one
                  </option>
                  <option value="White Edges">White Edges</option>
                  <option value="Black Edges">Printed Edges</option>
                </select>

                <p
                  v-if="
                    state.frameEdgesValidation == null ||
                    !state.frameEdgesValidation
                  "
                  class="ml-5 text-red manrope-bold text-left text-sm"
                >
                  Please select a frame edge.
                </p>
              </div>
            </div>
          </div>
          <!-- Sticker Only -->
          <div class="flex" v-if="order.type === 'Sticker'">
            <label
              for="file"
              class="
                relative
                manrope-bold
                text-gray-600 text-md
                mt-4
                text-primary-blue
              "
              >With die-cut?</label
            >
            <select
              name="diecut"
              id="diecut"
              class="dropdown-field w-32 ml-8 mt-1"
              v-model.trim="updateData.diecut"
            >
              <option value="Yes" :selected="order.diecut === 'Yes'">
                Yes
              </option>
              <option value="No" :selected="order.diecut === 'No'">No</option>
            </select>
          </div>
          <div class="flex">
            <label
              for="price"
              class="
                relative
                manrope-bold
                text-gray-600 text-md
                mt-4
                text-primary-blue
              "
              >Price:</label
            >
            <div class="flex ml-16">
              <p class="absolute ml-10 mt-2 text-lg manrope-regular">₱</p>
              <div>
                <input
                  id="price"
                  name="price"
                  type="number"
                  v-model.trim="updateData.price"
                  class="
                    manrope-regular
                    input-text-field
                    w-36
                    pl-6
                    text-lg
                    ml-9
                  "
                  :class="{ 'border-red': !state.priceValidation }"
                  @keyup="isValidPrice(updateData.price)"
                />
                <p
                  class="ml-9 text-red manrope-bold text-left text-sm"
                  v-if="!state.priceValidation"
                >
                  Value must contain a positive decimal number
                </p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <label
              for="other-details"
              class="
                relative
                manrope-bold
                text-gray-600 text-md
                mt-4
                text-primary-blue
              "
              >Other Details:</label
            >
            <textarea
              id="other-details"
              name="other-details"
              type="text"
              class="manrope-regular input-text-field w-full resize-none"
              v-bind:style="[
                order.type === 'Canvas Print'
                  ? { height: '6rem' }
                  : { height: '8rem' },
              ]"
              min="0"
              v-model.trim="updateData.remarks"
            ></textarea>
          </div>
        </div>

        <button
          class="
            manrope-bold
            dowload-btn
            transition
            duration-300
            hover:bg-link-water hover:text-primary-blue
            flex-shrink
            justify-center
          "
          @click="updateOrder"
        >
          Update Information
        </button>
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
            onerror="this.onerror=null;this.src='../src/assets/nopreview.png'"
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
                order.frameOption === '3/4 Inches' ||
                order.frameOption === '1.5 Inches'
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
          <div class="flex" v-else>
            ₱ {{ parseFloat(order.price).toFixed(2) }}
          </div>
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
            >
              Edit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileDownload from 'js-file-download';
import ImageModal from './Modals/ImageModal.vue';
import EditOrderModal from './Modals/EditOrderModal.vue';
import { reactive, ref } from 'vue';
import axios from 'axios';
import * as api from '../api';
import { numeric, minValue, maxValue } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
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
  setup(props, { emit }) {
    const showImageModal = ref(false);
    const showEditOrderModal = ref(false);
    let state = reactive({
      frameValidation: null,
      frameOptionValidation: null,
      frameFinishingValidation: null,
      frameEdgesValidation: null,
      priceValidation: null,
      dimValidation: true,
      eyeletsValidation: null,
      qtyValidation: null,
    });

    const updateData = reactive({
      quantity: props.order.quantity,
      width: props.order.width,
      height: props.order.height,
      price:
        props.order.price === -1 ? 0 : parseFloat(props.order.price).toFixed(2),
      remarks: props.order.remarks,
      eyelets: props.order.eyelets,
      diecut: props.order.diecut,
      frameOption: 'placeholder',
      frameEdges: 'placeholder',
      frameFinishing: 'placeholder',
    });

    let rules;

    if (props.order.type === 'Tarpaulin') {
      rules = {
        quantity: { numeric, minValue: minValue(1), maxValue: maxValue(1000) },
        width: { numeric, minValue: minValue(6), maxValue: maxValue(120) },
        height: { numeric, minValue: minValue(6), maxValue: maxValue(120) },
        eyelets: { numeric, minValue: minValue(0), maxValue: maxValue(100) },
      };
    } else if (props.order.type === 'Wallpaper') {
      rules = {
        quantity: {
          numeric,
          minValue: minValue(1),
          maxValue: maxValue(1000),
        },
        width: {
          numeric,
          minValue: minValue(6),
          maxValue: maxValue(120),
        },
        height: {
          numeric,
          minValue: minValue(6),
          maxValue: maxValue(120),
        },
      };
    } else if (props.order.type === 'Canvas Print') {
      rules = {
        quantity: {
          numeric,
          minValue: minValue(1),
          maxValue: maxValue(1000),
        },
        width: { numeric, minValue: minValue(6) },
        height: { numeric, minValue: minValue(6) },
      };
    } else {
      rules = {
        quantity: {
          numeric,
          minValue: minValue(100),
          maxValue: maxValue(100000),
        },
        width: { numeric, minValue: minValue(0.5) },
        height: { numeric, minValue: minValue(0.5) },
      };
    }

    const v = useVuelidate(rules, updateData);

    function onSelectFrameOption() {
      state.frameOptionValidation =
        updateData.frameOption !== 'placeholder' ? true : false;
      if (
        updateData.frameOption === '3/4 Inches' ||
        updateData.frameOption === '1.5 Inches'
      ) {
        updateData.frameFinishing = 'placeholder';
        state.frameFinishingValidation = null;
      }
      if (
        updateData.frameOption === 'Shadow Box' ||
        updateData.frameOption === 'Glassless Frame' ||
        updateData.frameOption === 'Floating Frame'
      ) {
        updateData.frameEdges = 'placeholder';
        state.frameEdgesValidation = null;
      }
    }

    // for special case, one dimension can go greater than 64 to 120 max if the other dimension
    // is less than or equal to 64 (height extension case)
    function onChangeHeightWidth() {
      // check if one of the dimension is less than or equal to 64
      // if yes, the another dimension can be greater than 64 to 120 max as a special case
      if (
        (parseFloat(updateData.width) <= 64 &&
          parseFloat(updateData.height) >= 64 &&
          parseFloat(updateData.height) <= 120) ||
        (parseFloat(updateData.width) >= 64 &&
          parseFloat(updateData.width) <= 120 &&
          parseFloat(updateData.height) <= 64) ||
        (parseFloat(updateData.width) <= 64 &&
          parseFloat(updateData.height) <= 64)
      ) {
        state.dimValidation = true;
      } else {
        state.dimValidation = false;
      }
    }

    function onSelectFrameFinishing() {
      state.frameFinishingValidation =
        updateData.frameFinishing !== 'placeholder' ? true : false;
    }

    function onSelectFrameEdges() {
      state.frameEdgesValidation =
        updateData.frameEdges !== 'placeholder' ? true : false;
    }

    function toggleImageModal() {
      showImageModal.value = !showImageModal.value;
    }

    function toggleEditOrderModal() {
      showEditOrderModal.value = !showEditOrderModal.value;
      updateData.quantity = props.order.quantity;
      updateData.width = props.order.width;
      updateData.height = props.order.height;
      updateData.price =
        props.order.price === -1 ? 0 : parseFloat(props.order.price).toFixed(2);
      updateData.remarks = props.order.remarks;
      updateData.eyelets = props.order.eyelets;
      updateData.diecut = props.order.diecut;

      updateData.frameOption = props.order.frameOption;
      updateData.frameFinishing = props.order.frameFinishing;
      updateData.frameEdges = props.order.frameEdges;
      isValidPrice(updateData.price);
      isValidQty(updateData.quantity);

      state.dimValidation = true;
      if (props.order.type === 'Tarpaulin') isValidEyelets(updateData.eyelets);
      if (
        updateData.frameOption === '3/4 Inches' ||
        updateData.frameOption === '1.5 Inches'
      ) {
        onSelectFrameEdges();
      }
      if (
        updateData.frameOption === 'Shadow Box' ||
        updateData.frameOption === 'Glassless Frame' ||
        updateData.frameOption === 'Floating Frame'
      ) {
        onSelectFrameFinishing();
        console.log('finish: ' + updateData.frameFinishing);
      }
    }

    async function updateOrder() {
      try {
        const validated = await v.value.$validate();

        if (props.order.type !== 'Tarpaulin') {
          state.eyeletsValidation = true;
        }
        if (props.order.type !== 'Canvas Print') {
          state.frameEdgesValidation = true;
          state.frameFinishingValidation = true;
        } else {
          if (
            updateData.frameOption === '3/4 Inches' ||
            updateData.frameOption === '1.5 Inches'
          ) {
            state.frameFinishingValidation = true;
          }
          if (
            updateData.frameOption === 'Shadow Box' ||
            updateData.frameOption === 'Glassless Frame' ||
            updateData.frameOption === 'Floating Frame'
          ) {
            state.frameEdgesValidation = true;
          }
        }

        console.log(
          validated +
            ' ' +
            state.priceValidation +
            ' ' +
            state.dimValidation +
            ' edge: ' +
            state.frameEdgesValidation +
            ' finish: ' +
            state.frameFinishingValidation +
            ' ' +
            state.eyeletsValidation
        );

        if (
          validated &&
          state.qtyValidation &&
          state.priceValidation &&
          state.dimValidation &&
          state.frameEdgesValidation &&
          state.frameFinishingValidation &&
          state.eyeletsValidation
        ) {
          const result = await api.updateOrder(props.order.id, updateData);

          if (result.status === 204) {
            if (props.order.type !== 'Tarpaulin') {
              state.eyeletsValidation = null;
            }
            if (props.order.type !== 'Canvas Print') {
              state.frameEdgesValidation = null;
              state.frameFinishingValidation = null;
            } else {
              if (
                updateData.frameOption === '3/4 Inches' ||
                updateData.frameOption === '1.5 Inches'
              ) {
                state.frameFinishingValidation = null;
              }
              if (
                updateData.frameOption === 'Shadow Box' ||
                updateData.frameOption === 'Glassless Frame' ||
                updateData.frameOption === 'Floating Frame'
              ) {
                state.frameEdgesValidation = null;
              }
            }

            const orderUpdate = {
              quantity: updateData.quantity,
              width: parseFloat(parseFloat(updateData.width).toFixed(2)),
              height: parseFloat(parseFloat(updateData.height).toFixed(2)),
              price: parseFloat(parseFloat(updateData.price).toFixed(2)),
              remarks: updateData.remarks,
            };
            // Tarpaulin only details
            if (updateData.eyelets) {
              orderUpdate['eyelets'] = updateData.eyelets;
            }

            // Sticker only details
            if (updateData.diecut) {
              orderUpdate['diecut'] = updateData.diecut;
            }

            // Canvas Print only details
            if (updateData.frameOption) {
              orderUpdate['frameOption'] = updateData.frameOption;
            }
            if (updateData.frameEdges) {
              orderUpdate['frameEdges'] = updateData.frameEdges;
            }
            if (updateData.frameFinishing) {
              orderUpdate['frameFinishing'] = updateData.frameFinishing;
            }

            emit('orderUpdate', orderUpdate);
          }
          toggleEditOrderModal();
        } else {
          if (props.order.type !== 'Tarpaulin') {
            state.eyeletsValidation = null;
          }
          if (props.order.type !== 'Canvas Print') {
            state.frameEdgesValidation = null;
            state.frameFinishingValidation = null;
          } else {
            if (
              updateData.frameOption === '3/4 Inches' ||
              updateData.frameOption === '1.5 Inches'
            ) {
              state.frameFinishingValidation = null;
            }
            if (
              updateData.frameOption === 'Shadow Box' ||
              updateData.frameOption === 'Glassless Frame' ||
              updateData.frameOption === 'Floating Frame'
            ) {
              state.frameEdgesValidation = null;
            }
          }
          console.log(
            'else ' +
              validated +
              ' ' +
              state.priceValidation +
              ' ' +
              state.dimValidation +
              ' edge: ' +
              state.frameEdgesValidation +
              ' finish: ' +
              state.frameFinishingValidation +
              ' ' +
              state.eyeletsValidation
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    function downloadImg() {
      axios({
        url: props.order.filePath,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        // get filename and file type
        const fileType = props.order.filePath.substring(
          props.order.filePath.lastIndexOf('.')
        );
        const filename =
          props.order.filename.substring(
            props.order.filename.indexOf('/') + 1
          ) + fileType;

        // download file
        fileDownload(response.data, filename);
      });
    }

    function isValidPrice(price) {
      state.priceValidation = /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,2}$/.test(
        price
      )
        ? true
        : false;
    }

    function isValidEyelets(eyelets) {
      state.eyeletsValidation = /^[0-9]*$/.test(eyelets) ? true : false;
    }

    function isValidQty(quantity) {
      state.qtyValidation = /^([1-9][0-9]*)$/.test(quantity) ? true : false;
    }

    return {
      state,
      updateData,
      showImageModal,
      showEditOrderModal,
      onChangeHeightWidth,
      isValidPrice,
      isValidQty,
      isValidEyelets,
      updateOrder,
      toggleImageModal,
      toggleEditOrderModal,
      onSelectFrameOption,
      onSelectFrameFinishing,
      onSelectFrameEdges,
      downloadImg,
      v,
    };
  },
};
</script>

<style lang="postcss">
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
  left: 25%;
  width: 50%;
  height: 3rem;
  vertical-align: middle;
  outline: none;
}

.content-img {
  max-width: 100%;
  max-height: 75%;
}

.modal-border {
  border-style: solid;
  @apply border-light-blue;
  @apply bg-light-blue;
  border-width: 2.5px;
}
</style>
