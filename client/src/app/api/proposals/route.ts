import { NextResponse } from 'next/server';
import { pool } from '../../../db/mysql';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    const userRole = searchParams.get('role');

    const connection = await pool.getConnection();
    let query = 'SELECT * FROM proposals WHERE 1=1';
    let params: any[] = [];

    if (userRole === 'Kemahasiswaan') {
      query += ` AND status != 'Draft'`;
    } else if (userRole !== 'Admin') {
      query += ` AND created_by = ?`;
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
    if (file && file.size > 0 && file.name) {
      fileName = file.name;
    }

    const id = `PRP-${Math.floor(100 + Math.random() * 900)}`;
    const proposalStatus = status || 'Draft';

    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO proposals (id, title, organization, date, room, status, created_by, file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title, organization, date, room, proposalStatus, created_by, fileName]
    );
    connection.release();

    return NextResponse.json({ message: 'Proposal berhasil diunggah!', id }, { status: 201 });
  } catch (error) {
    console.error('Upload proposal error:', error);
    return NextResponse.json({ error: 'Gagal mengunggah proposal ke database.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json({ error: 'Format data request tidak valid.' }, { status: 400 });
    }

    const { id, status } = body;

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

export async function DELETE(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json({ error: 'Format data request tidak valid.' }, { status: 400 });
    }

    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID proposal wajib diisi!' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM proposals WHERE id = ? AND status = ?', [id, 'Draft']);
    connection.release();

    return NextResponse.json({ message: 'Draft proposal berhasil dibatalkan dan dihapus!' }, { status: 200 });
  } catch (error) {
    console.error('Delete proposal error:', error);
    return NextResponse.json({ error: 'Gagal menghapus draft proposal.' }, { status: 500 });
  }
}