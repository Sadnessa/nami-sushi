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
      <img class="backgroundImg top left" src="/BG-menu1.png" />
      <img class="backgroundImg top right" src="/BG-menu2.png" />
      <img class="backgroundImg bottom left" src="/BG-menu3.png" />
      <NuxtPage />
    </main>
    <footer />
  </div>
</template>

<script setup lang="ts">
const currentView = ref("cart");
const doShowCart = ref(false);
const doShowLoginWindow = ref(false);

watch([doShowLoginWindow, doShowCart], () => {
  if (doShowLoginWindow.value || doShowCart.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

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
  return { hidden: !doShowCart.value };
});

const computeBlur = computed(() => {
  return { blur: doShowCart.value || doShowLoginWindow.value };
});
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "Neucha", cursive;
}

#__nuxt {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  display: flex;
  flex-grow: 1;
  flex-direction: column;

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
      z-index: 3;
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

main {
  position: relative;
  overflow: hidden;
  flex-grow: 1;

  .backgroundImg {
    position: absolute;
    z-index: -1;

    &.top {
      top: 0;
    }

    &.right {
      right: 0;
    }

    &.top.right {
      width: 20%;
    }

    &.top.left {
      width: 30%;
    }

    &.bottom.left {
      width: 10%;
    }

    &.left {
      left: 0;
    }

    &.bottom {
      bottom: 0;
    }
  }
}

footer {
  height: 40px;
  background-color: #243139;
}
</style>
