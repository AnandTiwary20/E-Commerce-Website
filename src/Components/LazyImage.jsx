import { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className, width, height, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    if ('IntersectionObserver' in window) {
      
      const handleIntersect = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImageSrc(src);
              setIsLoading(false);
            };
            img.onerror = () => {
              setImageSrc('https://via.placeholder.com/300x300?text=Image+Not+Found');
              setIsLoading(false);
            };
            
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      };

      observerRef.current = new IntersectionObserver(handleIntersect, {
        rootMargin: '200px',
        threshold: 0.01,
      });

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    } else {
     
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setImageSrc('https://via.placeholder.com/300x300?text=Image+Not+Found');
        setIsLoading(false);
      };
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src]);

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className || ''} ${isLoading ? 'loading' : ''}`}
      style={{
        '--width': width || '100%',
        '--height': height || 'auto',
        '--bg-color': isLoading ? '#f5f5f5' : 'transparent'
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt || ''}
          className={`lazy-image ${className || ''} ${isLoading ? 'loading' : ''}`}
          loading="lazy"
          {...props}
        />
      )}
      {isLoading && (
        <div className="image-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
