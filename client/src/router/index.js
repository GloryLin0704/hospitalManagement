import Vue from "vue";
import Router from "vue-router";
import Index from "@/page/index";
import Login from "@/page/index/login";
import Departments from "@/page/departments";
import Wards from "@/page/wards";
import Doctors from "@/page/doctors";
import Patients from "@/page/patients";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/index",
      name: "Index",
      component: Index
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/departments",
      name: "Departments",
      component: Departments
    },
    {
      path: "/patients",
      name: "Patients",
      component: Patients
    },
    {
      path: "/doctors",
      name: "Doctors",
      component: Doctors
    },
    {
      path: "/wards",
      name: "Wards",
      component: Wards
    }
  ]
});

router.beforeEach((to, from, next) => {
  let login = parseInt(sessionStorage.login);
  let path = to.path;
  if (path === "/") {
    next();
    return;
  }

  if (login) {
    next();
  } else {
    next({
      path: "/"
    });
  }
});

export default router;
