import React, { useEffect } from "react";
import useUser from "../context/userContext";

const Notification = () => {
  const { notification, setNotification } = useUser();

  if (!notification) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="fixed inset-x-0 top-4 flex justify-center z-[9999]">

      <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
        <div
          className={`"succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg ${notification.type == "error" ? "bg-red-300" : "bg-green-300"} px-[10px]`}
        >
          <div className="flex gap-2">
            <div className={`${notification.type == "error" ? "text-[#ca1717]" : "text-[#0ed495]"} bg-white backdrop-blur-xl p-1 rounded-lg`}>
              {notification.type == "error" ? <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  ></path>
                </svg>
                :
                 <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                ></path>
              </svg>  
              }
            </div>
            <div>
              <p className="text-black">{notification?.message}</p>
              <p className="text-gray-500">{notification?.desc}</p>
            </div>
          </div>
          <button onClick={() => setNotification(null)}
            className="text-black p-1 cursor-pointer rounded-md transition-colors ease-linear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Notification;
