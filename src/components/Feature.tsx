import React from "react";
import Link from "next/link";
import FeatureCard from "./FeatureCard";

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
      title: "Chat Grup",
      icon: "faUsers",
      description:
        "Berpartisipasi dalam obrolan dengan beberapa pengguna sekaligus dalam satu grup.",
    },
    {
      title: "Responsif pada Berbagai Perangkat",
      icon: "faMobile",
      description:
        "Aplikasi harus responsif dan berfungsi dengan baik di berbagai perangkat seperti desktop, tablet, dan ponsel.",
    },
    {
      title: "Tambah Teman",
      icon: "faUserPlus",
      description: "Menambahkan pengguna lain sebagai teman dalam aplikasi.",
    },
    {
      title: "Chat Pribadi Antar Pengguna",
      icon: "faEye",
      description:
        "Berinteraksi dengan pengguna lain secara pribadi dalam obrolan satu antar satu.",
    },
  ];

  return (
    <div className="bg-white text-white flex justify-center items-center">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
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
