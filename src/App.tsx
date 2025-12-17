import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

// Portfolio items - proper spacing, centered in content area
const portfolioItems = [
  // Hero cluster - scattered overlapping items
  { id: 1, x: 40, y: 60, w: 180, h: 180, rotate: -3, z: 10 },
  { id: 2, x: 200, y: 40, w: 160, h: 200, rotate: 5, z: 11 },
  { id: 3, x: 340, y: 80, w: 150, h: 150, rotate: -2, z: 12 },
  { id: 4, x: 120, y: 200, w: 170, h: 210, rotate: 8, z: 13 },
  { id: 5, x: 280, y: 180, w: 140, h: 180, rotate: -6, z: 14 },
  { id: 6, x: 30, y: 320, w: 160, h: 160, rotate: 4, z: 15 },
  { id: 7, x: 180, y: 350, w: 180, h: 140, rotate: -4, z: 16 },
  { id: 8, x: 350, y: 300, w: 150, h: 190, rotate: 6, z: 17 },

  // Second section - larger images
  { id: 9, x: 20, y: 520, w: 260, h: 320, rotate: -4, z: 20 },
  { id: 10, x: 300, y: 560, w: 240, h: 300, rotate: 5, z: 21 },

  // Third section - mixed sizes
  { id: 11, x: 60, y: 880, w: 200, h: 250, rotate: 3, z: 25 },
  { id: 12, x: 280, y: 900, w: 180, h: 220, rotate: -5, z: 26 },
  { id: 13, x: 140, y: 1100, w: 220, h: 180, rotate: 4, z: 27 },
  { id: 14, x: 360, y: 1080, w: 160, h: 200, rotate: -3, z: 28 },

  // Grid section - 2 columns
  { id: 15, x: 20, y: 1350, w: 260, h: 260, rotate: 0, z: 30 },
  { id: 16, x: 300, y: 1350, w: 260, h: 260, rotate: 0, z: 31 },
  { id: 17, x: 20, y: 1630, w: 260, h: 260, rotate: 0, z: 32 },
  { id: 18, x: 300, y: 1630, w: 260, h: 260, rotate: 0, z: 33 },

  // Stacked photos section
  { id: 19, x: 180, y: 1950, w: 140, h: 190, rotate: -8, z: 40 },
  { id: 20, x: 200, y: 1970, w: 140, h: 190, rotate: 3, z: 41 },
  { id: 21, x: 220, y: 1990, w: 140, h: 190, rotate: -3, z: 42 },

  // More grid
  { id: 22, x: 20, y: 2250, w: 260, h: 260, rotate: 0, z: 50 },
  { id: 23, x: 300, y: 2250, w: 260, h: 260, rotate: 0, z: 51 },
  { id: 24, x: 20, y: 2530, w: 260, h: 320, rotate: 0, z: 52 },
  { id: 25, x: 300, y: 2530, w: 260, h: 320, rotate: 0, z: 53 },

  // Bottom scattered
  { id: 26, x: 60, y: 2900, w: 200, h: 260, rotate: -6, z: 60 },
  { id: 27, x: 300, y: 2940, w: 220, h: 280, rotate: 4, z: 61 },
  { id: 28, x: 120, y: 3200, w: 240, h: 200, rotate: 3, z: 62 },
  { id: 29, x: 340, y: 3180, w: 180, h: 240, rotate: -5, z: 63 },
  { id: 30, x: 40, y: 3450, w: 260, h: 320, rotate: 0, z: 64 },
  { id: 31, x: 320, y: 3480, w: 240, h: 300, rotate: 0, z: 65 },
]

// All portfolio images - creative/artistic photos
const portfolioImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=700&fit=crop',
]

// Portfolio Card Content
function CardContent({ index }: { index: number }) {
  const imageUrl = portfolioImages[index % portfolioImages.length]
  return (
    <img
      src={imageUrl}
      alt={`Portfolio ${index + 1}`}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  )
}

// Draggable Portfolio Card
function DraggableCard({ item, index }: { item: typeof portfolioItems[0], index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
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
        zIndex: isDragging ? 100 : item.z,
        cursor: 'grab',
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.03 }}
      whileHover={{ scale: 1.02 }}
      className="select-none overflow-hidden bg-neutral-100"
    >
      <CardContent index={index} />
    </motion.div>
  )
}

// Sidebar - Clean and Simple
function Sidebar() {
  const [activeSection, setActiveSection] = useState('work')

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white z-[100] flex flex-col items-center py-10 px-6 border-r border-neutral-100 shadow-sm">
      {/* Name */}
      <h1 className="text-[28px] font-black leading-[0.95] tracking-tight text-center mb-2">
        ANNA<br />MILLS
      </h1>

      {/* Role */}
      <p className="text-[10px] text-neutral-400 tracking-[0.15em] uppercase mb-6">
        Creative Director
      </p>

      {/* Profile Image */}
      <div className="w-24 h-24 mb-6 overflow-hidden rounded-full">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop"
          alt="Portrait"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-2 mb-6">
        {['ABOUT', 'WORK', 'CONTACT'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setActiveSection(item.toLowerCase())}
            className={`text-[10px] font-medium tracking-[0.12em] transition-colors ${
              activeSection === item.toLowerCase()
                ? 'text-black'
                : 'text-neutral-400 hover:text-black'
            }`}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Description */}
      <p className="text-[10px] text-neutral-400 text-center leading-relaxed mb-6 px-2">
        Welcome to my portfolio. Scroll to explore my work.
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Social */}
      <div className="flex items-center gap-4">
        {['IG', 'BE', 'LI'].map((s) => (
          <a key={s} href="#" className="text-[9px] text-neutral-300 hover:text-black transition-colors">
            {s}
          </a>
        ))}
      </div>
    </aside>
  )
}

// Back to Top Button
function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center z-50 hover:bg-neutral-800 transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}

// Main App
function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const contentHeight = 4000

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar - higher z-index */}
      <Sidebar />

      {/* Main content area */}
      <main
        ref={containerRef}
        className="ml-[240px] relative z-10"
        style={{ minHeight: contentHeight }}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-[240px] right-0 h-[2px] bg-black z-30 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        {/* Portfolio Items Container */}
        <div className="relative p-8" style={{ maxWidth: 600 }}>
          {portfolioItems.map((item, index) => (
            <DraggableCard key={item.id} item={item} index={index} />
          ))}
          {/* Spacer for scroll height */}
          <div style={{ height: contentHeight }} />
        </div>
      </main>

      <BackToTop />
    </div>
  )
}

export default App
