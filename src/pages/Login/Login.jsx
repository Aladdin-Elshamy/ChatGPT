import { GPTLogo, Google } from "@/utils/icons.util";
import { useState } from "react";
import Cookies from "js-cookie";
import SignUpWithGoogle from "@/Oauth";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  console.log(error);
  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    Cookies.set("email", email, { expires: 7 });
    window.location.replace("/start");
  }
  async function handleGoogleLogin() {
    const result = await SignUpWithGoogle();
    if (result?.error) {
      setError(result.error);
    }
    if (result?.token) {
      Cookies.set("token", result.token, { expires: 7 });
      window.location.replace("/start");
    }
  }

  // function handleMicrosoftLogin() {
  //   setMicrosoftMsg(
  //     "Not available yet, please try with Google account or your email address"
  //   );
  // }
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white text-[#2E3339]">
      <div className="flex flex-col items-center gap-14 w-full">
        <div className="text-[#202123]">
          <GPTLogo />
        </div>

        <div className="sm:w-96 w-full px-7">
          <div className="text-[#2E3339] text-[31px] font-bold text-center">
            Welcome back
          </div>

          <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[#6d6e70]">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#C3C8CF] border rounded p-4 focus:outline-primary"
              />
            </div>
            <button className="text-white text-[15px] font-medium bg-primary w-full py-3 px-2 rounded">
              Continue
            </button>
          </form>

          {error && (
            <div className="text-sm text-red-500 font-medium text-center mt-[14px]">
              {error}
            </div>
          )}

          <div className="h-[1px] bg-[#C3C8CF] mt-7 relative">
            <span className="text-[#2E3339] text-xs absolute left-1/2 -translate-x-1/2 -top-5 bg-white p-3">
              OR
            </span>
          </div>

          {/* <div className="mt-7 flex flex-col gap-2"> */}
          <button
            onClick={handleGoogleLogin}
            className="flex mt-7 items-center border border-[#C3C8CF] px-5 py-3 rounded w-full gap-4 bg-white text-[#2E3339] font-medium hover:bg-gray-50"
          >
            <Google />
            <span>Continue with Google</span>
          </button>
          {/* <button
              onClick={handleMicrosoftLogin}
              className="flex items-center border border-[#C3C8CF] px-5 py-3 rounded w-full gap-4"
            >
              <Microsoft /> Continue with Microsoft Account
            </button> */}
          {/* </div> */}

          {/* {microsoftMsg && (
            <p className="text-sm text-red-500 font-medium text-center mt-[14px]">
              {microsoftMsg}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};
