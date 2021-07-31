import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Order from '../views/Order.vue';
import OrderDetails from '../views/OrderDetails.vue';
import ViewOrder from '../views/ViewOrder.vue';
import DeliveryInformation from '../views/DeliveryInformation.vue';
import ViewCart from '../views/ViewCart.vue';
import OrderHistory from '../views/OrderHistory.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/view-cart',
    name: 'ViewCart',
    component: ViewCart,
  },
  {
    path: '/delivery-information',
    name: 'DeliveryInformation',
    component: DeliveryInformation,
  },
  {
    path: '/view-order',
    name: 'ViewOrder',
    component: ViewOrder,
  },
  {
    path: '/order-history',
    name: 'OrderHistory',
    component: OrderHistory,
  },
  {
    path: '/order-details',
    name: 'OrderDetails',
    component: OrderDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
