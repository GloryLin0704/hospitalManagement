import Vue from "vue";
import Router from "vue-router";
import Index from "@/page/index";
import Departments from "@/page/departments";
import Wards from "@/page/wards";
import Doctors from "@/page/doctors";
import Patients from "@/page/patients";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
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
