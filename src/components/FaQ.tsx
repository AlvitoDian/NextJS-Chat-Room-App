import React, { useState, useEffect } from "react";
import Accordion from "@/components/Accordion";

export default function FaQ() {
  const faqs = [
    {
      title: "Bagaimana cara saya membuat akun?",
      content:
        "Untuk membuat akun di aplikasi kami, cukup klik tombol 'Daftar' di halaman utama, kemudian isi formulir pendaftaran dengan informasi yang diperlukan dan ikuti instruksi selanjutnya.",
    },
    {
      title: "Apakah chatroom kami aman?",
      content:
        "Kami memprioritaskan keamanan pengguna kami. Chatroom kami dilengkapi dengan enkripsi end-to-end, dan kami memiliki tim keamanan yang berdedikasi untuk memantau aktivitas yang mencurigakan.",
    },
    {
      title: "Apakah chatroom kami real-time?",
      content:
        "Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.",
    },
    {
      title: "Bisakah saya menghapus pesan?",
      content:
        "Saat ini, fitur untuk menghapus pesan belum tersedia. Namun, kami sedang mempertimbangkan untuk menambahkan fitur tersebut di masa mendatang.",
    },
    {
      title: "Bagaimana cara saya menghubungi tim dukungan?",
      content:
        "Jika Anda mengalami masalah atau memiliki pertanyaan lebih lanjut, Anda dapat menghubungi tim dukungan kami melalui email di support@chatroomapp.com atau menggunakan formulir kontak yang tersedia di halaman 'Hubungi Kami'.",
    },
  ];

  return (
    <div className="flex flex-col my-[80px]">
      <div className="text-center text-3xl text-gray-700 font-bold">FaQ</div>
      <div className=" py-10 flex flex-col gap-[12px]">
        {faqs.map((faq, index) => (
          <Accordion key={index} title={faq.title} content={faq.content} />
        ))}
      </div>
    </div>
  );
}
