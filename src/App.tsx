import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

// Portfolio items - matching annamills.xyz layout exactly
// Content area: starts at x~100 (after 300px sidebar), extends to ~700px
// Border radius: 11px, various rotations
const portfolioItems = [
  // Hero section - scattered small items (y: 0-500)
  { id: 1, x: 108, y: 70, w: 198, h: 198, rotate: 0, z: 304, type: 'video' },
  { id: 2, x: 199, y: 114, w: 166, h: 166, rotate: 0, z: 305, type: 'video' },
  { id: 3, x: 334, y: 84, w: 147, h: 151, rotate: 0, z: 308, type: 'image' },
  { id: 4, x: 23, y: 132, w: 164, h: 163, rotate: 13, z: 307, type: 'image' },
  { id: 5, x: 382, y: 148, w: 160, h: 201, rotate: 14, z: 306, type: 'image' },
  { id: 6, x: 92, y: 209, w: 128, h: 160, rotate: -22, z: 310, type: 'image' },
  { id: 7, x: 199, y: 209, w: 171, h: 213, rotate: 15, z: 309, type: 'image' },
  { id: 8, x: 365, y: 280, w: 138, h: 174, rotate: -8, z: 303, type: 'video' },
  { id: 9, x: 92, y: 296, w: 150, h: 150, rotate: -6, z: 311, type: 'video' },

  // Overlapping videos section (y: 500-900)
  { id: 10, x: 35, y: 539, w: 279, h: 344, rotate: -5, z: 353, type: 'video' },
  { id: 11, x: 296, y: 605, w: 258, h: 322, rotate: 8, z: 354, type: 'video' },

  // Middle section - images and videos (y: 900-1400)
  { id: 12, x: 201, y: 900, w: 175, h: 216, rotate: 0, z: 312, type: 'image' },
  { id: 13, x: 35, y: 964, w: 184, h: 183, rotate: -10, z: 313, type: 'image' },
  { id: 14, x: 325, y: 930, w: 148, h: 192, rotate: 14, z: 317, type: 'image' },
  { id: 15, x: 430, y: 986, w: 140, h: 174, rotate: -17, z: 318, type: 'image' },
  { id: 16, x: 360, y: 1105, w: 167, h: 174, rotate: -13, z: 314, type: 'image' },
  { id: 17, x: 47, y: 1111, w: 175, h: 175, rotate: -15, z: 316, type: 'image' },
  { id: 18, x: 209, y: 1136, w: 172, h: 213, rotate: 12, z: 315, type: 'image' },

  // Grid videos section (y: 1500-2200)
  { id: 19, x: 9, y: 1500, w: 325, h: 325, rotate: 0, z: 319, type: 'video' },
  { id: 20, x: 350, y: 1499, w: 327, h: 326, rotate: 0, z: 320, type: 'video' },
  { id: 21, x: 7, y: 1840, w: 329, h: 328, rotate: 0, z: 321, type: 'video' },
  { id: 22, x: 350, y: 1842, w: 329, h: 329, rotate: 0, z: 322, type: 'video' },

  // Stacked images section (y: 2360-2650)
  { id: 23, x: 250, y: 2361, w: 146, h: 207, rotate: 10, z: 344, type: 'image' },
  { id: 24, x: 196, y: 2378, w: 146, h: 212, rotate: 7, z: 348, type: 'image' },
  { id: 25, x: 263, y: 2383, w: 146, h: 206, rotate: -4, z: 346, type: 'image' },
  { id: 26, x: 279, y: 2402, w: 149, h: 207, rotate: 0, z: 345, type: 'image' },
  { id: 27, x: 267, y: 2399, w: 145, h: 206, rotate: -4, z: 347, type: 'image' },
  { id: 28, x: 238, y: 2394, w: 149, h: 210, rotate: -9, z: 349, type: 'image' },

  // More grid videos (y: 2800-3500)
  { id: 29, x: 3, y: 2800, w: 327, h: 328, rotate: 0, z: 340, type: 'video' },
  { id: 30, x: 347, y: 2799, w: 329, h: 329, rotate: 0, z: 341, type: 'video' },
  { id: 31, x: 4, y: 3149, w: 329, h: 330, rotate: 0, z: 343, type: 'video' },
  { id: 32, x: 348, y: 3148, w: 330, h: 330, rotate: 0, z: 342, type: 'video' },
  { id: 33, x: 5, y: 3494, w: 329, h: 410, rotate: 0, z: 328, type: 'video' },
  { id: 34, x: 350, y: 3493, w: 330, h: 412, rotate: 0, z: 350, type: 'video' },

  // Bottom section (y: 4100-7000)
  { id: 35, x: 30, y: 4167, w: 207, h: 259, rotate: -9, z: 302, type: 'image' },
  { id: 36, x: 373, y: 4210, w: 268, h: 360, rotate: 6, z: 323, type: 'image' },
  { id: 37, x: 152, y: 4375, w: 247, h: 225, rotate: 4, z: 324, type: 'image' },
  { id: 38, x: 383, y: 4463, w: 208, h: 208, rotate: -4, z: 325, type: 'video' },
  { id: 39, x: 354, y: 4712, w: 306, h: 428, rotate: 0, z: 326, type: 'image' },
  { id: 40, x: 10, y: 4872, w: 329, h: 413, rotate: -9, z: 338, type: 'video' },
  { id: 41, x: 354, y: 5151, w: 306, h: 292, rotate: 0, z: 327, type: 'image' },
  { id: 42, x: 10, y: 5299, w: 328, h: 368, rotate: 0, z: 330, type: 'video' },
  { id: 43, x: 354, y: 5456, w: 309, h: 311, rotate: 0, z: 329, type: 'image' },
  { id: 44, x: 9, y: 5697, w: 313, h: 336, rotate: -3, z: 301, type: 'video' },
  { id: 45, x: 355, y: 5777, w: 308, h: 310, rotate: 0, z: 331, type: 'video' },
  { id: 46, x: 163, y: 5974, w: 175, h: 175, rotate: 9, z: 333, type: 'image' },
  { id: 47, x: 35, y: 6107, w: 186, h: 186, rotate: -16, z: 332, type: 'image' },
  { id: 48, x: 185, y: 6112, w: 209, h: 213, rotate: 9, z: 352, type: 'image' },
  { id: 49, x: 431, y: 6111, w: 232, h: 360, rotate: 9, z: 334, type: 'image' },
  { id: 50, x: 55, y: 6332, w: 354, h: 354, rotate: -5, z: 335, type: 'video' },
  { id: 51, x: 55, y: 6696, w: 356, h: 200, rotate: 12, z: 337, type: 'video' },
  { id: 52, x: 328, y: 6814, w: 278, h: 278, rotate: 16, z: 351, type: 'video' },
]

// Sample images for portfolio (using picsum for variety)
const sampleImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
]

// Video placeholder colors (simulating video content)
const videoColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
]

// Portfolio Card Content
function CardContent({ item, index }: { item: typeof portfolioItems[0], index: number }) {
  if (item.type === 'video') {
    // Video placeholder with gradient
    const gradient = videoColors[index % videoColors.length]
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: gradient }}
      >
        {/* Play button overlay */}
        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
        </div>
      </div>
    )
  } else {
    // Image
    const imageUrl = sampleImages[index % sampleImages.length]
    return (
      <img
        src={imageUrl}
        alt={`Portfolio piece ${item.id}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    )
  }
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
        borderRadius: 11,
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="select-none overflow-hidden"
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

// Sidebar Navigation - matching annamills.xyz style
function Sidebar() {
  const [activeSection, setActiveSection] = useState('work')

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-white z-50 flex flex-col items-center py-10 px-6 border-r border-black/5"
    >
      {/* Name / Logo */}
      <div className="mb-4 text-center">
        <h1 className="text-[38px] font-black leading-[0.95] tracking-tight">
          ANNA<br />MILLS
        </h1>
      </div>

      {/* Glitch/Pixel Text - condensed */}
      <div className="mb-6 text-center">
        <div className="text-[10px] font-mono tracking-wider text-black/60 leading-relaxed" style={{
          fontFamily: 'monospace',
        }}>
          ▓▓ ▓▓▓▓ ▓▓▓ ▓▓▓ ▓▓<br />
          ▓ ▓▓▓▓▓▓▓<br />
          ▓▓ ▓▓▓ ▓▓▓ ▓▓▓<br />
          ▓▓▓ ▓▓▓▓▓▓ ▓
        </div>
      </div>

      {/* Vintage Photo */}
      <motion.div
        className="w-32 h-40 mb-6 overflow-hidden rounded-sm"
        whileHover={{ scale: 1.03 }}
      >
        <img
          src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=400&fit=crop&q=80"
          alt="Vintage portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        />
      </motion.div>

      {/* Navigation - Horizontal with separators */}
      <nav className="flex items-center gap-4 mb-5">
        {['ABOUT', 'WORK', 'CONTACT'].map((item, i) => (
          <div key={item} className="flex items-center gap-4">
            <motion.a
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveSection(item.toLowerCase())}
              className={`text-[10px] font-medium tracking-wider transition-colors ${
                activeSection === item.toLowerCase()
                  ? 'text-black'
                  : 'text-black/40 hover:text-black'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
            {i < 2 && <span className="text-black/20 text-[10px]">|</span>}
          </div>
        ))}
      </nav>

      {/* Welcome Text */}
      <p className="text-[10px] text-black/60 text-center leading-[1.6] max-w-[180px] mb-6">
        Welcome to my website! Do stick around. Scrolling is encouraged here, it makes things happen.
      </p>

      {/* Play Link */}
      <motion.a
        href="#play"
        className="text-[10px] font-medium tracking-wider text-black hover:text-black/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        PLAY!
      </motion.a>
    </motion.aside>
  )
}

// Back to Top Button
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showButton ? 1 : 0,
        scale: showButton ? 1 : 0.8,
        pointerEvents: showButton ? 'auto' : 'none'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center z-50 transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </motion.button>
  )
}

// Main App
function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Content height matches annamills.xyz (7440px scaled)
  const contentHeight = 7500

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area - 280px sidebar, content area ~700px */}
      <main
        ref={containerRef}
        className="ml-[280px] relative"
        style={{ height: contentHeight }}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-[280px] right-0 h-[2px] bg-black/10 z-40 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        {/* Portfolio Items Container - 700px wide content area */}
        <div
          className="relative mx-auto"
          style={{ width: 700, height: contentHeight }}
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
