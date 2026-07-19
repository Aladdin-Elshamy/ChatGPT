import Feature from "@/components/Feature";
import {
  Add,
  Delete,
  Light,
  Logout,
} from "@/utils/icons.util";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function ChatIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M13 9C13 9.35362 12.8595 9.69276 12.6095 9.94281C12.3594 10.1929 12.0203 10.3333 11.6667 10.3333H3.66667L1 13V2.33333C1 1.97971 1.14048 1.64057 1.39052 1.39052C1.64057 1.14048 1.97971 1 2.33333 1H11.6667C12.0203 1 12.3594 1.14048 12.6095 1.39052C12.8595 1.64057 13 1.97971 13 2.33333V9Z"
        stroke="#C5C5D1"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Aside({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onClearActiveChat,
  chatLimitError,
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  function handleLogout() {
    Cookies.remove("token");
    Cookies.remove("email");
    window.location.replace("/login");
  }

  return (
    <aside className="hidden fixed left-0 h-screen z-50 lg:block bg-sideBg w-1/5 text-sm">
      <div className="h-4/6 w-[95%] mx-auto mt-2 border-b border-bright">
        <button
          className="border border-bright flex gap-4 p-4 rounded-md items-center w-full"
          onClick={onNewChat}
        >
          <Add classes="w-2 h-2" />
          <p>New chat</p>
        </button>

        {chatLimitError && (
          <p className="mt-2 text-xs text-red-400">{chatLimitError}</p>
        )}

        <div className="mt-3 flex flex-col gap-2 overflow-y-auto max-h-[calc(100%-4rem)]">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className={`${
                activeChatId === chat.id ? "bg-[#343540]" : "hover:bg-[#343540]"
              } border border-bright flex gap-[15px] p-4 rounded-md items-center w-full`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex min-w-0 flex-1 items-center gap-[15px] text-left">
                <ChatIcon />
                <p className="truncate">{chat.title}</p>
              </div>

              <button
                type="button"
                className="cursor-pointer text-[#C5C5D1] hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                aria-label={`Delete ${chat.title}`}
              >
                <Delete />
              </button>
            </button>
          ))}
        </div>
      </div>
      <div>
        <ul className="flex flex-col font-normal gap-2 mt-2 mb-4 rounded-md bg-sideBg dark:border-gray-700">
          <li>
            <button
              className="block py-2 px-3 hover:bg-gray-700 w-full"
              onClick={onClearActiveChat}
            >
              <Feature>
                <Delete />
                <p className="text-white">Clear conversations</p>
              </Feature>
            </button>
          </li>
          <li>
            <button
              className="block py-2 px-3 hover:bg-gray-700 w-full"
              onClick={handleThemeToggle}
            >
              <Feature>
                <Light />
                <p className="text-white">
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </p>
              </Feature>
            </button>
          </li>
          {/* <li>
            <button className="block py-2 px-3 hover:bg-gray-700 w-full">
              <Feature>
                <Discord />
                <p className="text-white">OpenAI Discord</p>
              </Feature>
            </button>
          </li>
          <li>
            <button className="block py-2 px-3 hover:bg-gray-700 w-full">
              <Feature>
                <Enlarge />
                <p className="text-white">Updates & FAQ</p>
              </Feature>
            </button>
          </li> */}
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-3 hover:bg-gray-700 w-full"
            >
              <Feature>
                <Logout />
                <p className="text-white">Log out</p>
              </Feature>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
