import { useState } from "react";

export default function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-[#d7cafc] border-[1px] rounded-md flex flex-col">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-all duration-200 text-[#6F3EFC] ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`wrapper bg-[#f4f4fa] ${
          isOpen ? "is-open border-t border-[#d7cafc] rounded-b-md" : ""
        }`}
      >
        <p className="inner">
          <div className="px-4 py-2 text-gray-500">{content}</div>
        </p>
      </div>
    </div>
  );
}
