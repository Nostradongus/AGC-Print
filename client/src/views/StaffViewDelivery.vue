<template>
    <div>
        <side-bar />
        <page-header title="View Scheduled Deliveries">
        <p
            class="manrope-bold text-2xl text-center text-primary-blue mt-8"
            v-if="state.empty == null"
        >
            Loading data, please wait...
        </p>
        <div class="overflow-y-auto max-h-screen scrollbar-hidden">
            <DeliveryCard
                v-for="order in state.shownOrders"
                :key="order.id"
                :order="order"
            />
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
            shownOrders: null,
            allOrders: null
        });

        async function getInitUsersOrders() {
            try {
                // get all active orders of users
                const result = await api.getAllOrderSets();
                state.shownOrders = state.allOrders = result.data;
                if (state.shownOrders.length === 0) {
                state.empty = true;
                state.shownOrders = null;
                } else {
                state.empty = false;
                }
            } catch (err) {
                console.log(err);
            }
        }


        onBeforeMount(() => {
        // populate staff active orders page with active orders of clients
        if (store.state.worker.worker != null) {
            getInitUsersOrders();
        } else {
            state.empty = false;
        }
        });
        return {state, getInitUsersOrders};
    },
    
};
</script>

<style></style>
