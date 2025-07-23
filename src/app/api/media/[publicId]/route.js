import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbconnect';
import Media from '../../../../../models/Media';
import cloudinary from '../../../../../lib/cloudinary';

export async function DELETE(_, { params }) {
  const { publicId } = params;
  if (!publicId) return NextResponse.json({ error: 'id missing' }, { status: 400 });

  await dbConnect();
  await cloudinary.api.delete_resources([publicId]);
  await Media.deleteOne({ publicId });
  return NextResponse.json({ ok: true });
}