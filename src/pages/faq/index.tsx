import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "@/components/Accordion";

export default function FaQ() {
  return (
    <div className="h-[100vh]">
      <Head>
        <title>FaQ</title>
      </Head>
      <div className="flex flex-col">
        <div className="text-center text-3xl text-gray-700 font-bold">FaQ</div>
        <div className="px-10 py-10 flex flex-col gap-[12px]">
          <Accordion
            title="Bagaimana cara saya membuat akun?"
            content="Untuk membuat akun di aplikasi kami, cukup klik tombol 'Daftar' di halaman utama, kemudian isi formulir pendaftaran dengan informasi yang diperlukan dan ikuti instruksi selanjutnya."
          />
          <Accordion
            title="Apakah chatroom kami aman?"
            content="Kami memprioritaskan keamanan pengguna kami. Chatroom kami dilengkapi dengan enkripsi end-to-end, dan kami memiliki tim keamanan yang berdedikasi untuk memantau aktivitas yang mencurigakan."
          />
          <Accordion
            title="Apakah chatroom kami real-time?"
            content="Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan.Ya, chatroom kami adalah real-time. Pesan yang Anda kirimkan akan langsung muncul di chatroom dan dapat dilihat oleh pengguna lain secara instan."
          />
          <Accordion
            title="Bisakah saya menghapus pesan?"
            content="Saat ini, fitur untuk menghapus pesan belum tersedia. Namun, kami sedang mempertimbangkan untuk menambahkan fitur tersebut di masa mendatang."
          />
          <Accordion
            title="Bagaimana cara saya menghubungi tim dukungan?"
            content="Jika Anda mengalami masalah atau memiliki pertanyaan lebih lanjut, Anda dapat menghubungi tim dukungan kami melalui email di support@chatroomapp.com atau menggunakan formulir kontak yang tersedia di halaman 'Hubungi Kami'."
          />
        </div>
      </div>
    </div>
  );
}
