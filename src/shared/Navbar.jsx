import Feature from "@/components/Feature";
import { Add, Delete, Light, Logout } from "@/utils/icons.util";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

export default function Navbar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onClearActiveChat,
  chatLimitError,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  function handleLogout() {
    Cookies.remove("token");
    Cookies.remove("email");
    window.location.replace("/login");
  }

  function handleNewChatClick() {
    onNewChat();
    if (chats.length < 5) {
      setIsMenuOpen(false);
    }
  }

  function handleSelectChat(chatId) {
    onSelectChat(chatId);
    setIsMenuOpen(false);
  }

  return (
    <nav className="lg:hidden bg-background dark:border-gray-500 border-b sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center justify-center w-fit text-sm text-white rounded-lg focus:outline-none"
          aria-controls="navbar-hamburger"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <p className="text-white">New chat</p>
        <button onClick={handleNewChatClick}>
          <Add />
        </button>
        <div
          className={`${isMenuOpen ? "block" : "hidden"} w-full`}
          id="navbar-hamburger"
        >
          <ul className="flex flex-col gap-2 font-normal p-2 mt-4 rounded-md bg-sideBg dark:border-gray-700">
            {chatLimitError && (
              <li>
                <p className="px-3 py-2 text-xs text-red-400">
                  {chatLimitError}
                </p>
              </li>
            )}

            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  className={`${
                    activeChatId === chat.id
                      ? "bg-[#343540]"
                      : "hover:bg-[#343540]"
                  } border gap-4 border-bright flex justify-between p-4 rounded-md items-center w-full`}
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4 text-left">
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
              </li>
            ))}

            <li>
              <button
                className="block py-2 px-3 focus:bg-gray-700 w-full"
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
                className="block py-2 px-3 focus:bg-gray-700 w-full"
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
              <button className="block py-2 px-3 focus:bg-gray-700 w-full">
                <Feature>
                  <Discord />
                  <p className="text-white">OpenAI Discord</p>
                </Feature>
              </button>
            </li> */}
            {/* <li>
              <button className="block py-2 px-3 focus:bg-gray-700 w-full">
                <Feature>
                  <Enlarge />
                  <p className="text-white">Updates & FAQ</p>
                </Feature>
              </button>
            </li> */}
            <li>
              <button
                className="block py-2 px-3 focus:bg-gray-700 w-full"
                onClick={handleLogout}
              >
                <Feature>
                  <Logout />
                  <p className="text-white">Log out</p>
                </Feature>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
