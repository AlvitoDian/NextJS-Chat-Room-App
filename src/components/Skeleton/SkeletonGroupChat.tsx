export default function SkeletonGroupChat() {
  return (
    <div className="px-10 py-10">
      <div className="flex justify-center">
        {/* Chat Field */}
        <div className="max-w-xl w-full rounded-lg shadow-lg h-[735px] relative">
          <div className="flex bg-[#906bfa] rounded-t-lg drop-shadow-lg z-[99]">
            {/* Grup Icon */}
            <div className="flex justify-center items-center px-4">
              <div className="animate-pulse flex items-center justify-center w-10 h-10 bg-gray-300 rounded rounded-full">
                <svg
                  className="w-5 h-5 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </div>
            {/* Grup Members */}
            <div className="py-2 flex flex-col text-white animate-pulse">
              <div className="font-bold text-lg flex content-center">
                <div className="h-2 bg-gray-200 rounded-full w-48 my-2" />
              </div>
              <div className="font-bold text-lg flex content-center">
                <div className="h-2 bg-gray-200 rounded-full sm:w-5 lg:w-20 my-2 mr-3" />
                <div className="h-2 bg-gray-200 rounded-full sm:w-5 lg:w-20 my-2 mr-3" />
                <div className="h-2 bg-gray-200 rounded-full sm:w-5 lg:w-20 my-2 mr-3" />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-5 ">
            <div
              className="animate-pulse flex flex-col -ml-5 px-5 w-70 h-[615px] absolute bottom-4 mb-10 overflow-auto w-full custom-scrollbar flex justify-center items-center"
              id="style-3"
              style={{
                backgroundImage: `url('/pattern.png')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#6F3EFC]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
            {/* Field Typing */}
            <div className="absolute bottom-0 w-full -ml-5">
              <form>
                <div className="flex items-center px-3 py-2 rounded-b-lg bg-[#906BFA]">
                  {/*  Button Image */}
                  <label
                    htmlFor="image-upload"
                    className="inline-flex justify-center px-2 text-gray-500 rounded-lg cursor-pointer mr-3"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        fill="white"
                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                      />
                      <path
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                      <path
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                      />
                    </svg>
                    <span className="sr-only">Upload image</span>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                  />

                  {/*  Button Image End */}
                  <textarea
                    id="chat"
                    rows={1}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg shadow"
                    placeholder="Ketik pesan..."
                  />
                  <button
                    type="submit"
                    className="inline-flex justify-center ml-2 p-2 text-blue-600 rounded-full cursor-pointer "
                  >
                    <svg
                      className="w-5 h-5 rotate-90 rtl:-rotate-90 text-[#906BFA]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 18 20"
                    >
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            {/* Field Typing End */}
          </div>
        </div>
      </div>
    </div>
  );
}
