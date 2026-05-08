import Image from "next/image";

export default function GalleryPage() {
  const galleryImages = [
    { src: "/images/workshop1.jpg", alt: "Workshop Interior" },
    { src: "/images/before-after1.jpg", alt: "Before & After" },
    { src: "/images/car-repair.jpg", alt: "Engine Repair" },
    { src: "/images/painting.jpg", alt: "Spray Painting" },
    // Add more images later
  ];

  return (
    <div className="pt-20 pb-16 bg-black">
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-5xl font-bold text-center mb-4">Our Gallery</h1>
        <p className="text-center text-gray-400 text-xl mb-12">See our work and facilities</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-3xl aspect-video bg-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-white font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12 text-sm">
          More images will be added as we complete more jobs
        </p>
      </div>
    </div>
  );
}