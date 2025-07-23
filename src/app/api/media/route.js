import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbconnect';
import Media from '../../../../models/Media';

export async function POST(req) {
  try {
    const body = await req.json();
    const { publicId, section, type } = body;

    if (!publicId || !section) {
      return NextResponse.json({ error: 'publicId and section are required' }, { status: 400 });
    }

    await dbConnect();

    // If it's a regular media file, validate required fields
    if (type !== 'link') {
      const { resourceType, secureUrl, width, height } = body;

      if (!resourceType || !secureUrl || !width || !height) {
        return NextResponse.json({ error: 'Missing required media fields' }, { status: 400 });
      }
    }

    const doc = await Media.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (err) {
    console.error('POST /api/media failed:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET /api/media?section=hero&limit=4  
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const section = searchParams.get('section'); 
  const limit = Number(searchParams.get('limit')) || 1;
  if (!section) return NextResponse.json({ error: 'section required' }, { status: 400 });

  await dbConnect();
  const docs = await Media.find({ section })
    .sort({ createdAt: -1 })
    .limit(limit);
  return NextResponse.json(docs);
}


