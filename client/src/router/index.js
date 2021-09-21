import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import StaffLogin  from '../views/StaffLogin.vue'
import Order from '../views/Order.vue';
import OrderDetails from '../views/OrderDetails.vue';
import ViewOrder from '../views/ViewOrder.vue';
import DeliveryInformation from '../views/DeliveryInformation.vue';
import ViewCart from '../views/ViewCart.vue';
import OrderHistory from '../views/OrderHistory.vue';
import OrderConfirmed from '../views/OrderConfirmed.vue';
import StaffViewOrder from '../views/StaffViewOrder.vue';
import StaffViewReport from '../views/StaffViewReport.vue';
import StaffViewPayment from '../views/StaffViewPayment.vue';
import StaffViewDelivery from '../views/StaffViewDelivery.vue';
import StaffViewUser from '../views/StaffViewUser.vue';
import AdminViewStaff from '../views/AdminViewStaff.vue'
import Payment from '../views/Payment.vue';
import ReportOrder from '../views/ReportOrder.vue';
import UserProfile from '../views/UserProfile.vue';
import EditProfile from '../views/EditProfile.vue';
import DeliverySchedule from '../views/DeliverySchedule.vue';

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
    path: '/staff-login',
    name: 'StaffLogin',
    component: StaffLogin,
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
      requiresUser: true,
    },
  },
  {
    path: '/view-cart',
    name: 'ViewCart',
    component: ViewCart,
    meta: {
      requiresUser: true,
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
      requiresUser: true,
    },
  },
  {
    path: '/order-confirmed',
    name: 'OrderConfirmed',
    component: OrderConfirmed,
    meta: {
      requiresUser: true,
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
      requiresUser: true,
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
      requiresWorker: true,
    },
  },
  {
    path: '/view-report-list',
    name: 'StaffViewReport',
    component: StaffViewReport,
    meta: {
      requiresWorker: true,
    },
  },
  {
    path: '/view-payment-list',
    name: 'StaffViewPayment',
    component: StaffViewPayment,
    meta: {
      requiresWorker: true,
    },
  },
  {
    path: '/view-delivery-list',
    name: 'StaffViewDelivery',
    component: StaffViewDelivery,
    meta: {
      requiresWorker: true,
    },
  },
  {
    path: '/view-user-list',
    name: 'StaffViewUser',
    component: StaffViewUser,
    meta: {
      requiresWorker: true,
    },
  },
  {
    path: '/view-staff-list',
    name: 'AdminViewStaff',
    component: AdminViewStaff,
    meta: {
      requiresWorker: true,
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
  {
    path: '/delivery-schedule',
    name: 'DeliverySchedule',
    component: DeliverySchedule,
    meta: {
      requiresUser: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresUser = to.matched.some((record) => record.meta.requiresUser);
  const requiresWorker = to.matched.some((record) => record.meta.requiresWorker);
  const hideForAuth = to.matched.some((record) => record.meta.hideForAuth);
  const user = localStorage.getItem('user');
  const worker = localStorage.getItem('worker');
  if (requiresAuth) {
    if (user != null || worker != null) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (requiresUser) {
    if (user != null) {
      next();
    } else if (worker != null) {
      next({ name: 'StaffViewOrder' });
    } else {
      next({ name: 'Login' });
    }
  } else if (requiresWorker) {
    if (worker != null) {
      next();
    } else if (user != null) {
      next({ name: 'Order' });
    } else {
      next({ name: 'StaffLogin' });
    }
  } else if (hideForAuth) {
    if (user != null) {
      next({ name: 'Order' });
    } else if (worker != null) {
      next({ name: 'StaffViewOrder' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
