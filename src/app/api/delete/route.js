import { NextResponse } from 'next/server';
import cloudinary from '../../../../lib/cloudinary';

export async function POST(request) {
  const { publicId } = await request.json();
  if (!publicId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  await cloudinary.api.delete_resources([publicId]);
  return NextResponse.json({ ok: true });
}