import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Highlight() {
  const [inSection, setInSection] = useState({
    group1: false,
    group2: false,
    group3: false,
    group4: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("highlight-section");
      if (section) {
        const { top } = section.getBoundingClientRect();
        if (top < window.innerHeight) {
          console.log("ABJAY");
          setTimeout(() => {
            setInSection((prevState) => ({ ...prevState, group1: true }));
          }, 500);
          setTimeout(() => {
            setInSection((prevState) => ({ ...prevState, group2: true }));
          }, 1500);
          setTimeout(() => {
            setInSection((prevState) => ({ ...prevState, group3: true }));
          }, 2000);
          setTimeout(() => {
            setInSection((prevState) => ({ ...prevState, group4: true }));
          }, 2500);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="highlight-section"
      className="bg-white h-[70vh] grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 "
    >
      {/* Grid bagian kiri */}
      <div className="" id="highlight-section">
        <div className="relative sm:ml-[10px] md:ml-[150px] scale-50 lg:scale-100">
          <Image
            src={"/highlight/Group 4.png"}
            alt=""
            width={400}
            height={400}
            className={`absolute left-[0px] top-[15px] transition duration-1000 ${
              inSection.group1
                ? "translate-y-[0px] opacity-100"
                : "translate-y-[-100px] opacity-0"
            }`}
          />

          <Image
            src={"/highlight/Header.png"}
            alt=""
            width={343}
            height={343}
            className={`absolute left-[10px] top-[1px] z-50 ${
              inSection.group1
                ? "translate-y-[0px] opacity-100"
                : "translate-y-[-100px] opacity-0"
            } transition duration-1000`}
          />

          <Image
            src={"/highlight/Rectangle 1 copy.png"}
            alt=""
            width={400}
            height={400}
            className={`absolute left-[10px] top-[0px] z-20 ${
              inSection.group1
                ? "translate-y-[0px] opacity-100"
                : "translate-y-[-100px] opacity-0"
            } transition duration-1000`}
          />

          <Image
            src={"/highlight/Send Chat.png"}
            alt=""
            width={340}
            height={340}
            className={`absolute left-[70px] top-[487px] z-20 ${
              inSection.group1
                ? "translate-y-[0px] opacity-100"
                : "translate-y-[-100px] opacity-0"
            } transition duration-1000`}
          />

          <Image
            src={"/highlight/Group 1.png"}
            alt=""
            width={250}
            height={250}
            className={`absolute left-[85px] top-[70px] z-20 ${
              inSection.group2
                ? "translate-y-[0px] opacity-100"
                : "translate-y-[-100px] opacity-0"
            } transition duration-1000`}
          />

          <Image
            src={"/highlight/Group 2.png"}
            alt=""
            width={250}
            height={250}
            className={`absolute left-[55px] top-[220px] z-20 ${
              inSection.group3
                ? "translate-y-[0px] opacity-100"
                : "translate-y-[-100px] opacity-0"
            } transition duration-1000`}
          />

          <Image
            src={"/highlight/Group 3.png"}
            alt=""
            width={250}
            height={250}
            className={`absolute left-[120px] top-[370px] z-20 ${
              inSection.group4
                ? "translate-y-[0px] opacity-100"
                : "translate-y-[-100px] opacity-0"
            } transition duration-1000`}
          />
        </div>
      </div>

      {/* Grid bagian kanan */}
      <div className="flex-col jusitfy-center z-10 lg:px-[160px] sm:px-[40px] sm:pt-[300px] md:pt-[0px]">
        <div>
          <span className="">Kapan lagi yekan</span>
        </div>

        <div>
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempora cum ipsum illum ea fugit, placeat officiis inventore quis,
            ad, quibusdam magnam doloribus. Pariatur, accusamus nemo doloribus
            autem aspernatur voluptas!
          </span>
        </div>
      </div>
    </section>
  );
}
