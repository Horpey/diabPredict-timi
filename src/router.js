import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store.js';
import Index from './pages/Index.vue';
import Ontology from './pages/Ontology.vue';
import About from './pages/About.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard.vue';
import Home from './pages/dashboard/Home.vue';
import Patients from './pages/dashboard/Patients.vue';
import Profile from './pages/dashboard/Profile.vue';
import ListPatient from './pages/dashboard/ListPatient.vue';
import Diagnose from './pages/dashboard/Diagnose.vue';


Vue.use(Router);

let router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: '' },
      meta: {
        requiresVisitor: true
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/ontology',
      name: 'ontology',
      components: { default: Ontology, header: MainNavbar, footer: MainFooter },
      meta: {
        requiresVisitor: true
      },
      props: {
        header: {
          colorOnScroll: 400,
          style: 'background-color: #2c2c2c!important'
        },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/about',
      name: 'about',
      components: { default: About, header: MainNavbar, footer: MainFooter },
      meta: {
        requiresVisitor: true
      },
      props: {
        header: {
          colorOnScroll: 400,
          style: 'background-color: #2c2c2c!important'
        },
        footer: { backgroundColor: 'black' }
      }
    },
    // dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      components: { default: Dashboard },
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'patients',
          name: 'patients',
          component: Patients,
        },
        {
          path: 'patients/:id',
          name: 'patientslist',
          component: ListPatient
        },
        {
          path: 'diagnose/:id',
          name: 'diagnose',
          component: Diagnose
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        }
      ]
      // components: { default: Ontology, header: MainNavbar, footer: MainFooter },
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next('/');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLoggedIn) {
      next({
        path: '/dashboard'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});


export default router;