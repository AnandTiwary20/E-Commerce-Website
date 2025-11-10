import { useState, useEffect, useRef } from 'react'

const LazyImage = ({ src, alt, className, width, height, ...props }) => {
  const [loaded, setLoaded] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const imgRef = useRef(null)

  // load image only when visible on screen
  useEffect(() => {
    if (!src) return

    const loadImage = () => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImgSrc(src)
        setLoaded(true)
      }
      img.onerror = () => {
        setImgSrc('https://via.placeholder.com/300x300?text=Image+Not+Found')
        setLoaded(true)
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadImage()
            observer.disconnect()
          }
        },
        { rootMargin: '150px' }
      )
      if (imgRef.current) observer.observe(imgRef.current)
      return () => observer.disconnect()
    } else {
      loadImage()
    }
  }, [src])

  return (
    <div
      ref={imgRef}
      className={`lazy-img-wrap ${className || ''} ${!loaded ? 'loading' : ''}`}
      style={{
        width: width || '100%',
        height: height || 'auto',
        background: !loaded ? '#f4f4f4' : 'transparent',
      }}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt || ''}
          className={`lazy-img ${className || ''}`}
          loading="lazy"
          {...props}
        />
      )}
      {!loaded && <div className="spinner"></div>}
    </div>
  )
}

export default LazyImage
