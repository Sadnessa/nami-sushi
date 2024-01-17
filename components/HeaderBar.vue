<template>
  <nav>
    <img src="/logo.svg" class="logo" width="182px"/>
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <NuxtLink :to="item.link">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
    <div class="phone"> <img src="/phone.svg"/>  +7 979 700 97 91</div>
    <ActionButton rounded icon="/icon-cart.svg" @click="$emit('onCartClick')"/>
    <ActionButton rounded @click="$emit('onLoginClick')">Войти</ActionButton>
  </nav>
</template>

<script setup>
const emit = defineEmits(['onCartClick', 'onLoginClick'])

const menuItems = [
  { name: "menu", label: "Меню", link: "/" },
  { name: "delivery", label: "Доставка", link: "/delivery" },
  { name: "promos", label: "Акции", link: "/promos" },
  { name: "feedback", label: "Отзывы", link: "/feedback" },
  { name: "contacts", label: "Контакты", link: "/contacts" },
];
</script>

<style lang="scss">
nav {
  height: 62px;
  background: rgba(6, 45, 78, 1);
  padding: 20px 0;
  // position: fixed;
  // width: 100%;
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
