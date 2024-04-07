import React from "react";
import Link from "next/link";
import FeatureCard from "../FeatureCard";

function Feature() {
  // Dummy data
  const features = [
    {
      title: "Profil Pengguna",
      icon: "faUser",
      description: "Pengguna dapat mengatur dan memperbarui profil mereka.",
    },
    {
      title: "Real-Time Chat",
      icon: "faComments",
      description:
        "Berkomunikasi dengan pengguna lain secara real-time tanpa perlu refresh halaman.",
    },
    {
      title: "Histori Obrolan",
      icon: "faClockRotateLeft",
      description:
        "Aplikasi harus responsif dan berfungsi dengan baik di berbagai perangkat seperti desktop, tablet, dan ponsel.",
    },
    {
      title: "Responsif pada Berbagai Perangkat",
      icon: "faMobile",
      description:
        "Aplikasi harus responsif dan berfungsi dengan baik di berbagai perangkat seperti desktop, tablet, dan ponsel.",
    },
  ];

  return (
    <div className="bg-white text-white flex justify-center items-center">
      <div className="sm:px-3 md:px-[400px] grid md:grid-cols-2 grid-cols-1 gap-5">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Feature;
