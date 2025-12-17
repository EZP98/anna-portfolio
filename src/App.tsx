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

// Portfolio Card Content - All images, no black boxes
function CardContent({ item, index }: { item: typeof portfolioItems[0], index: number }) {
  const imageUrl = portfolioImages[index % portfolioImages.length]
  return (
    <div className="w-full h-full relative overflow-hidden group">
      <img
        src={imageUrl}
        alt={`Portfolio piece ${item.id}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
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
        zIndex: isDragging ? 1000 : item.z,
        cursor: 'grab',
        borderRadius: 12,
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
      whileHover={{ scale: 1.02 }}
      className="select-none overflow-hidden"
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

// Sidebar - Clean and Simple
function Sidebar() {
  const [activeSection, setActiveSection] = useState('work')

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white z-50 flex flex-col items-center py-10 px-6 border-r border-neutral-100">
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

  const contentHeight = 5800

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <main
        ref={containerRef}
        className="ml-[240px] relative"
        style={{ height: contentHeight }}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-[240px] right-0 h-[2px] bg-black z-40 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        {/* Portfolio Items */}
        <div
          className="relative mx-auto"
          style={{ width: 700, height: contentHeight, paddingTop: 40 }}
        >
          {portfolioItems.map((item, index) => (
            <DraggableCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </main>

      <BackToTop />
    </div>
  )
}

export default App
