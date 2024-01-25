<template>
  <nav>
    <img src="/logo.svg" class="logo" width="182px" />
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <NuxtLink :to="item.link">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
    <div class="phone">
      <Icon name="solar:phone-bold" size="24px" /> +7 979 700 97 91
    </div>
    <ActionButton
      rounded
      icon="heroicons:shopping-bag-solid"
      @click="$emit('onCartClick')"
      iconSize="24px"
    />
    <template v-if="authorizedUser">
      <NuxtLink to="/profile">
        <div class="profileCircle" v-if="store.userProfile !== null">
          {{ store.userProfile.name }}
        </div>
      </NuxtLink>

      <ActionButton rounded @click="$emit('onLogoutClick')">
        Выйти
      </ActionButton>
    </template>
    <template v-else>
      <ActionButton rounded @click="$emit('onAuthorizationClick')">
        Войти
      </ActionButton>
    </template>
  </nav>
</template>

<script setup lang="ts">
const emit = defineEmits([
  "onCartClick",
  "onAuthorizationClick",
  "onLogoutClick",
]);

const menuItems = [
  { name: "menu", label: "Меню", link: "/" },
  { name: "delivery", label: "Доставка", link: "/delivery" },
  { name: "promos", label: "Акции", link: "/promos" },
  { name: "feedback", label: "Отзывы", link: "/feedback" },
  { name: "contacts", label: "Контакты", link: "/contacts" },
];

const authorizedUser = useSupabaseUser();

const store = useAppStore();
if (authorizedUser) {
  store.getUserProfile();
}
</script>

<style lang="scss">
nav {
  height: 62px;
  background: rgba(6, 45, 78, 1);
  padding: 20px 0;
  display: flex;
  align-items: center;
  color: white;

  .logo {
    margin-top: 50px;
  }

  ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;

      &:first-child {
        &::before {
          display: none;
        }
      }

      &::before {
        display: block;
        content: "";
        height: 4px;
        width: 4px;
        margin-right: 16px;
        border-radius: 100%;
        background-color: white;
      }

      a {
        text-decoration: none;
        color: white;
      }
    }
  }

  .phone {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
</style>
