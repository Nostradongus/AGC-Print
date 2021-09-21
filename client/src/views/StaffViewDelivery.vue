<template>
    <div>
        <side-bar />
        <page-header title="Scheduled Deliveries">
            <p
                class="manrope-bold text-2xl text-center text-primary-blue mt-8"
                v-if="state.empty == null"
            >
                Loading data, please wait...
            </p>

            <p
                class="manrope-bold left-0 -top-3.5 text-xl pt-6 px-8 text-red"
                v-if="state.empty"
            >
                There are no orders ready for delivery yet.
            </p>
            
            <div class="h-full w-full" v-if="state.empty != null && !state.empty">
                <!-- message and status filter option box -->
                <div class="flex items-end mb-5">
                    <div class="flex-1">
                        <!-- delivery schedules sort message -->
                        <h1
                            class="
                                manrope-extrabold
                                left-0
                                -top-3.5
                                text-lg
                                pt-8
                                px-8
                                text-primary-blue
                            "
                        >
                            Delivery time is in MILITARY format (24 hours)
                        </h1>
                    </div>
                </div>
                <div v-if="!state.empty" class="overflow-y-auto max-h-screen scrollbar-hidden">
                    <DeliveryCard
                        v-for="order in state.scheduledOrders"
                        :key="order.id"
                        :order="order"
                    />
                </div>
            </div>
        </page-header>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import DeliveryCard from '../components/DeliveryCard.vue';
import { reactive, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api';
export default {
    name: 'StaffViewDelivery',
    components: {
        DeliveryCard,
        SideBar,
        PageHeader,
    },
    setup() {
        const store = useStore();
        const state = reactive({
            empty: null,
            scheduledOrders: null,
        });

        async function getInitScheduledOrders() {
            try {
                // get all active orders of users
                const result = await api.getAllOrderSetsScheduled();
                if (result.status === 200) {
                    state.scheduledOrders = result.data;
                    state.empty = false;
                } else {
                    state.empty = true;
                }
            } catch (err) {
                state.empty = true;
                console.log(err);
            }
        }

        onBeforeMount(() => {
        // populate staff active orders page with active orders of clients
        if (store.state.worker.worker != null) {
            getInitScheduledOrders();
        } else {
            state.empty = false;
        }
        });

        return { state, getInitScheduledOrders };
    },
    
};
</script>

<style></style>
