import { NextResponse } from 'next/server';
import { pool } from '../../../../db/mysql';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email dan password harus diisi!' }, { status: 400 });
        }

        const connection = await pool.getConnection();

        const [existing]: any = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            connection.release();
            return NextResponse.json({ error: 'Email sudah terdaftar!' }, { status: 400 });
        }

        // Simpan user baru ke database MySQL
        await connection.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );

        connection.release();
        return NextResponse.json({ message: 'Registrasi berhasil!' }, { status: 201 });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
    }
}