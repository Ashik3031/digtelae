import { NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';

export async function GET(req) {
  const searchParams = new URL(req.url).searchParams;
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  const { error, result } = await ogs({ url: targetUrl });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch OG data' }, { status: 500 });
  }

  return NextResponse.json({
    title: result.ogTitle,
    description: result.ogDescription,
    image: result.ogImage?.url || result.ogImage?.[0]?.url || null,
  });
}
