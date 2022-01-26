<template>
  <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
    <RadioGroup>
      <RadioGroupLabel class="sr-only"> Message History </RadioGroupLabel>
      <div>
        <RadioGroupOption v-for="item in this.messages" :key="item.id">
          <Message :item="item" />
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import Message from "./Message.vue";

const items = [
  {
    id: 1,
    author: "jane.near",
    message: "Thanks for helping me with my first smart contract!",
    tip: "2 N",
  },
  {
    id: 2,
    author: "john.near",
    message: "Appreciate your questions in the Zoom meeting",
    tip: "",
  },
  {
    id: 3,
    author: "mary.near",
    message: "Loved your examples today, thank you!!!",
    tip: "10 N",
  },
  {
    id: 4,
    author: "",
    message: "You're so awesome",
    tip: "",
  },
];

export default {
  props: {
    messages: {
      typeof: Array,
      required: false,
    },
  },
  setup(props) {
    return {
      items,
    };
  },
  components: {
    Message,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  methods: {},
};
</script>