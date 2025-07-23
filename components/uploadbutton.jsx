// ✅ Fixed components/UploadBtn.jsx with proper parameter passing
'use client';
import { useState } from 'react';

export default function UploadBtn({ section, folder, onSaved, className = 'btn', children }) {
  const [busy, setBusy] = useState(false);

  const handleUpload = async () => {
    setBusy(true);
    try {
      // Send folder and tags to the sign-upload endpoint
      const res = await fetch('/api/sign-upload', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          folder: folder,
          tags: section 
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to get signature');
      }
      
      const data = await res.json();
      const { cloud_name, api_key, signature, timestamp, upload_preset } = data;

      if (!window.cloudinary) {
        throw new Error('Cloudinary widget not loaded');
      }

      window.cloudinary.openUploadWidget(
        {
          cloudName: cloud_name,
          apiKey: api_key,
          uploadSignature: signature,
          uploadSignatureTimestamp: timestamp,
          uploadPreset: upload_preset,
          sources: ['local', 'camera', 'url'],
          folder: folder,
          tags: [section],
          resourceType: 'auto',
          multiple: false,
          maxFiles: 1,
        },
        async (error, result) => {
          if (!error && result.event === 'success') {
            const info = result.info;

            const doc = {
              section,
              publicId: info.public_id,
              resourceType: info.resource_type,
              secureUrl: info.secure_url,
              width: info.width,
              height: info.height,
            };

            if (onSaved) {
              try {
                await fetch('/api/media', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(doc),
                });
                onSaved(doc);
              } catch (err) {
                console.warn('Error saving to DB, but upload succeeded:', err);
                onSaved(doc);
              }
            }
          } else if (error) {
            console.error('Upload error:', error);
            alert('Upload failed: ' + (error.message || 'Unknown error'));
          }

          setBusy(false);
        }
      );
    } catch (err) {
      console.error('Widget init failed:', err);
      alert('Failed to initialize upload widget: ' + err.message);
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleUpload}
      disabled={busy}
      className={className}
    >
      {busy ? 'Uploading...' : children || 'Upload'}
    </button>
  );
}