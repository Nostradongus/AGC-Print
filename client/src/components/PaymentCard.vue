<template>
    <div class="bg-light-blue rounded-xl p-4 mx-auto mb-2 h-30 payment-card">
        <div class="flex justify-center">
            <div class="flex-auto">
                <p class="text-lg manrope-regular">{{ payment.dateUploaded }}</p>
            </div>
            <div v-if="payment.confirmed" class="flex-auto">
                <p class="text-lg manrope-regular">OR#{{ payment.id }}</p>
            </div>
            <div v-if="payment.confirmed" class="flex-auto">
                <p class="text-lg manrope-regular">{{ payment.paymentAcc }}</p>
            </div>
            <div v-if="payment.confirmed" class="flex-auto">
                <p class="text-lg manrope-regular">₱ {{ payment.amount }}</p>
            </div>
            <div v-if="!payment.confirmed" class="flex-auto">
                <p class="text-lg manrope-regular">Payment Pending Verification</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentCard',
    props: {
        payment: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style>
.payment-card {
    transition: 1500ms;
}

.payment-card:hover {
    transition: 1500ms;
    box-shadow: 5px 1px 11px 0px rgba(0, 0, 0, 0.26);
}
</style>