'use client';
import { useEffect, useState } from 'react';
import UploadBtn from '../../../components/uploadbutton';
import { CldImage } from 'next-cloudinary';
import { ImageIcon, VideoIcon, Loader2 } from 'lucide-react';

const fetchSection = async (s, limit = 10) =>
  fetch(`/api/media?section=${s}&limit=${limit}`).then((r) => r.json());

export default function Admin() {
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [svc, setSvc] = useState([]);
  const [link, setLink] = useState('');
  const [ctaLinks, setCtaLinks] = useState([]);
  const [loadingOg, setLoadingOg] = useState(false);

  // ✅ Our Works State
  const [ourWorksVideo, setOurWorksVideo] = useState(null);
  const [ourWorksImages, setOurWorksImages] = useState([null, null, null]);

  // ✅ Our Clients State
  const [ourClients, setOurClients] = useState(Array(10).fill(null));

  useEffect(() => {
    (async () => {
      setHero((await fetchSection('hero', 1))[0] || null);
      setAbout((await fetchSection('about', 1))[0] || null);
      setSvc(await fetchSection('service', 4));
      setCtaLinks(await fetchSection('cta', 10));

      // ✅ Our Works Fetch
      const works = await fetchSection('ourworks', 4);
      const video = works.find((w) => w.resourceType === 'video') || null;
      const images = works.filter((w) => w.resourceType === 'image');
      const imgSlots = [images[0] || null, images[1] || null, images[2] || null];
      setOurWorksVideo(video);
      setOurWorksImages(imgSlots);

      // ✅ Our Clients Fetch
      const clients = await fetchSection('ourclients', 10);
      setOurClients(Array.from({ length: 10 }).map((_, i) => clients[i] || null));
    })();
  }, []);

  const remove = async (id, sec) => {
    await fetch(`/api/media/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (sec === 'hero') setHero(null);
    else if (sec === 'about') setAbout(null);
    else if (sec === 'cta') setCtaLinks((prev) => prev.filter((x) => x.publicId !== id));
    else if (sec === 'service') setSvc((a) => a.filter((x) => x.publicId !== id));
    else if (sec === 'ourworks') {
      if (ourWorksVideo?.publicId === id) setOurWorksVideo(null);
      else
        setOurWorksImages((prev) =>
          prev.map((img) => (img && img.publicId === id ? null : img))
        );
    } else if (sec === 'ourclients') {
      setOurClients((prev) => prev.map((item) => (item && item.publicId === id ? null : item)));
    }
  };

  const previewLink = async () => {
    if (!link) return;
    setLoadingOg(true);
    const meta = await fetch(`/api/og?url=${encodeURIComponent(link)}`).then((r) => r.json());
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicId: link,
        section: 'cta',
        type: 'link',
        meta,
      }),
    });
    const saved = await res.json();
    setCtaLinks((prev) => [saved, ...prev]);
    setLink('');
    setLoadingOg(false);
  };

  const Card = ({ title, subtitle, children }) => (
    <section className="bg-white rounded-lg shadow p-6 space-y-4">
      <header>
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </header>
      {children}
    </section>
  );

  const DropZone = ({ children }) => (
    <div className="flex flex-col items-center justify-center gap-2 h-48 w-full border-2 border-dashed rounded-lg bg-gray-50">
      {children}
    </div>
  );

  const ThumbnailCard = ({ item, label, onDelete }) => {
    const isVideo = item?.resourceType === 'video';
    const isImage = item?.resourceType === 'image';
    const fileName = item?.publicId?.split('/').pop();

    return (
      <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden shadow flex items-center justify-center px-4 text-center">
        {isImage ? (
          <CldImage
            src={item.publicId}
            width={320}
            height={180}
            alt={item.alt || label}
            className="w-full h-full object-cover"
          />
        ) : isVideo ? (
          <div className="text-sm text-gray-700 truncate max-w-full">
            🎞️ <strong>{fileName || 'video.mp4'}</strong>
          </div>
        ) : (
          <div className="text-sm text-gray-500">{item?.publicId}</div>
        )}
        <button
          className="btn-sm absolute top-2 right-2 z-10"
          onClick={onDelete}
        >✕</button>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HERO */}
        <Card title="Hero" subtitle="Background image or video shown at the top.">
          {hero ? (
            <ThumbnailCard item={hero} label="Hero" onDelete={() => remove(hero.publicId, 'hero')} />
          ) : (
            <DropZone>
              <VideoIcon className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-500">Upload an image or video</p>
              <UploadBtn section="hero" folder="site/hero" className="btn btn-outline" onSaved={setHero}>
                <ImageIcon className="w-4 h-4 mr-1" /> Upload
              </UploadBtn>
            </DropZone>
          )}
        </Card>

        {/* CTA LINKS */}
        <Card title="Website link" subtitle="Shown as CTA links on the landing page.">
          {ctaLinks.map((link, idx) => (
            <div key={idx} className="relative flex gap-3 items-start border rounded p-3 mb-3 bg-white shadow-sm">
              {link?.meta?.image && (
                <img
                  src={link.meta.image}
                  alt="preview"
                  className="w-16 h-16 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{link.meta?.title || link.publicId}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{link.meta?.description}</p>
                <a href={link.publicId} target="_blank" className="text-blue-500 text-xs underline">Visit</a>
              </div>
              <button
                onClick={() => remove(link.publicId, 'cta')}
                className="btn-sm absolute top-2 right-2"
              >✕</button>
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <input
              className="input flex-1"
              placeholder="https://your-site.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button className="btn" onClick={previewLink} disabled={loadingOg}>
              {loadingOg ? <Loader2 className="animate-spin w-4 h-4" /> : 'Preview'}
            </button>
          </div>
        </Card>

        {/* ABOUT */}
        <Card title="About media" subtitle="Video or image used in About Us section.">
          {about ? (
            <ThumbnailCard item={about} label="About" onDelete={() => remove(about.publicId, 'about')} />
          ) : (
            <DropZone>
              <VideoIcon className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-500">Upload a video or image</p>
              <UploadBtn section="about" folder="site/about" className="btn btn-outline" onSaved={setAbout}>
                <ImageIcon className="w-4 h-4 mr-1" /> Upload
              </UploadBtn>
            </DropZone>
          )}
        </Card>

        {/* SERVICES */}
        <Card title="Service gallery" subtitle="Exactly four images shown under Services.">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => {
              const item = svc[i];
              return (
                <div key={i}>
                  {item ? (
                    <ThumbnailCard item={item} label={`Service ${i + 1}`} onDelete={() => remove(item.publicId, 'service')} />
                  ) : (
                    <DropZone>
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                      <p className="text-xs text-gray-500">Slot {i + 1} (image)</p>
                      <UploadBtn
                        section="service"
                        folder="site/services"
                        className="btn btn-outline mt-2"
                        onSaved={(doc) => setSvc((prev) => [...prev, doc].slice(0, 4))}
                      >
                        <ImageIcon className="w-4 h-4 mr-1" /> Upload Image
                      </UploadBtn>
                    </DropZone>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* OUR WORKS */}
        <Card title="Our Works" subtitle="One video and three images showcasing our work.">
          {/* Video Upload */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Video</h4>
            {ourWorksVideo ? (
              <ThumbnailCard item={ourWorksVideo} label="Our Works Video" onDelete={() => remove(ourWorksVideo.publicId, 'ourworks')} />
            ) : (
              <DropZone>
                <VideoIcon className="w-8 h-8 text-gray-400" />
                <p className="text-xs text-gray-500">Upload Video</p>
                <UploadBtn section="ourworks" folder="site/ourworks" className="btn btn-outline mt-2" onSaved={setOurWorksVideo}>
                  <VideoIcon className="w-4 h-4 mr-1" /> Upload Video
                </UploadBtn>
              </DropZone>
            )}
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-3 gap-4">
            {ourWorksImages.map((item, i) => (
              <div key={i}>
                {item ? (
                  <ThumbnailCard item={item} label={`Image ${i + 1}`} onDelete={() => remove(item.publicId, 'ourworks')} />
                ) : (
                  <DropZone>
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <p className="text-xs text-gray-500">Image {i + 1}</p>
                    <UploadBtn
                      section="ourworks"
                      folder="site/ourworks"
                      className="btn btn-outline mt-2"
                      onSaved={(doc) =>
                        setOurWorksImages((prev) => {
                          const updated = [...prev];
                          updated[i] = doc;
                          return updated;
                        })
                      }
                    >
                      <ImageIcon className="w-4 h-4 mr-1" /> Upload Image
                    </UploadBtn>
                  </DropZone>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* OUR CLIENTS */}
        <Card title="Our Clients" subtitle="Upload up to 10 client logos displayed in a grid.">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {ourClients.map((item, i) => (
              <div key={i}>
                {item ? (
                  <ThumbnailCard item={item} label={`Client ${i + 1}`} onDelete={() => remove(item.publicId, 'ourclients')} />
                ) : (
                  <DropZone>
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <p className="text-xs text-gray-500">Logo {i + 1}</p>
                    <UploadBtn
                      section="ourclients"
                      folder="site/ourclients"
                      className="btn btn-outline mt-2"
                      onSaved={(doc) =>
                        setOurClients((prev) => {
                          const updated = [...prev];
                          updated[i] = doc;
                          return updated;
                        })
                      }
                    >
                      <ImageIcon className="w-4 h-4 mr-1" /> Upload Logo
                    </UploadBtn>
                  </DropZone>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
