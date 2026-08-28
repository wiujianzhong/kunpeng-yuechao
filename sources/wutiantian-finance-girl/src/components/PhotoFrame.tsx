import { useState } from 'react'

type PhotoFrameProps = {
  src: string
  label: string
  caption: string
  className?: string
}

export function PhotoFrame({ src, label, caption, className = '' }: PhotoFrameProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <figure className={`photo-frame ${loaded ? 'is-loaded' : 'is-placeholder'} ${className}`}>
      <img
        src={src}
        alt={`${caption}，当前照片待补充`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      <div className="photo-placeholder" aria-hidden={loaded}>
        <span className="photo-index">{label}</span>
        <span className="photo-mark">＋</span>
        <span className="photo-prompt">待本人照片</span>
      </div>
      <figcaption>
        <span>{caption}</span>
        <span>{loaded ? 'PHOTO LOADED' : 'PHOTO / 待补充'}</span>
      </figcaption>
    </figure>
  )
}
