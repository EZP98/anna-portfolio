import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

// Portfolio items - matching annamills.xyz layout
// Hero section items are tightly clustered and overlapping
const portfolioItems = [
  // Hero cluster - tightly grouped overlapping items (y: 50-450)
  { id: 1, x: 80, y: 50, w: 198, h: 198, rotate: 0, z: 304, type: 'video' },
  { id: 2, x: 170, y: 95, w: 166, h: 166, rotate: 0, z: 305, type: 'video' },
  { id: 3, x: 310, y: 65, w: 147, h: 151, rotate: 0, z: 308, type: 'image' },
  { id: 4, x: 0, y: 110, w: 164, h: 163, rotate: 13, z: 307, type: 'image' },
  { id: 5, x: 355, y: 130, w: 160, h: 201, rotate: 14, z: 306, type: 'image' },
  { id: 6, x: 65, y: 190, w: 128, h: 160, rotate: -22, z: 310, type: 'image' },
  { id: 7, x: 170, y: 185, w: 171, h: 213, rotate: 15, z: 309, type: 'image' },
  { id: 8, x: 340, y: 260, w: 138, h: 174, rotate: -8, z: 303, type: 'video' },
  { id: 9, x: 60, y: 280, w: 150, h: 150, rotate: -6, z: 311, type: 'video' },
  { id: 10, x: 200, y: 320, w: 150, h: 150, rotate: 3, z: 312, type: 'image' },

  // Second cluster - overlapping videos (y: 450-850)
  { id: 11, x: 20, y: 470, w: 279, h: 344, rotate: -5, z: 353, type: 'video' },
  { id: 12, x: 280, y: 540, w: 258, h: 322, rotate: 8, z: 354, type: 'video' },

  // Third section - scattered images (y: 850-1350)
  { id: 13, x: 180, y: 860, w: 175, h: 216, rotate: 0, z: 313, type: 'image' },
  { id: 14, x: 15, y: 920, w: 184, h: 183, rotate: -10, z: 314, type: 'image' },
  { id: 15, x: 310, y: 890, w: 148, h: 192, rotate: 14, z: 315, type: 'image' },
  { id: 16, x: 420, y: 950, w: 140, h: 174, rotate: -17, z: 316, type: 'image' },
  { id: 17, x: 340, y: 1070, w: 167, h: 174, rotate: -13, z: 317, type: 'image' },
  { id: 18, x: 30, y: 1080, w: 175, h: 175, rotate: -15, z: 318, type: 'image' },
  { id: 19, x: 185, y: 1100, w: 172, h: 213, rotate: 12, z: 319, type: 'image' },

  // Grid videos - 2 columns (y: 1400-2100)
  { id: 20, x: 0, y: 1400, w: 325, h: 325, rotate: 0, z: 320, type: 'video' },
  { id: 21, x: 340, y: 1400, w: 327, h: 326, rotate: 0, z: 321, type: 'video' },
  { id: 22, x: 0, y: 1740, w: 329, h: 328, rotate: 0, z: 322, type: 'video' },
  { id: 23, x: 340, y: 1740, w: 329, h: 329, rotate: 0, z: 323, type: 'video' },

  // Stacked polaroid-style images (y: 2100-2400)
  { id: 24, x: 230, y: 2150, w: 146, h: 207, rotate: 10, z: 344, type: 'image' },
  { id: 25, x: 180, y: 2170, w: 146, h: 212, rotate: 7, z: 345, type: 'image' },
  { id: 26, x: 245, y: 2175, w: 146, h: 206, rotate: -4, z: 346, type: 'image' },
  { id: 27, x: 260, y: 2195, w: 149, h: 207, rotate: 0, z: 347, type: 'image' },
  { id: 28, x: 250, y: 2190, w: 145, h: 206, rotate: -4, z: 348, type: 'image' },
  { id: 29, x: 220, y: 2185, w: 149, h: 210, rotate: -9, z: 349, type: 'image' },

  // More grid videos (y: 2500-3400)
  { id: 30, x: 0, y: 2500, w: 327, h: 328, rotate: 0, z: 330, type: 'video' },
  { id: 31, x: 340, y: 2500, w: 329, h: 329, rotate: 0, z: 331, type: 'video' },
  { id: 32, x: 0, y: 2850, w: 329, h: 330, rotate: 0, z: 332, type: 'video' },
  { id: 33, x: 340, y: 2850, w: 330, h: 330, rotate: 0, z: 333, type: 'video' },
  { id: 34, x: 0, y: 3200, w: 329, h: 410, rotate: 0, z: 334, type: 'video' },
  { id: 35, x: 340, y: 3200, w: 330, h: 412, rotate: 0, z: 335, type: 'video' },

  // Bottom scattered section (y: 3700-5500)
  { id: 36, x: 20, y: 3700, w: 207, h: 259, rotate: -9, z: 336, type: 'image' },
  { id: 37, x: 360, y: 3750, w: 268, h: 360, rotate: 6, z: 337, type: 'image' },
  { id: 38, x: 140, y: 3920, w: 247, h: 225, rotate: 4, z: 338, type: 'image' },
  { id: 39, x: 370, y: 4010, w: 208, h: 208, rotate: -4, z: 339, type: 'video' },
  { id: 40, x: 340, y: 4260, w: 306, h: 428, rotate: 0, z: 340, type: 'image' },
  { id: 41, x: 0, y: 4420, w: 329, h: 413, rotate: -9, z: 341, type: 'video' },
  { id: 42, x: 340, y: 4700, w: 306, h: 292, rotate: 0, z: 342, type: 'image' },
  { id: 43, x: 0, y: 4850, w: 328, h: 368, rotate: 0, z: 343, type: 'video' },
  { id: 44, x: 340, y: 5010, w: 309, h: 311, rotate: 0, z: 350, type: 'image' },
  { id: 45, x: 0, y: 5250, w: 313, h: 336, rotate: -3, z: 351, type: 'video' },
  { id: 46, x: 340, y: 5330, w: 308, h: 310, rotate: 0, z: 352, type: 'video' },
]

// Modern grayscale/muted images for cohesive look
const sampleImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700&fit=crop&sat=-100',
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop&sat=-100',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=600&fit=crop&sat=-100',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&h=700&fit=crop&sat=-100',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop',
]

// Modern minimal video thumbnails - sophisticated dark tones
const videoThumbnails = [
  { bg: '#1a1a1a', accent: '#ffffff' },
  { bg: '#0a0a0a', accent: '#e5e5e5' },
  { bg: '#171717', accent: '#fafafa' },
  { bg: '#0f0f0f', accent: '#d4d4d4' },
  { bg: '#141414', accent: '#f5f5f5' },
  { bg: '#1c1c1c', accent: '#e0e0e0' },
  { bg: '#0d0d0d', accent: '#ffffff' },
  { bg: '#181818', accent: '#f0f0f0' },
]

// Portfolio Card Content - Modern Design
function CardContent({ item, index }: { item: typeof portfolioItems[0], index: number }) {
  if (item.type === 'video') {
    const style = videoThumbnails[index % videoThumbnails.length]
    return (
      <div
        className="w-full h-full flex items-center justify-center relative group"
        style={{ backgroundColor: style.bg }}
      >
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        {/* Modern play button */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${style.accent}10`,
            border: `1px solid ${style.accent}20`,
          }}
        >
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path d="M0 0V20L18 10L0 0Z" fill={style.accent} fillOpacity="0.8" />
          </svg>
        </div>
      </div>
    )
  } else {
    const imageUrl = sampleImages[index % sampleImages.length]
    const isGrayscale = index % 3 === 0
    return (
      <div className="w-full h-full relative overflow-hidden group">
        <img
          src={imageUrl}
          alt={`Portfolio piece ${item.id}`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isGrayscale ? 'grayscale group-hover:grayscale-0' : ''}`}
          loading="lazy"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
    )
  }
}

// Draggable Portfolio Card - Modern with subtle shadows
function DraggableCard({ item, index }: { item: typeof portfolioItems[0], index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        x,
        y,
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.h,
        rotate: item.rotate,
        zIndex: isDragging ? 1000 : item.z,
        cursor: 'grab',
        borderRadius: 16,
        boxShadow: isDragging
          ? '0 30px 60px -15px rgba(0, 0, 0, 0.3)'
          : '0 4px 20px -5px rgba(0, 0, 0, 0.1)',
      }}
      whileDrag={{
        cursor: 'grabbing',
        scale: 1.03,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="select-none overflow-hidden"
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

// Sidebar Navigation - Modern Minimal Design
function Sidebar() {
  const [activeSection, setActiveSection] = useState('work')
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed left-0 top-0 h-screen w-[260px] bg-[#fafafa] z-50 flex flex-col items-center py-12 px-8"
    >
      {/* Name / Logo - Modern Typography */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="text-[32px] font-bold leading-[1] tracking-[-0.02em] text-neutral-900">
          ANNA<br />MILLS
        </h1>
        <div className="mt-2 w-8 h-[2px] bg-neutral-900 mx-auto" />
      </motion.div>

      {/* Subtitle - Clean */}
      <motion.p
        className="text-[11px] text-neutral-400 tracking-[0.2em] uppercase mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Creative Director
      </motion.p>

      {/* Profile Image - Modern rounded */}
      <motion.div
        className="w-28 h-28 mb-8 overflow-hidden rounded-full ring-1 ring-neutral-200"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&q=80"
          alt="Portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(30%)' }}
        />
      </motion.div>

      {/* Navigation - Vertical Modern */}
      <nav className="flex flex-col items-center gap-3 mb-8">
        {['ABOUT', 'WORK', 'CONTACT'].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setActiveSection(item.toLowerCase())}
            onMouseEnter={() => setHoveredNav(item)}
            onMouseLeave={() => setHoveredNav(null)}
            className="relative text-[11px] font-medium tracking-[0.15em] transition-colors"
            style={{
              color: activeSection === item.toLowerCase() ? '#171717' : '#a3a3a3',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
          >
            {item}
            <motion.span
              className="absolute -bottom-1 left-0 h-[1px] bg-neutral-900"
              initial={{ width: 0 }}
              animate={{
                width: activeSection === item.toLowerCase() || hoveredNav === item ? '100%' : 0
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.a>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Social/Contact - Bottom */}
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        {['IG', 'TW', 'BE'].map((social) => (
          <a
            key={social}
            href="#"
            className="text-[10px] font-medium tracking-wider text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            {social}
          </a>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.p
        className="text-[9px] text-neutral-300 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        © 2024
      </motion.p>
    </motion.aside>
  )
}

// Back to Top Button - Modern Minimal
function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: showButton ? 1 : 0,
        y: showButton ? 0 : 20,
        pointerEvents: showButton ? 'auto' : 'none'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center z-50 transition-colors shadow-lg"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </motion.button>
  )
}

// Main App - Modern Clean Design
function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Content height based on last item position
  const contentHeight = 5800

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        ref={containerRef}
        className="ml-[260px] relative"
        style={{ height: contentHeight }}
      >
        {/* Progress Bar - Modern thin line */}
        <motion.div
          className="fixed top-0 left-[260px] right-0 h-[1px] bg-neutral-900 z-40 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        {/* Portfolio Items Container */}
        <div
          className="relative mx-auto pt-8"
          style={{ width: 680, height: contentHeight }}
        >
          {portfolioItems.map((item, index) => (
            <DraggableCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </main>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

export default App
