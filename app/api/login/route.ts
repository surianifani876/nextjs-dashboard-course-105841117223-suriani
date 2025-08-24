import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Contoh validasi statis (ganti dengan cek database nyata)
  if (email === 'fani@example.com' && password === '123456') {
    // Di sini biasanya kamu buat session, JWT, cookie, dll
    // Untuk demo, kita hanya balas sukses saja

    return NextResponse.json({ message: 'Login berhasil' }, { status: 200 });
  }

  return NextResponse.json(
    { message: 'Email atau password salah' },
    { status: 401 }
  );
}
