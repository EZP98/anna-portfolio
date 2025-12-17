import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

// Portfolio images data - scattered layout with rotations
const portfolioItems = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', x: 350, y: 100, w: 198, h: 198, rotate: 0, z: 304 },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', x: 580, y: 120, w: 147, h: 151, rotate: 0, z: 308 },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', x: 450, y: 150, w: 166, h: 166, rotate: 0, z: 305 },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', x: 280, y: 180, w: 164, h: 163, rotate: 13, z: 307 },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', x: 340, y: 260, w: 128, h: 160, rotate: -22, z: 310 },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400', x: 460, y: 280, w: 171, h: 213, rotate: 15, z: 309 },
  { id: 7, type: 'image', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', x: 620, y: 200, w: 160, h: 201, rotate: 14, z: 306 },
  { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', x: 610, y: 350, w: 138, h: 174, rotate: -8, z: 303 },
  { id: 9, type: 'image', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', x: 350, y: 380, w: 150, h: 150, rotate: -6, z: 311 },
  // Row 2
  { id: 10, type: 'image', src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', x: 460, y: 550, w: 175, h: 216, rotate: 0, z: 312 },
  { id: 11, type: 'image', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', x: 580, y: 580, w: 148, h: 192, rotate: 14, z: 317 },
  { id: 12, type: 'image', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', x: 290, y: 620, w: 184, h: 183, rotate: -10, z: 313 },
  { id: 13, type: 'image', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', x: 680, y: 650, w: 140, h: 174, rotate: -17, z: 318 },
  { id: 14, type: 'image', src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400', x: 610, y: 770, w: 167, h: 174, rotate: -13, z: 314 },
  { id: 15, type: 'image', src: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400', x: 300, y: 780, w: 175, h: 175, rotate: -15, z: 316 },
  { id: 16, type: 'image', src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400', x: 460, y: 800, w: 172, h: 213, rotate: 12, z: 315 },
  // Row 3
  { id: 17, type: 'image', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', x: 600, y: 1050, w: 327, h: 326, rotate: 0, z: 320 },
  { id: 18, type: 'image', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400', x: 260, y: 1050, w: 325, h: 325, rotate: 0, z: 319 },
  // Row 4
  { id: 19, type: 'image', src: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=400', x: 260, y: 1420, w: 329, h: 328, rotate: 0, z: 321 },
  { id: 20, type: 'image', src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400', x: 600, y: 1420, w: 329, h: 328, rotate: 0, z: 322 },
  // Row 5 - scattered cards
  { id: 21, type: 'image', src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400', x: 500, y: 1800, w: 146, h: 207, rotate: 10, z: 344 },
  { id: 22, type: 'image', src: 'https://images.unsplash.com/photo-1485968579169-a6b81ca8df80?w=400', x: 445, y: 1830, w: 146, h: 212, rotate: 7, z: 348 },
  { id: 23, type: 'image', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400', x: 510, y: 1850, w: 146, h: 206, rotate: -4, z: 346 },
  { id: 24, type: 'image', src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', x: 530, y: 1870, w: 149, h: 207, rotate: 0, z: 345 },
  { id: 25, type: 'image', src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', x: 480, y: 1900, w: 149, h: 210, rotate: -9, z: 349 },
  // More content
  { id: 26, type: 'image', src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400', x: 260, y: 2200, w: 329, h: 327, rotate: 0, z: 340 },
  { id: 27, type: 'image', src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400', x: 600, y: 2200, w: 329, h: 328, rotate: 0, z: 341 },
  { id: 28, type: 'image', src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', x: 260, y: 2560, w: 329, h: 330, rotate: 0, z: 343 },
  { id: 29, type: 'image', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', x: 600, y: 2560, w: 330, h: 330, rotate: 0, z: 342 },
]

// Draggable Image Component
function DraggableImage({ item }: { item: typeof portfolioItems[0] }) {
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
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="select-none"
    >
      <img
        src={item.src}
        alt=""
        className="w-full h-full object-cover rounded-xl shadow-lg"
        draggable={false}
        style={{ borderRadius: 11 }}
      />
    </motion.div>
  )
}

// Sidebar Navigation
function Sidebar() {
  const [activeSection, setActiveSection] = useState('work')

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-white z-50 flex flex-col items-center py-10 px-6"
    >
      {/* Logo */}
      <motion.a
        href="/"
        className="mb-8"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
          alt="Anna Mills"
          className="w-32 h-20 object-cover rounded-lg"
        />
      </motion.a>

      {/* Animated Canvas Placeholder */}
      <motion.div
        className="w-32 h-32 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 mb-6 overflow-hidden"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="w-full h-full flex items-center justify-center"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 opacity-50" />
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-2 mb-6">
        {['ABOUT', 'WORK', 'CONTACT', 'PLAY!'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase().replace('!', '')}`}
            onClick={() => setActiveSection(item.toLowerCase().replace('!', ''))}
            className={`text-[9px] font-medium tracking-wider transition-colors ${
              activeSection === item.toLowerCase().replace('!', '')
                ? 'text-black'
                : 'text-black/60 hover:text-black'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      {/* Welcome Text */}
      <p className="text-[9px] text-black/80 text-center leading-relaxed max-w-[168px]">
        Welcome to my website! Do stick around. Scrolling is encouraged here, it makes things happen.
      </p>
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
      className="fixed bottom-8 right-8 w-12 h-12 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center z-50 transition-colors"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

  // Calculate content height based on items
  const maxY = Math.max(...portfolioItems.map(item => item.y + item.h))
  const contentHeight = maxY + 300

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        ref={containerRef}
        className="ml-[280px] relative"
        style={{ height: contentHeight }}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-[280px] right-0 h-1 bg-black/10 z-40"
          style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
        />

        {/* Portfolio Items */}
        <div className="relative" style={{ width: '100%', height: contentHeight }}>
          {portfolioItems.map((item) => (
            <DraggableImage key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 py-10 text-center">
          <p className="text-[9px] text-black/50">
            © 2025 Anna Mills. All rights reserved.
          </p>
        </div>
      </main>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

export default App
