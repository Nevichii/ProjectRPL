import { NextResponse } from 'next/server';
import { pool } from '../../../db/mysql';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userEmail = searchParams.get('email');
        const userRole = searchParams.get('role');

        const connection = await pool.getConnection();
        let query = 'SELECT * FROM proposals WHERE 1=1';
        let params: any[] = [];

        if (userRole !== 'Kemahasiswaan' && userRole !== 'Admin') {
            query += ` AND (status != 'Draft' OR created_by = ?)`;
            params.push(userEmail);
        }

        query += ' ORDER BY created_at DESC';
        const [rows] = await connection.execute(query, params);
        connection.release();

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Get proposals error:', error);
        return NextResponse.json({ error: 'Gagal mengambil data proposal.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const organization = formData.get('organization') as string;
        const date = formData.get('date') as string;
        const room = formData.get('room') as string;
        const status = formData.get('status') as string;
        const created_by = formData.get('created_by') as string;
        const file = formData.get('file') as File | null;

        if (!title || !organization || !date || !room || !created_by) {
            return NextResponse.json({ error: 'Semua kolom wajib diisi!' }, { status: 400 });
        }

        let fileName = 'lampiran.pdf';
        if (file && file.size > 0) {
            fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadPath = path.join(process.cwd(), 'public/uploads', fileName);
            await writeFile(uploadPath, buffer);
        }

        const id = `PRP-${Date.now()}`;
        const proposalStatus = status || 'Draft';

        const connection = await pool.getConnection();
        await connection.execute(
            'INSERT INTO proposals (id, title, organization, date, room, status, created_by, file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, title, organization, date, room, proposalStatus, created_by, fileName]
        );
        connection.release();

        return NextResponse.json({ message: 'Proposal berhasil disimpan!', id }, { status: 201 });
    } catch (error) {
        console.error('Upload proposal error:', error);
        return NextResponse.json({ error: 'Gagal mengunggah proposal.' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ error: 'ID dan status wajib diisi!' }, { status: 400 });
        }

        const connection = await pool.getConnection();
        await connection.execute(
            'UPDATE proposals SET status = ? WHERE id = ?',
            [status, id]
        );
        connection.release();

        return NextResponse.json({ message: 'Status proposal berhasil diperbarui!' }, { status: 200 });
    } catch (error) {
        console.error('Update status error:', error);
        return NextResponse.json({ error: 'Gagal memperbarui status.' }, { status: 500 });
    }
}