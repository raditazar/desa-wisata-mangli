interface GalleryImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function GalleryImage({ alt, caption }: GalleryImageProps) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-[20px] bg-gradient-to-br from-surface to-surface-dark cursor-pointer">
      {/* Placeholder - replace with next/image when real images are available */}
      <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
        {alt}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          {caption}
        </div>
      )}
    </div>
  );
}
