// ✅ Fixed app/api/sign-upload/route.js with proper parameter signing
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // Get the parameters from the request body
    const body = await request.json();
    const { folder, tags } = body;
    
    const timestamp = Math.floor(Date.now() / 1000);

    // Include ALL parameters that will be sent to Cloudinary
    const paramsToSign = {
      timestamp,
      upload_preset: 'signed-media',
      source: 'uw',
    };

    // Add optional parameters if they exist
    if (folder) {
      paramsToSign.folder = folder;
    }
    
    if (tags) {
      paramsToSign.tags = Array.isArray(tags) ? tags.join(',') : tags;
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      upload_preset: 'signed-media',
    });
  } catch (error) {
    console.error('Sign upload error:', error);
    return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
  }
}