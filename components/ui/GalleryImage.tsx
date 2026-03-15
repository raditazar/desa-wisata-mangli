interface GalleryImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function GalleryImage({ src, alt, caption }: GalleryImageProps) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-[20px] cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {caption}
        </div>
      )}
    </div>
  );
}
