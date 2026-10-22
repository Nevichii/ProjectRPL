import { NextResponse } from 'next/server';
import { pool } from '../../../../db/mysql';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email dan password harus diisi!' }, { status: 400 });
        }

        const connection = await pool.getConnection();

        const [rows]: any = await connection.execute(
            'SELECT id, email, role FROM users WHERE email = ? AND password = ?',
            [email, password]
        );

        connection.release();

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Email atau password salah!' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login berhasil!', user: rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
    }
}