<template>
  <nav class="inline-flex justify-start border-r pr-4 md:pr-8">
    <ul>
      <li
        v-for="(item, i) in menu"
        :key="i">
        <NuxtLink
          :to="item.link"
          class="flex items-center gap-3 py-2 hover:text-secondary">
          <component
            :is="item.icon"
            class="h-6 w-6" />
          <span class="hidden md:block">{{ item.text }}</span>
        </NuxtLink>
      </li>
      <li>
        <button
          @click="signout"
          class="flex items-center gap-3 py-2 hover:text-secondary"
          type="button">
          <IconExit class="h-6 w-6" />
          <span class="hidden md:block">Вихід</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import Location from "~/components/icon/Location.vue";
import Favorite from "~/components/icon/Favorite.vue";
import Orders from "~/components/icon/Cart.vue";
import Lock from "~/components/icon/Lock.vue";
import Profile from "~/components/icon/Profile.vue";

const client = useSupabaseClient();

const signout = async () => {
  try {
    const { error } = await client.auth.signOut();
    if (error) {
      throw error;
    } else {
      navigateTo("/");
    }
  } catch (error) {
    console.log(error);
  }
};

/*
  menu
*/

const menu = [
  {
    text: "Особиста інформація",
    icon: Profile,
    link: "/profile/general",
  },
  {
    text: "Адреса",
    icon: Location,
    link: "/profile/address",
  },
  {
    text: "Лист побажань",
    icon: Favorite,
    link: "/profile/favorites",
  },
  {
    text: "Історія покупок",
    icon: Orders,
    link: "/profile/orders",
  },
  {
    text: "Змінити пароль",
    icon: Lock,
    link: "/profile/change-pass",
  },
];
</script>

<style lang="scss" scoped>
li {
  padding-left: 6px;
  border-left: 2px solid transparent;
}
li:has(a.router-link-active) {
  color: #df6245;
  border-left: 2px solid #df6245;
}
</style>
