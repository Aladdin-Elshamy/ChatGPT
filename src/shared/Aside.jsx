import Feature from "@/components/Feature";
import {
  Add,
  Delete,
  Discord,
  Enlarge,
  Light,
  Logout,
} from "@/utils/icons.util";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Aside({ setChat }) {
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
      <div className={`h-4/6 w-[95%] mx-auto mt-2 border-b border-bright`}>
        <button className="border border-bright flex gap-4 p-4 rounded-md items-center w-full">
          <Add classes="w-2 h-2" />
          <p>New chat</p>
        </button>
        <div
          className={`${
            window.location.pathname === "/start" ? "hidden" : ""
          } bg-[#343540] border border-bright flex gap-[15px] p-4 rounded-md items-center w-full mt-3`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M13 9C13 9.35362 12.8595 9.69276 12.6095 9.94281C12.3594 10.1929 12.0203 10.3333 11.6667 10.3333H3.66667L1 13V2.33333C1 1.97971 1.14048 1.64057 1.39052 1.39052C1.64057 1.14048 1.97971 1 2.33333 1H11.6667C12.0203 1 12.3594 1.14048 12.6095 1.39052C12.8595 1.64057 13 1.97971 13 2.33333V9Z"
              stroke="#C5C5D1"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="truncate">Chatbot definition explaination</p>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M7 12.4142H13"
              stroke="#C5C5D1"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 1.41421C10.2652 1.149 10.6249 1 11 1C11.1857 1 11.3696 1.03658 11.5412 1.10765C11.7128 1.17872 11.8687 1.28289 12 1.41421C12.1313 1.54554 12.2355 1.70144 12.3066 1.87302C12.3776 2.0446 12.4142 2.2285 12.4142 2.41421C12.4142 2.59993 12.3776 2.78383 12.3066 2.95541C12.2355 3.12699 12.1313 3.28289 12 3.41421L3.66667 11.7475L1 12.4142L1.66667 9.74755L10 1.41421Z"
              stroke="#C5C5D1"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M1 3.40002H2.2H11.8"
              stroke="#C5C5D1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.6 3.4V11.8C10.6 12.1183 10.4735 12.4235 10.2485 12.6485C10.0234 12.8736 9.71821 13 9.39995 13H3.39995C3.08169 13 2.77647 12.8736 2.55142 12.6485C2.32638 12.4235 2.19995 12.1183 2.19995 11.8V3.4M3.99995 3.4V2.2C3.99995 1.88174 4.12638 1.57652 4.35142 1.35147C4.57647 1.12643 4.88169 1 5.19995 1H7.59995C7.91821 1 8.22344 1.12643 8.44848 1.35147C8.67352 1.57652 8.79995 1.88174 8.79995 2.2V3.4"
              stroke="#C5C5D1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.20007 6.40002V10"
              stroke="#C5C5D1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.59998 6.40002V10"
              stroke="#C5C5D1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>
        <ul className="flex flex-col font-normal gap-2 mt-2 mb-4 rounded-md bg-sideBg dark:border-gray-700">
          <li>
            <button
              className="block py-2 px-3 hover:bg-gray-700 w-full"
              onClick={() => setChat([])}
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
          <li>
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
          </li>
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
