import TelegramBot from "node-telegram-bot-api";

const botToken = process.env.TELEGRAM_BOT_TOKEN as string;
export const bot = new TelegramBot(botToken);

import { addSubscriber, removeSubscriber, getSubscribers } from "./subscribers";

// Handle `/subscribe` command
bot.onText(/\/subscribe/, (msg) => {
  const chatId = msg.chat.id;
  if (addSubscriber(chatId)) {
    bot.sendMessage(
      chatId,
      "You are now subscribed to wallet balance notifications!"
    );
  } else {
    bot.sendMessage(chatId, "You are already subscribed.");
  }
});

// Handle `/unsubscribe` command
bot.onText(/\/unsubscribe/, (msg) => {
  const chatId = msg.chat.id;
  if (removeSubscriber(chatId)) {
    bot.sendMessage(
      chatId,
      "You have unsubscribed from wallet balance notifications."
    );
  } else {
    bot.sendMessage(chatId, "You are not subscribed.");
  }
});

// Notify all subscribers
export const notifySubscribers = async (message: string) => {
  const subscribers = getSubscribers();
  for (const chatId of subscribers) {
    try {
      await bot.sendMessage(chatId, message);
    } catch (error) {
      console.error(`Error notifying chatId ${chatId}:`, error);
    }
  }
};
