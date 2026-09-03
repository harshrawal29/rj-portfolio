import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { VideoBlock as VideoBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

function getYouTubeEmbedUrl(url: string, autoPlay: boolean = true, showControls: boolean = true): string | null {
  try {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    const match = url.match(regExp)
    if (match && match[1]) {
      const videoId = match[1]
      const params = new URLSearchParams({
        autoplay: autoPlay ? '1' : '0',
        mute: autoPlay ? '1' : '0',
        loop: '1',
        playlist: videoId,
        controls: showControls ? '1' : '0',
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
      })
      return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
    }
  } catch (e) {
    console.error('Error parsing YouTube URL', e)
  }
  return null
}

function getVimeoEmbedUrl(url: string, autoPlay: boolean = true, showControls: boolean = true): string | null {
  try {
    const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+\/)?video\/|video\/|)(\d+)/i
    const match = url.match(regExp)
    if (match && match[1]) {
      const videoId = match[1]
      const params = new URLSearchParams({
        autoplay: autoPlay ? '1' : '0',
        muted: autoPlay ? '1' : '0',
        loop: '1',
        autopause: '0',
        playsinline: '1',
        controls: showControls ? '1' : '0',
      })
      return `https://player.vimeo.com/video/${videoId}?${params.toString()}`
    }
  } catch (e) {
    console.error('Error parsing Vimeo URL', e)
  }
  return null
}

export default function VideoBlock({ block }: { block: VideoBlockType }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoSource = block.videoFile || block.url || block.src
  const autoPlay = block.autoPlay !== false
  const showControls = block.controls !== undefined ? Boolean(block.controls) : (block.showControls !== undefined ? Boolean(block.showControls) : true)

  const ytEmbedUrl = videoSource ? getYouTubeEmbedUrl(videoSource, autoPlay, showControls) : null
  const vimeoEmbedUrl = videoSource ? getVimeoEmbedUrl(videoSource, autoPlay, showControls) : null

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 60, opacity: 0, scale: 1.02 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  if (!videoSource) return null

  if (ytEmbedUrl) {
    return (
      <div ref={ref} className="editorial-video">
        <div className="editorial-video__iframe-wrapper">
          <iframe
            src={ytEmbedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="editorial-video__iframe"
          />
        </div>
      </div>
    )
  }

  if (vimeoEmbedUrl) {
    return (
      <div ref={ref} className="editorial-video">
        <div className="editorial-video__iframe-wrapper">
          <iframe
            src={vimeoEmbedUrl}
            title="Vimeo video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="editorial-video__iframe"
          />
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="editorial-video">
      <video
        src={videoSource}
        poster={block.poster}
        autoPlay={autoPlay}
        muted={autoPlay}
        loop
        playsInline
        controls={showControls}
        className="editorial-video__player"
      />
    </div>
  )
}
