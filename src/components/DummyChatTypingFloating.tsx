export default function DummyChatTypingFloating() {
  return (
    <div
      className="p-3 bg-white border border-white border-[1px] rounded-full bg-white bg-opacity-50 flex items-center gap-[15px] backdrop-blur-[8px]"
      style={{
        boxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
        WebkitBoxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
        MozBoxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div className="flex flex-col pr-2">
        <div className="relative w-full">
          <input
            type="text"
            className="bg-white bg-opacity-50 border border-gray-300 text-gray-900 text-sm rounded-full block w-[280px] ps-10 p-2.5"
            placeholder="Pesan..."
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="#b5b5b5"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
