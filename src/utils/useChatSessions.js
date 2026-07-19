import { useEffect, useMemo, useRef, useState } from "react";

export const MAX_CHATS = 5;
export const MAX_MESSAGES_PER_CHAT = 50;

const CHAT_STORAGE_KEY = "chatgpt-clone-chats";
const ACTIVE_CHAT_STORAGE_KEY = "chatgpt-clone-active-chat-id";

function createChatId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
}

function getChatTitle(messages) {
  const firstPrompt = messages.find((message) => message.prompt)?.prompt;

  if (!firstPrompt) {
    return "New chat";
  }

  return firstPrompt.length > 35
    ? `${firstPrompt.slice(0, 35)}...`
    : firstPrompt;
}

function createChat(messages = []) {
  return {
    id: createChatId(),
    title: getChatTitle(messages),
    messages,
  };
}



function loadSavedChats() {
  try {
    const savedChats = localStorage.getItem(CHAT_STORAGE_KEY);

    if (!savedChats) {
      return null;
    }

    return JSON.parse(savedChats);
  } catch {
    localStorage.removeItem(CHAT_STORAGE_KEY);
    return null;
  }
}

function loadSavedActiveChatId(chats) {
  try {
    const savedActiveChatId = localStorage.getItem(ACTIVE_CHAT_STORAGE_KEY);

    if (chats.some((chat) => chat.id === savedActiveChatId)) {
      return savedActiveChatId;
    }

    return chats[0].id;
  } catch {
    return chats[0].id;
  }
}

export function useChatSessions(initialMessages = []) {
  const [initialChat] = useState(() => createChat(initialMessages));
  const [savedChats] = useState(() => loadSavedChats());
  const initialChats = savedChats || [initialChat];
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatIdState] = useState(() =>
    loadSavedActiveChatId(initialChats),
  );
  const activeChatIdRef = useRef(activeChatId);
  const [chatLimitError, setChatLimitError] = useState("");

  function setActiveChatId(chatId) {
    activeChatIdRef.current = chatId;
    setActiveChatIdState(chatId);
  }

  const activeChat = useMemo(() => {
    return chats.find((chat) => chat.id === activeChatId) || chats[0];
  }, [activeChatId, chats]);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(ACTIVE_CHAT_STORAGE_KEY, activeChatId);
    }
  }, [activeChatId]);

  function handleNewChat() {
    if (chats.length >= MAX_CHATS) {
      setChatLimitError(`You can only create up to ${MAX_CHATS} chats.`);
      return;
    }

    const newChat = createChat();

    setChats((currentChats) => [newChat, ...currentChats]);
    setActiveChatId(newChat.id);
    setChatLimitError("");
  }

  function handleSelectChat(chatId) {
    setActiveChatId(chatId);
    setChatLimitError("");
  }

  function handleDeleteChat(chatId) {
    setChats((currentChats) => {
      const remainingChats = currentChats.filter((chat) => chat.id !== chatId);

      if (remainingChats.length === 0) {
        const newChat = createChat();
        setActiveChatId(newChat.id);
        setChatLimitError("");
        return [newChat];
      }

      if (chatId === activeChatId) {
        setActiveChatId(remainingChats[0].id);
      }

      setChatLimitError("");
      return remainingChats;
    });
  }

  function setActiveChatMessages(updater) {
    setChats((currentChats) => {
      const currentActiveChatId = activeChatIdRef.current;
      const activeChat = currentChats.find(
        (chat) => chat.id === currentActiveChatId,
      );

      if (!activeChat) {
        return currentChats;
      }

      const nextMessages =
        typeof updater === "function" ? updater(activeChat.messages) : updater;

      if (!Array.isArray(nextMessages)) {
        return currentChats;
      }

      const isAddingNewMessages =
        nextMessages.length > activeChat.messages.length;
      const isAboveMessageLimit =
        activeChat.messages.length >= MAX_MESSAGES_PER_CHAT &&
        isAddingNewMessages;

      if (!isAboveMessageLimit) {
        setChatLimitError("");

        return currentChats.map((chat) => {
          if (chat.id !== currentActiveChatId) {
            return chat;
          }

          return {
            ...chat,
            title: getChatTitle(nextMessages),
            messages: nextMessages.slice(0, MAX_MESSAGES_PER_CHAT),
          };
        });
      }

      if (currentChats.length >= MAX_CHATS) {
        setChatLimitError(
          `This chat reached ${MAX_MESSAGES_PER_CHAT} messages and you already have ${MAX_CHATS} chats. Delete or clear a chat to continue.`,
        );
        return currentChats;
      }

      const overflowMessages = nextMessages.slice(activeChat.messages.length);
      const newChat = createChat(overflowMessages);

      setActiveChatId(newChat.id);
      setChatLimitError(
        `This chat reached ${MAX_MESSAGES_PER_CHAT} messages. A new chat was started.`,
      );

      return [newChat, ...currentChats];
    });
  }

  function handleClearActiveChat() {
    setActiveChatMessages([]);
  }

  return {
    activeChat,
    activeChatId,
    chatLimitError,
    chats,
    handleClearActiveChat,
    handleDeleteChat,
    handleNewChat,
    handleSelectChat,
    setActiveChatMessages,
  };
}
