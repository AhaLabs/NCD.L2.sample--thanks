<template>
  <div>
    <div id="nav" class="py-4 p-0 flex justify-end">
      <div class="flex w-1/2 justify-end items-center list-none">
        <Login />
      </div>
    </div>
    <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <svg
          class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
          />
        </svg>

        <Header />

        <div
          class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <info />
          <message-form
            :recipients="recipients"
            :isRecipientsLoaded="isRecipientsLoaded"
            :sendMessage="sendMessage"
            :transferFunds="transferFunds"
          />
        </div>

        <svg
          class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>

        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div
            class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center"
          >
            <LearnSection />
            <MessageHistory v-if="accountId" :messages="messages" />
            <MessageHistory v-else :messages="history" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { wallet, CONTRACT_ID } from "@/services/near";
import Login from "@/components/Login.vue";
import Header from "@/components/Header.vue";
import Info from "@/components/Info.vue";
import MessageForm from "@/components/MessageForm.vue";
import LearnSection from "@/components/LearnSection.vue";
import MessageHistory from "@/components/MessageHistory.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useRecipients } from "@/composables/near";

export default {
  data() {
    return {
      isRecipientsLoaded: false,
      history: [
        {
          id: 1,
          sender: "jane.near",
          text: "Thanks for helping me with my first smart contract!",
          contribution: 2000000000000000000000000,
        },
        {
          id: 2,
          sender: "john.near",
          text: "Appreciate your questions in the Zoom meeting",
          contribution: 0,
        },
        {
          id: 3,
          sender: "mary.near",
          text: "Loved your examples today, thank you!!!",
          contribution: 10000000000000000000000000,
        },
        {
          id: 4,
          sender: "",
          text: "You're so awesome",
          contribution: 0,
        },
      ],
    };
  },
  components: {
    Header,
    Info,
    MessageForm,
    LearnSection,
    MessageHistory,
    Login,
    //Loading
  },
  setup(props) {
    const accountId = wallet.getAccountId();
    const {
      recipients,
      messages,
      sendMessage,
      transferFunds,
    } = useRecipients();

    return {
      accountId,
      recipients,
      messages,
      sendMessage,
      transferFunds,
    };
  },
};
</script>
