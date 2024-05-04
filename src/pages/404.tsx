export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-[65px]">
      <h1 className="text-4xl font-bold mb-4">404 - Halaman tidak ditemukan</h1>
      <p className="text-lg mb-2">
        Maaf, halaman yang Anda cari tidak tersedia.
      </p>
      <p className="text-lg mb-2">
        Silakan kembali ke halaman utama atau periksa URL Anda.
      </p>
    </div>
  );
}
