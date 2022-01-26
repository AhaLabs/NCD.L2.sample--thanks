import { ref, onMounted } from "vue";
import {
  getRecipients,
  getMessages,
  transfer,
  sendMessage,
} from "../services/near";

export const useRecipients = () => {
  const recipients = ref([]);
  const messages = ref([]);
  const err = ref(null);

  onMounted(async () => {
    try {
      recipients.value = await getRecipients();
      console.log(recipients.value);
      messages.value = await getMessages();
      console.log(messages.value);
    } catch (e) {
      err.value = e;
      console.log(e.value);
    }
  });

  const handleSendMessage = async ({ message, anonymous, attachedDeposit }) => {
    sendMessage({ message, anonymous, attachedDeposit });
  };

  const handleTransfer = async () => {
    transfer();
  };

  return {
    recipients,
    messages,
    sendMessage: handleSendMessage,
    transferFunds: handleTransfer,
  };
};
