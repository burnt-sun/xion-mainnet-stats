const subscribers = new Set<number>();

export const addSubscriber = (chatId: number): boolean => {
  if (!subscribers.has(chatId)) {
    subscribers.add(chatId);
    return true;
  }
  return false;
};

export const removeSubscriber = (chatId: number): boolean => {
  if (subscribers.has(chatId)) {
    subscribers.delete(chatId);
    return true;
  }
  return false;
};

export const getSubscribers = (): number[] => {
  return Array.from(subscribers);
};
