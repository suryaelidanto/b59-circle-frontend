import logo404 from '@/assets/404.svg';

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <img
        style={{
          width: 500,
        }}
        src={logo404}
      />
      <p
        style={{
          fontSize: 30,
        }}
      >
        Maaf, halaman tidak ditemukan!
      </p>
    </div>
  );
}
