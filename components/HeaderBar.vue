<template>
  <nav>
    <div class="logoWrapper">
      <Icon
        name="solar:hamburger-menu-linear"
        size="30px"
        v-if="viewport.isLessThan('lg')"
        class="burgerMenu"
      />
      <img
        src="/logo.svg"
        class="logo"
        width="182px"
        v-if="viewport.isGreaterOrEquals('lg')"
      />
      <img src="/logo2.svg" class="logo2" width="100px" v-else />
    </div>
    <ul v-if="viewport.isGreaterOrEquals('lg')">
      <li v-for="item in menuItems" :key="item.name">
        <NuxtLink :to="item.link">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
    <div class="phone">
      <Icon name="solar:phone-bold" size="24px" /> +7 979 700 97 91
    </div>
    <div class="actionButtons">
      <ActionButton
        rounded
        icon="heroicons:shopping-bag-solid"
        @click="$emit('onCartClick')"
        iconSize="24px"
      />
      <template v-if="authorizedUser">
        <NuxtLink to="/profile">
          <div class="profileCircle" v-if="store.userProfile">
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
    </div>
  </nav>
</template>

<script setup lang="ts">
const viewport = useViewport();

const emit = defineEmits([
  "onCartClick",
  "onAuthorizationClick",
  "onLogoutClick",
  "updateNavHeightValue",
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
watch(
  authorizedUser,
  async () => {
    if (authorizedUser.value !== null) {
      await store.getUserProfile();
    } else {
      store.userProfile = null;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
nav {
  height: 62px;
  width: 100%;
  background: rgba(6, 45, 78, 1);
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  position: sticky;
  z-index: 2;
  top: 0;

  .logoWrapper {
    display: flex;
    align-items: center;
    gap: 20px;

    .burgerMenu {
      cursor: pointer;
    }

    .logo {
      margin-top: 50px;
    }
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

  .actionButtons {
    display: flex;
  }
}
</style>
