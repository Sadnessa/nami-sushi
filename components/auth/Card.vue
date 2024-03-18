<template>
  <div class="authCard">
    <div class="authCard__title">
      <h2>{{ currentView === "SignIn" ? "Вход" : "Регистрация" }}</h2>
    </div>
    <LoaderBar v-if="loading" />
    <template v-else>
      <div class="authCard__content">
        <template v-if="currentView === 'SignIn'">
          <InputText
            v-for="(input, field) in signInInputs"
            :key="field"
            v-model="input.value"
            :placeholder="input.placeholder"
            :rules="[(val: string) => val.length > 0 || 'Заполните поле']"
          >
            <template #prepend>
              <Icon :name="input.icon" size="18px" />
            </template>
            <template #append v-if="field === 'password'">
              <Icon name="ph:eye-bold" size="18px" />
            </template>
          </InputText>
        </template>
        <template v-else-if="currentView === 'SignUp'">
          <InputText
            v-for="(input, field) in signUpInputs"
            :key="field"
            v-model="input.value"
            :placeholder="input.placeholder"
          >
            <template #prepend>
              <Icon :name="input.icon" size="18px" />
            </template>
            <template
              #append
              v-if="field === 'password' || field === 'repeatPassword'"
            >
              <Icon name="ph:eye-bold" size="18px" />
            </template>
          </InputText>
        </template>
      </div>
      <div class="authCard__actions">
        <template v-if="currentView === 'SignIn'">
          <ActionButton
            textColor="white"
            background="#312525"
            @click="signInUser"
          >
            Войти
          </ActionButton>
          <p @click="changeCurrentView">Нет аккаунта? Зарегистрируйтесь!</p>
        </template>
        <template v-else-if="currentView === 'SignUp'">
          <ActionButton
            textColor="white"
            background="#312525"
            @click="signUpUser"
          >
            Зарегистрироваться
          </ActionButton>
          <p @click="changeCurrentView">Есть существующий аккаунт?</p>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["userAuthorized"]);

const currentView = ref<"SignIn" | "SignUp">("SignIn");

const signInInputs = reactive({
  email: {
    value: "",
    placeholder: "Электронная почта",
    icon: "eva:email-outline",
  },
  password: { value: "", placeholder: "Пароль", icon: "mdi:password-outline" },
});

const signUpInputs = reactive({
  userName: {
    value: "",
    placeholder: "Имя",
    icon: "majesticons:user-line",
  },

  email: {
    value: "",
    placeholder: "Электронная почта",
    icon: "eva:email-outline",
  },

  phone: {
    value: "",
    placeholder: "Номер телефона",
    icon: "solar:phone-outline",
  },
  password: { value: "", placeholder: "Пароль", icon: "mdi:password-outline" },
  repeatPassword: {
    value: "",
    placeholder: "Подтверждение пароля",
    icon: "mdi:password-outline",
  },
});

const changeCurrentView = () => {
  if (currentView.value === "SignIn") {
    currentView.value = "SignUp";
  } else if (currentView.value === "SignUp") {
    currentView.value = "SignIn";
  } else {
    throw new Error("d");
  }
};

const supabase = useSupabaseClient();

const loading = ref(false);

const signInUser = async () => {
  loading.value = true;
  const { data: registerData, error: registerError } =
    await supabase.auth.signInWithPassword({
      email: signInInputs.email.value,
      password: signInInputs.password.value,
    });

  if (registerError) {
    throw new Error(`${registerError.message}`);
  }
  loading.value = false;
  emit("userAuthorized");
};

const signUpUser = async () => {
  loading.value = true;
  await $fetch("/api/register", {
    method: "post",
    body: {
      name: signUpInputs.userName.value,
      email: signUpInputs.email.value,
      password: signUpInputs.password.value,
      phone: signUpInputs.phone.value,
    },
  });
  loading.value = false;
  emit("userAuthorized");
};
</script>

<style lang="scss" scoped>
.authCard {
  display: flex;
  flex-direction: column;

  &__actions {
    display: flex;
    flex-direction: column;
  }
}
</style>
