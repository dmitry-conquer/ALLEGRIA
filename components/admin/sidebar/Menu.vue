<template>
  <ul>
    <AdminSidebarMenuItem
      v-for="(item, index) in menu"
      :key="index"
      :icon="item.icon"
      :text="item.text"
      :link="item.link" />
  </ul>
</template>

<script setup>
import AdminIconDashboard from "~/components/admin/icon/Dashboard.vue";
import AdminIconPay from "~/components/admin/icon/Pay.vue";
import AdminIconUsers from "~/components/admin/icon/Users.vue";
import AdminIconContent from "~/components/admin/icon/Content.vue";
import AdminIconSettings from "~/components/admin/icon/Settings.vue";

const menu = [
  {
    icon: AdminIconDashboard,
    text: "Товари",
    link: "/admin/products",
  },
  {
    icon: AdminIconPay,
    text: "Продажі",
    link: "/admin/sales",
  },
  {
    icon: AdminIconUsers,
    text: "Користувачі",
    link: "/admin/users",
  },
  {
    icon: AdminIconContent,
    text: "Наповнення сайту",
    link: "/admin/pages",
  },
  {
    icon: AdminIconSettings,
    text: "Налаштування",
    link: "/admin/site-settings",
  },
];
</script>
