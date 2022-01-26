<template>
  <div>
    <div class="shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="text-left pb-6">
          <p class="text-lg leading-6 font-medium text-gray-700">
            Record your message on the blockchain
          </p>
          <p class="mt-2 text-base text-gray-500">
            No better way to say "Thanks!" than to make it permanent.
          </p>
          <p class="mt-2 text-base text-gray-500">You can do that right here.</p>
        </div>

        <div class="grid grid-cols-6 gap-6">
          <!--div class="col-span-6">
            <Multiselect
              v-model="recipient"
              mode="single"
              placeholder="Recipient name"
              :options="this.recipients"
              :search="true"
            />
          </div-->
          <div class="col-span-6">
            <label for="recipient" class="sr-only">Recipient name</label>
            <input type="text"  name="recipient" id="recipient" autocomplete="recipient" placeholder="Recipient name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div class="col-span-6">
            <label for="message" class="sr-only">Your message</label>
            <textarea
              v-model="message"
              rows="4"
              id="message"
              autocomplete="message"
              placeholder="Your message"
              class="
                mt-1
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                shadow-sm
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <div class="col-span-6">
            <SwitchGroup as="div" class="flex items-center">
              <Switch
                v-model="anonymous"
                :class="[
                  anonymous ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                ]"
              >
                <span
                  aria-hidden="true"
                  :class="[
                    anonymous ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  ]"
                />
              </Switch>
              <SwitchLabel as="span" class="ml-3">
                <span class="text-sm font-medium text-gray-900"
                  >Send anonymously
                </span>
              </SwitchLabel>
            </SwitchGroup>
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-3">
            <label for="tip" class="sr-only">Tip</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div
                class="
                  absolute
                  inset-y-0
                  left-0
                  pl-3
                  flex
                  items-center
                  pointer-events-none
                "
              >
                <span class="text-gray-500 sm:text-sm"> Ⓝ </span>
              </div>
              <input
                type="text"
                v-model="attachedDeposit"
                id="tip"
                class="
                  focus:ring-indigo-500 focus:border-indigo-500
                  block
                  w-full
                  pl-7
                  pr-12
                  sm:text-sm
                  border-gray-300
                  rounded-md
                "
                placeholder="0"
                aria-describedby="message-tip"
              />
              <div
                class="
                  absolute
                  inset-y-0
                  right-0
                  pr-3
                  flex
                  items-center
                  pointer-events-none
                "
              >
                <span class="text-gray-500 sm:text-sm" id="message-tip">
                  NEAR
                </span>
              </div>
            </div>
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-3">
            <button
              @click="handleSubmit"
              class="
                py-2
                px-4
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
              Say Thanks
            </button>
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-3">
            <button
              @click="handleTransfer"
              class="
                py-2
                px-4
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
              Transfer to owner
            </button>
          </div>
        </div>
      </div>
    </div>

    <Loading
      v-model:active="loading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
  </div>
</template>

<script>
import { ref } from "vue";
// import Multiselect from "@vueform/multiselect";
import Loading from 'vue-loading-overlay';
import "@vueform/multiselect/themes/default.css";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default {
  components: {
    Loading,
    // Multiselect,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  props: {
    recipients: {
      typeof: Array,
      required: false,
    },
    isRecipientsLoaded: {
      typeof: Boolean,
      required: true,
    },
    sendMessage: {
      type: Function,
      required: true,
    },
    transferFunds: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const message = ref("");
    const anonymous = ref(false);
    const attachedDeposit = ref(0);
    const fullPage = ref(true);
    const loading = ref(false);

    const handleSubmit = () => {
      loading.value = true;
      props.sendMessage({
        message: message.value,
        anonymous: anonymous.value,
        attachedDeposit: attachedDeposit.value,
      });
      loading.value = false;
    };

    const handleTransfer = () => {
      console.log("inside trasnfer");
      props.transferFunds();
    };

    return {
      message,
      anonymous,
      attachedDeposit,
      fullPage,
      loading,
      handleSubmit,
      handleTransfer,
    };
  },
};
</script>