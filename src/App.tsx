import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import HeroImage from './IMG_9914.jpg'
import DayonesImage from './IMG_9916.jpg'
import ISEEImage from './IMG_9917.jpg'
import PURPOSE from './IMG_9921.jpg'
import AFTER from './IMG_9922.jpg'
import PEACE from './IMG_9923.jpg'
import MIA from './IMG_9919.jpg'
import NOMORE from './IMG_9926.jpg'
import BEEN from './IMG_9927.jpg'
import WHO from './IMG_9924.jpg'
import purposeV from './IMG_9928.jpg'
import NMV from './IMG_9929.jpg'
import FOREVER from './IMG_9930.jpg'
import VSNRY from './vsnry.jpg'
import LOGO from './MakLogo.png'

/* ------------------------------------------------------------------ */
/*  CONTENT — edit everything the fans see from here                   */
/* ------------------------------------------------------------------ */

const ARTIST = 'ONLY MAKHAYA'

const singles = [
  {
    title: 'I $EE',
    tag: 'THE NEWEST SINGLE',
    image: ISEEImage,
    listen: 'https://li.sten.to/onlymakhayaisee',
    watch: 'https://www.youtube.com/watch?v=Jd13G3CS0Ec',
  },
  {
    title: 'MIA',
    tag: 'SINGLE',
    image: MIA,
    // NOTE: this was the same link as I $EE on the old site. Swap in MIA's own link.
    listen: 'https://li.sten.to/onlymakhayaisee',
    watch: '',
  },
  {
    title: 'DAY ONE$',
    tag: 'SINGLE',
    image: DayonesImage,
    listen: 'https://li.sten.to/dayones',
    watch: 'https://youtu.be/VPlNz-_jpjc?si=N6a4mH2gIpynPm79',
  },
]

const projects = [
  {
    title: 'AFTER FOREVER END$',
    image: AFTER,
    link: 'https://www.youtube.com/watch?v=CJfCsy_ZJQ4&list=PL6SnQlrT4bBey9GWtbDK2sQlKmmOHyijO',
  },
  { title: 'PURPOSE', image: PURPOSE, link: '' },
  { title: 'PEACE AND PROGRESSION', image: PEACE, link: '' },
]

const videos = [
  { title: 'NO MORE', kind: 'OFFICIAL MUSIC VIDEO', image: NMV, link: 'https://youtu.be/5F17A8B34MA?si=sub9jcALsZ8QbMDq' },
  { title: 'I $EE', kind: 'LYRIC VIDEO', image: HeroImage, link: 'https://www.youtube.com/watch?v=Jd13G3CS0Ec' },
  { title: 'WHO TOLD YOU', kind: 'VI$UALIZER', image: WHO, link: 'https://youtu.be/xDhvUmZJn5Q?si=6X8-BxDa3SANSzhx' },
  { title: 'NO MORE', kind: 'VI$UALIZER', image: NOMORE, link: 'https://youtu.be/YISg5x1zHbA?si=Nh-MU-BoNeknVhUA' },
  { title: 'BEEN A WHILE', kind: 'VI$UALIZER', image: BEEN, link: 'https://youtu.be/8eFeBe8Q-gg?si=j-PL30UA0lYr1DMM' },
  { title: 'MIDDLE', kind: 'VI$UALIZER', image: FOREVER, link: 'https://youtu.be/NY1yyqnDmWE?si=N1AlEt5mmS1sMSGd' },
  { title: 'PURPOSE', kind: 'TRAILER', image: purposeV, link: 'https://youtu.be/ztM4feClu9Y?si=U4L_n3VBqQuOoURy' },
]

const gallery = [
  { src: HeroImage, alt: 'Only Makhaya — I $EE' },
  { src: ISEEImage, alt: 'I $EE cover art' },
  { src: MIA, alt: 'MIA cover art' },
  { src: DayonesImage, alt: 'DAY ONE$ cover art' },
  { src: AFTER, alt: 'AFTER FOREVER END$ cover art' },
  { src: PURPOSE, alt: 'PURPOSE cover art' },
  { src: PEACE, alt: 'PEACE AND PROGRESSION cover art' },
  { src: NMV, alt: 'NO MORE music video still' },
]

const events: { date: string; city: string; venue: string; link: string }[] = [
  // Add shows here, e.g.
  // { date: '2026-12-20', city: 'JOHANNESBURG', venue: 'VENUE NAME', link: 'https://tickets...' },
]

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/track/0F7L0bfZKHg1swypMNDgT0?si=39336024874742c7', icon: 'https://ext.same-assets.com/299769418/938119104.svg' },
  { name: 'Apple Music', url: 'https://music.apple.com/za/artist/only-makhaya/1765305449', icon: 'https://ext.same-assets.com/299769418/3209070856.svg' },
  { name: 'YouTube', url: 'https://www.youtube.com/@onlymakhaya/videos', icon: 'https://ext.same-assets.com/299769418/2338996388.svg' },
]

const socialLinks = [
  { name: 'TikTok', url: '', icon: 'https://ext.same-assets.com/299769418/1150337314.svg' },
  { name: 'Instagram', url: 'https://www.instagram.com/onlymakhaya', icon: 'https://ext.same-assets.com/299769418/3355297466.svg' },
  { name: 'X', url: 'https://x.com/onlymakhaya', icon: 'https://ext.same-assets.com/299769418/541901602.svg' },
  ...platforms,
].filter((s) => s.url)

const navLinks = [
  { label: 'MUSIC', href: '#music' },
  { label: 'VIDEOS', href: '#videos' },
  { label: 'ABOUT', href: '#about' },
  { label: 'VI$UAL$', href: '#gallery' },
  { label: 'LIVE', href: '#live' },
  { label: 'CONNECT', href: '#connect' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || null
    return u.searchParams.get('v')
  } catch {
    return null
  }
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-4">
        <span className="h-px w-10 bg-red-600" />
        <span id={id} className="text-xs font-bold tracking-[0.3em] text-red-600">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl uppercase leading-none">{title}</h2>
    </Reveal>
  )
}

const btnOutline =
  'border-2 border-white text-white px-8 py-3 font-bold text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center gap-2'
const btnRed =
  'bg-red-600 border-2 border-red-600 text-white px-8 py-3 font-bold text-xs tracking-[0.2em] hover:bg-red-700 hover:border-red-700 transition-colors inline-flex items-center justify-center gap-2'

const PlayIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const modalOpen = activeVideo !== null || activeImage !== null
  useEffect(() => {
    document.body.style.overflow = modalOpen || menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null)
        setActiveImage(null)
        setMenuOpen(false)
      }
      if (activeImage !== null) {
        if (e.key === 'ArrowRight') setActiveImage((i) => ((i ?? 0) + 1) % gallery.length)
        if (e.key === 'ArrowLeft') setActiveImage((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, menuOpen, activeImage])

  const playVideo = (link: string) => {
    const id = youtubeId(link)
    if (id) setActiveVideo(id)
    else window.open(link, '_blank', 'noopener')
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
  }

  const [featuredVideo, ...otherVideos] = videos
  const marqueeItems = ['I $EE', 'DAY ONE$', 'MIA', 'NO MORE', 'PURPOSE', 'AFTER FOREVER END$', 'BEEN A WHILE', 'WHO TOLD YOU', 'V$NRY']

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ---------- Header ---------- */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="bg-red-600 px-4 py-2 text-center">
          <a href="#music" className="text-white font-bold text-[11px] tracking-[0.25em] hover:opacity-80 transition-opacity">
            ONLY MAKHAYA'S WORLD I GUESS
          </a>
        </div>
        <nav
          className={`transition-colors duration-300 ${scrolled || menuOpen ? 'bg-black/95 backdrop-blur border-b border-white/10' : 'bg-transparent'}`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3" aria-label={`${ARTIST} home`}>
              <img src={LOGO} alt="" className="h-10 w-auto" />
              <span className="font-display text-xl tracking-wider hidden sm:inline">{ARTIST}</span>
            </a>
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-xs font-bold tracking-[0.2em] text-white/80 hover:text-red-600 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <a href={singles[0].listen} target="_blank" rel="noopener noreferrer" className={`${btnRed} !px-5 !py-2 hidden sm:inline-flex`}>
                LISTEN
              </a>
              <button
                type="button"
                className="lg:hidden p-2 -mr-2"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white my-1.5 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </button>
            </div>
          </div>
        </nav>
        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[104px] bottom-0 bg-black transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ul className="flex flex-col items-center justify-center h-full gap-6 pb-24">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenuOpen(false)} className="font-display text-4xl hover:text-red-600 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-6">
              <a href={singles[0].listen} target="_blank" rel="noopener noreferrer" className={btnRed}>
                LISTEN TO I $EE
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section
          className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-end grain"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-24 md:pb-32 pt-40">
            <div className="bg-red-600 text-white px-4 py-1.5 inline-block text-xs font-bold tracking-[0.25em] mb-6">
              NEW SINGLE — OUT NOW
            </div>
            <h1 className="font-display text-[22vw] md:text-[11rem] leading-[0.85] tracking-wide mb-4">I $EE</h1>
            <p className="text-sm md:text-base tracking-[0.4em] text-white/70 mb-10">{ARTIST}</p>
            <div className="flex flex-wrap gap-4">
              <a href={singles[0].listen} target="_blank" rel="noopener noreferrer" className={btnRed}>
                LISTEN NOW
              </a>
              <button type="button" onClick={() => playVideo(singles[0].watch)} className={btnOutline}>
                <PlayIcon /> WATCH VIDEO
              </button>
            </div>
          </div>
          <a
            href="#music"
            className="absolute bottom-8 right-4 md:right-8 z-10 text-[10px] tracking-[0.3em] text-white/60 hover:text-white flex flex-col items-center gap-3"
          >
            <span className="[writing-mode:vertical-rl]">SCROLL</span>
            <span className="h-12 w-px bg-white/40" />
          </a>
        </section>

        {/* ---------- Marquee ---------- */}
        <div className="bg-red-600 py-3 overflow-hidden whitespace-nowrap" aria-hidden="true">
          <div className="inline-flex animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <span key={i} className="font-display text-xl md:text-2xl px-6">
                {t} <span className="text-black pl-6">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Latest Releases ---------- */}
        <section id="music" className="py-24 md:py-32 px-4 md:px-8 scroll-mt-28">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="LATEST RELEASES" title="New Music" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {singles.map((s, i) => (
                <Reveal key={s.title} className={i === 1 ? 'md:mt-16' : ''}>
                  <article className="group">
                    <div className="relative overflow-hidden mb-6 aspect-square bg-gray-900">
                      <img src={s.image} alt={`${s.title} cover art`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] font-bold tracking-[0.25em]">{s.tag}</div>
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl mb-5">{s.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <a href={s.listen} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                        LISTEN NOW
                      </a>
                      {s.watch && (
                        <button type="button" onClick={() => playVideo(s.watch)} className={btnOutline}>
                          <PlayIcon /> WATCH
                        </button>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Discography ---------- */}
        <section className="py-24 md:py-32 px-4 md:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="DISCOGRAPHY" title="Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => {
                const available = Boolean(p.link.trim())
                return (
                  <Reveal key={p.title}>
                    <a
                      href={available ? p.link : undefined}
                      target={available ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-disabled={!available}
                      className={`group block ${available ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className="relative overflow-hidden mb-5 aspect-square bg-black">
                        <img
                          src={p.image}
                          alt={`${p.title} cover art`}
                          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${available ? '' : 'grayscale opacity-70'}`}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className={available ? btnOutline : 'text-xs font-bold tracking-[0.3em] text-white/80'}>
                            {available ? 'LISTEN NOW' : 'COMING SOON'}
                          </span>
                        </div>
                        {!available && (
                          <div className="absolute top-4 right-4 border border-white/60 px-3 py-1 text-[10px] font-bold tracking-[0.25em]">SOON</div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold tracking-wider">{p.title}</h3>
                      <p className="text-xs tracking-[0.25em] text-gray-400 mt-1">{available ? 'AVAILABLE NOW' : 'COMING SOON'}</p>
                    </a>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---------- Videos ---------- */}
        <section id="videos" className="py-24 md:py-32 px-4 md:px-8 scroll-mt-28">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="WATCH" title="Videos" />

            <Reveal className="mb-10">
              <button type="button" onClick={() => playVideo(featuredVideo.link)} className="group relative block w-full overflow-hidden text-left aspect-video bg-gray-900 grain">
                <img src={featuredVideo.image} alt={`${featuredVideo.title} ${featuredVideo.kind}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-8 h-8 md:w-10 md:h-10 ml-1" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 p-6 md:p-10">
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-red-600 mb-2">{featuredVideo.kind}</p>
                  <h3 className="font-display text-4xl md:text-7xl">{featuredVideo.title}</h3>
                </div>
              </button>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherVideos.map((v) => (
                <Reveal key={v.link}>
                  <button type="button" onClick={() => playVideo(v.link)} className="group block w-full text-left">
                    <div className="relative overflow-hidden mb-4 aspect-video bg-gray-900">
                      <img src={v.image} alt={`${v.title} ${v.kind}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <span className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayIcon className="w-5 h-5 ml-0.5" />
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.3em] text-red-600 mb-1">{v.kind}</p>
                    <h3 className="text-sm font-bold uppercase tracking-wider">{v.title}</h3>
                  </button>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14 text-center">
              <a href={platforms[2].url} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                MORE ON YOUTUBE
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="py-24 md:py-32 px-4 md:px-8 bg-gray-900 scroll-mt-28">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-red-600" aria-hidden="true" />
                <div className="relative overflow-hidden grain">
                  <img src={HeroImage} alt={ARTIST} className="w-full aspect-[4/5] object-cover object-[35%_center]" />
                </div>
              </div>
            </Reveal>
            <div>
              <SectionHeading eyebrow="THE ARTIST" title={ARTIST} />
              <Reveal>
                {/* Replace this bio with Makhaya's own words */}
                <div className="space-y-5 text-gray-300 leading-relaxed text-base md:text-lg">
                  <p>
                    {ARTIST} makes music for the people who were there from the start. These are records about
                    purpose, peace and progression, about seeing clearly and staying solid with your day ones.
                  </p>
                  <p>
                    The music comes out through the V$NRY camp. Every release comes with its own world:
                    black-and-white visuals, visualizers and stories that run from one project into the next,
                    from <span className="text-white font-bold">AFTER FOREVER END$</span> to the latest single{' '}
                    <span className="text-white font-bold">I $EE</span>.
                  </p>
                </div>
                <dl className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
                  {[
                    { n: projects.length, l: 'PROJECTS' },
                    { n: singles.length, l: 'SINGLES' },
                    { n: videos.length, l: 'VIDEOS' },
                  ].map((s) => (
                    <div key={s.l} className="flex flex-col-reverse">
                      <dt className="text-[10px] font-bold tracking-[0.3em] text-gray-400">{s.l}</dt>
                      <dd className="font-display text-5xl md:text-6xl text-red-600 mb-1">{String(s.n).padStart(2, '0')}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- Gallery ---------- */}
        <section id="gallery" className="py-24 md:py-32 px-4 md:px-8 scroll-mt-28">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="ARTWORK & VISUALS" title="Vi$ual$" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {gallery.map((g, i) => (
                <Reveal key={g.alt} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className="group relative block w-full h-full overflow-hidden bg-gray-900 aspect-square"
                    aria-label={`View ${g.alt}`}
                  >
                    <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    <span className="absolute inset-0 border-red-600 group-hover:border-4 transition-all" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Live ---------- */}
        <section id="live" className="py-24 md:py-32 px-4 md:px-8 bg-gray-900 scroll-mt-28">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="ON STAGE" title="Live Yourz" />
            <Reveal>
              {events.length === 0 ? (
                <div className="border border-white/10 py-16 px-6 text-center">
                  <p className="font-display text-3xl md:text-4xl mb-3">NO EVENTS SCHEDULED.</p>
                  <p className="text-gray-400 mb-8">New dates are coming. Join the list and you'll hear first.</p>
                  <a href="#connect" className={btnOutline}>
                    GET NOTIFIED
                  </a>
                </div>
              ) : (
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {events.map((e) => {
                    const d = new Date(e.date)
                    return (
                      <li key={e.date + e.city} className="py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                        <div className="font-display text-3xl w-32 shrink-0">
                          {d.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short' }).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold tracking-wider">{e.city}</p>
                          <p className="text-sm text-gray-400">{e.venue}</p>
                        </div>
                        <a href={e.link} target="_blank" rel="noopener noreferrer" className={btnRed}>
                          TICKETS
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </Reveal>
          </div>
        </section>

        {/* ---------- Connect ---------- */}
        <section id="connect" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden scroll-mt-28">
          <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: `url(${ISEEImage})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="bg-red-600 text-white px-4 py-1.5 inline-block text-xs font-bold tracking-[0.25em] mb-6">FOR THE DAY ONE$</div>
              <h2 className="font-display text-5xl md:text-7xl mb-4">JOIN THE WORLD</h2>
              <p className="text-gray-400 mb-10 max-w-lg mx-auto">
                Get new music, videos, show dates and drops before anyone else.
              </p>
              {subscribed ? (
                <p className="font-bold tracking-[0.2em] text-red-600 py-3">YOU'RE IN. WELCOME TO THE WORLD.</p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 sm:gap-0">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    className="flex-1 bg-black border border-gray-600 px-4 py-3 text-white placeholder-gray-500 text-sm tracking-wider focus:outline-none focus:border-white"
                    required
                  />
                  <button type="submit" className="bg-white text-black px-8 py-3 font-bold text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-colors">
                    JOIN
                  </button>
                </form>
              )}
              <p className="text-[11px] text-gray-500 mt-4 max-w-lg mx-auto">
                When you join, you agree to get news and updates from V$NRY and {ARTIST}.
              </p>

              <div className="mt-16">
                <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 mb-6">STREAM {ARTIST}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {platforms.map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                      <img src={p.icon} alt="" className="w-4 h-4" />
                      {p.name.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="py-16 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
            <div className="flex items-center gap-8">
              <img src={LOGO} alt={`${ARTIST} logo`} className="h-20 w-auto" />
              <span className="h-16 w-px bg-white/10" aria-hidden="true" />
              <img src={VSNRY} alt="V$NRY" className="h-20 w-auto" />
            </div>
            <div className="flex justify-center gap-6">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="hover:opacity-60 transition-opacity">
                  <img src={s.icon} alt="" className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 pt-8 border-t border-white/5">
            <p>
              © {new Date().getFullYear()} V$NRY. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white">Terms and Conditions</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Send Us Feedback</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------- Video modal ---------- */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Video player" onClick={() => setActiveVideo(null)}>
          <button type="button" className="absolute top-4 right-4 md:top-8 md:right-8 text-xs font-bold tracking-[0.3em] hover:text-red-600" onClick={() => setActiveVideo(null)}>
            CLOSE ✕
          </button>
          <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ---------- Image lightbox ---------- */}
      {activeImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setActiveImage(null)}>
          <button type="button" className="absolute top-4 right-4 md:top-8 md:right-8 text-xs font-bold tracking-[0.3em] hover:text-red-600" onClick={() => setActiveImage(null)}>
            CLOSE ✕
          </button>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-2 md:left-8 text-4xl px-3 py-2 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation()
              setActiveImage((activeImage - 1 + gallery.length) % gallery.length)
            }}
          >
            ‹
          </button>
          <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-2 md:right-8 text-4xl px-3 py-2 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation()
              setActiveImage((activeImage + 1) % gallery.length)
            }}
          >
            ›
          </button>
          <p className="absolute bottom-6 inset-x-0 text-center text-[10px] tracking-[0.3em] text-gray-400">
            {activeImage + 1} / {gallery.length}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
