<template>
  <aside class="cartDrawer" :class="computeAnimatonClass">
    <div class="cartDrawer__overlay" @click="hideCart" />
    <div class="cartDrawer__content">
      <template v-if="currentView === 'cart'">
        <CartView @closeCart="hideCart" @placeOrder="showOrderView" />
      </template>
      <template v-else>
        <OrderView />
      </template>
    </div>
  </aside>

  <Transition>
    <ModalWindow v-model="doShowLoginWindow">
      <AuthCard @userAuthorized="hideLoginWindow" />
    </ModalWindow>
  </Transition>

  <div class="currentPage" :class="computeBlur">
    <HeaderBar
      @onCartClick="showCart"
      @onAuthorizationClick="openLoginWindow"
      @onLogoutClick="userLogout"
    />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const currentView = ref("cart");
const doShowCart = ref(false);
const doShowLoginWindow = ref(false);

const showCart = () => {
  doShowCart.value = true;
};

const hideCart = () => {
  if (doShowCart) {
    doShowCart.value = false;
  } else {
    return;
  }
};

const showOrderView = () => {
  currentView.value = "order";
};

const openLoginWindow = () => {
  doShowLoginWindow.value = true;
};

const hideLoginWindow = () => {
  doShowLoginWindow.value = false;
};

const supabase = useSupabaseClient();
const userLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};

const computeAnimatonClass = computed(() => {
  return doShowCart.value ? "" : "hidden";
});

const computeBlur = computed(() => {
  return doShowCart.value || doShowLoginWindow.value ? "blur" : "";
});
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "Neucha", cursive;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.currentPage {
  &.blur {
    position: relative;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(60, 75, 97, 0.5);
      backdrop-filter: blur(10px);
    }
  }
}

aside {
  width: 100%;
  position: fixed;
  z-index: 10;
  right: 0;
  height: 100vh;
  transition: all ease 0.3s;

  .cartDrawer__overlay {
    position: absolute;
    height: 100vh;
    width: 100%;
  }

  .cartDrawer__content {
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 0;
    background-color: rgba(235, 225, 215, 1);
    padding: 40px 45px;
    height: calc(100vh - 80px);
    z-index: 20;
  }

  &.hidden {
    transform: translateX(100%);
  }
}
</style>
