import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Order from '../views/Order.vue';
import OrderDetails from '../views/OrderDetails.vue';
import ViewOrder from '../views/ViewOrder.vue';
import DeliveryInformation from '../views/DeliveryInformation.vue';
import ViewCart from '../views/ViewCart.vue';
import OrderHistory from '../views/OrderHistory.vue';
import OrderConfirmed from '../views/OrderConfirmed.vue';
import StaffViewOrder from '../views/StaffViewOrder.vue';
import Payment from '../views/Payment.vue';
import ReportOrder from '../views/ReportOrder.vue';
import UserProfile from '../views/UserProfile.vue';
import EditProfile from '../views/EditProfile.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/view-cart',
    name: 'ViewCart',
    component: ViewCart,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile/:username',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit-profile/:username',
    name: 'EditProfile',
    component: EditProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/delivery-information',
    name: 'DeliveryInformation',
    component: DeliveryInformation,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order-confirmed',
    name: 'OrderConfirmed',
    component: OrderConfirmed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/view-order',
    name: 'ViewOrder',
    component: ViewOrder,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: OrderHistory,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order-details/:id',
    name: 'OrderDetails',
    component: OrderDetails,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/view-order-list',
    name: 'StaffViewOrder',
    component: StaffViewOrder,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/payment-order/:id',
    name: 'Payment',
    component: Payment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/report-order/:id',
    name: 'ReportOrder',
    component: ReportOrder,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const hideForAuth = to.matched.some((record) => record.meta.hideForAuth);
  const user = localStorage.getItem('user');
  const worker = localStorage.getItem('worker');
  if (requiresAuth) {
    if (user != null || worker != null) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (hideForAuth) {
    if (user != null || worker != null) {
      next({ name: 'Order' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
