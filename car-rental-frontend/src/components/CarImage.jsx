import { useState } from 'react';

const CarImage = ({ 
  car, 
  size = 'medium', 
  alt, 
  className = '',
  fallbackClass = 'bg-gray-200 flex items-center justify-center text-gray-500',
  ...props 
}) => {
  const [error, setError] = useState(false);
  
  // Get primary image or first image
  const primaryImage = car?.images?.find(img => img.isPrimary) || car?.images?.[0];
  
  // Get the appropriate image URL based on size
  const getImageUrl = () => {
    if (primaryImage?.urls) {
      return primaryImage.urls[size] || primaryImage.urls.medium || primaryImage.url;
    }
    return primaryImage?.url || null;
  };

  const src = getImageUrl();
  
  if (!src || error || !car) {
    return (
      <div className={`${fallbackClass} ${className}`} {...props}>
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
        <span className="ml-2">No Image</span>
      </div>
    );
  }
  
  return (
    <img 
      src={src}
      alt={alt || primaryImage?.description || `${car.brand} ${car.model}`}
      onError={() => setError(true)}
      loading="lazy"
      className={className}
      {...props}
    />
  );
};

export default CarImage; 