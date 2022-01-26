<template>
  <div class="px-5 flex w-1/2 justify-end items-center">
    <div v-if="accountId">
      <div class="flex items-center justify-between">
        <div
          class="
            flex
            items-center
            justify-center
            h-12
            w-36
            rounded-md
            bg-indigo-500
            text-white
            mx-2
          "
        >
          <UserIcon class="w-6 h-6 text-black-500" />
          <h4 class="mr-2">{{ accountId }}</h4>
        </div>
        <!-- <div class="flex items-center justify-center h-12 w-32 rounded-md bg-indigo-500 text-white mx-2">
              <CashIcon  class="w-6 h-6 text-black-500 mx-2"/>
              <span class="mx-1 text-white-500 font-bold sm:text-sm ">
                       {{balance}} Ⓝ
                </span>
            </div> -->
        <div
          class="
            flex
            items-center
            justify-center
            h-12
            w-12
            rounded-md
            bg-indigo-500
            text-white
            mx-2
          "
        >
          <LogoutIcon class="w-6 h-6 text-black-500" @click="signOut" />
        </div>
      </div>
    </div>
    <button
      v-else
      @click="signIn"
      class="
        self-end
        rounded-3xl
        py-3
        px-10
        border border-transparent
        shadow-sm
        text-sm
        font-medium
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
    >
      Login
    </button>
  </div>
</template>

<script>
import { UserIcon, LogoutIcon } from "@heroicons/vue/outline";
import { ref } from "vue";
import { wallet, CONTRACT_ID } from "@/services/near";
export default {
  components: {
    UserIcon,
    LogoutIcon,
  },
  setup(props) {
    const accountId = ref("");
    accountId.value = wallet.getAccountId();
    return {
      accountId,
      signIn: () => wallet.requestSignIn(CONTRACT_ID),
      signOut: () => {
        wallet.signOut();
        localStorage.removeItem(
          `near-api-js:keystore:${accountId.value}:testnet`
        );
        accountId.value = wallet.getAccountId();
      },
    };
  },
};
</script>