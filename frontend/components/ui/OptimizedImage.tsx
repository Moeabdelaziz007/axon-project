import Image from 'next/image';

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height,
  priority = false 
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        className="transition-transform duration-300 hover:scale-105"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(`
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#1a1a1a"/>
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial" font-size="14">Loading...</text>
          </svg>
        `).toString('base64')}`}
      />
    </div>
  );
};
