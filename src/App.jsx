import React, { useState, useEffect, useRef } from 'react';
import { Camera, BookOpen, ChevronLeft, ChevronRight, Menu, X, Heart, Share2, Calendar, MapPin, ChevronDown, ChevronUp, Book } from 'lucide-react';

// Mock data for the family archives
const FAMILY_PHOTOS = [
  {
    id: 1,
    title: "The Arrival at Ellis Island",
    year: "1924",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=1000",
    story: "This photo was taken moments after Great-Grandfather Elias stepped off the boat. He carried nothing but a small leather suitcase and a violin. In his letters, he described the 'Lady in the Harbor' not as a statue, but as a promise. He spent his first night in a boarding house on Orchard Street, sharing a room with three other men, all dreaming of the same golden streets. It was the beginning of a long journey toward the American dream, one paved with hard work and the music of his homeland.",
    tags: ["Immigration", "Elias", "New York"]
  },
  {
    id: 2,
    title: "Summer at Bluebell Farm",
    year: "1942",
    location: "Sussex, England",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000",
    story: "During the war, the children were sent to the countryside. Here, Aunt Martha is seen feeding the calves. She often told us that despite the rationing and the distant sound of planes, those summers felt like a different world—one of fresh milk, tall grass, and the simple joy of safety. It was the last summer the whole family was together before the mobilization changed everything. They spent their evenings singing around the piano, trying to ignore the blackout curtains that reminded them of the world outside.",
    tags: ["War Time", "Martha", "Countryside"]
  },
  {
    id: 3,
    title: "The Sunday Drive",
    year: "1958",
    location: "Oakland, California",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
    story: "Grandpa finally bought his dream car—a cherry red Chevrolet. He insisted on driving the family to the coast every single Sunday, even if it rained. Grandma would pack egg salad sandwiches wrapped in wax paper. In this shot, you can see the sheer pride on his face, a symbol of the post-war prosperity he worked three jobs to achieve. He always said the road was where he felt most free, and that car was the vessel for all our childhood adventures.",
    tags: ["Grandpa Joe", "Travel", "Classic Cars"]
  },
  {
    id: 4,
    title: "Wedding Day in the Rain",
    year: "1965",
    location: "Dublin, Ireland",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000",
    story: "They say rain on your wedding day is good luck. For Margaret and Sean, it was a torrential downpour. The church basement flooded, and the cake started to lean, but they didn't care. They danced until 3 AM. Sean always joked that they started their marriage 'at sea,' and they've been sailing smoothly ever since. The photographer caught them laughing as they tried to keep the umbrella from turning inside out, a perfect metaphor for their life together.",
    tags: ["Wedding", "Margaret", "Sean"]
  },
  {
    id: 5,
    title: "Graduation Day",
    year: "1972",
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1523050853064-80d83ad00975?auto=format&fit=crop&q=80&w=1000",
    story: "The first in the family to hold a university degree. Uncle David looks so young here, holding his cap as if he's afraid it might fly away. It was a day of immense pride for the whole neighborhood. People stood on their porches to congratulate him as he walked home. He went on to become a teacher, inspiring generations of kids from the same block where he grew up.",
    tags: ["Education", "David", "Milestone"]
  },
  {
    id: 6,
    title: "Winter in the Alps",
    year: "1980",
    location: "Innsbruck, Austria",
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80&w=1000",
    story: "A rare family vacation abroad. I remember the air being so cold it stung your lungs, but the hot cocoa afterward was worth every shiver. We stayed in a small wooden chalet that smelled of pine and old books. It was the first time I saw real mountains, and they made me feel so small yet so connected to the vastness of the world. Grandpa spent the whole trip trying to learn German from a phrasebook.",
    tags: ["Vacation", "Skiing", "Europe"]
  }
];

const App = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(FAMILY_PHOTOS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  // Function to switch photos and reset state
  const changePhoto = (photo) => {
    setIsTransitioning(true);
    setIsStoryExpanded(false); // Reset collapse on change
    setTimeout(() => {
      setSelectedPhoto(photo);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const navigateTo = (direction) => {
    const currentIndex = FAMILY_PHOTOS.findIndex(p => p.id === selectedPhoto.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % FAMILY_PHOTOS.length;
    } else {
      nextIndex = (currentIndex - 1 + FAMILY_PHOTOS.length) % FAMILY_PHOTOS.length;
    }
    changePhoto(FAMILY_PHOTOS[nextIndex]);
  };

  const scrollGallery = (direction) => {
    const container = document.getElementById('gallery-scroll-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf3] text-[#2c241e] font-serif selection:bg-[#e2d1c3]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#fdfaf3]/80 backdrop-blur-md border-b border-[#e2d1c3]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#8b5e3c]" />
            <h1 className="text-2xl font-bold tracking-tighter uppercase">The Archives</h1>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-sans font-medium">
            <a href="#" className="hover:text-[#8b5e3c] transition-colors border-b-2 border-transparent hover:border-[#8b5e3c] pb-1">Memories</a>
            <a href="#" className="hover:text-[#8b5e3c] transition-colors border-b-2 border-transparent hover:border-[#8b5e3c] pb-1">Timeline</a>
            <a href="#" className="hover:text-[#8b5e3c] transition-colors border-b-2 border-transparent hover:border-[#8b5e3c] pb-1">Ancestors</a>
            <a href="#" className="hover:text-[#8b5e3c] transition-colors border-b-2 border-transparent hover:border-[#8b5e3c] pb-1">About</a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 items-start transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-[#e2d1c3] rotate-1 rounded-lg -z-10 opacity-50"></div>
            <div className="bg-white p-4 shadow-2xl rounded-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <img 
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover sepia-[0.3] hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-red-400" />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="mt-6 text-center italic text-gray-500 font-sans text-sm tracking-wide">
                — {selectedPhoto.location}, {selectedPhoto.year} —
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <div className="flex flex-col h-full justify-center">
            <div className="space-y-6">
              <div className="flex gap-2 mb-4">
                {selectedPhoto.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#f0e6d6] text-[#8b5e3c] rounded-full text-xs font-sans uppercase tracking-widest font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-[#2c241e] leading-tight">
                {selectedPhoto.title}
              </h2>

              <div className="flex items-center gap-6 text-sm font-sans uppercase tracking-widest text-[#8b5e3c] font-bold">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedPhoto.year}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedPhoto.location}</span>
              </div>

              <div className="relative">
                <span className="text-8xl absolute -top-10 -left-6 opacity-10 font-serif">"</span>
                <p className="text-xl italic leading-relaxed text-[#4a3f35]">
                  {selectedPhoto.story.substring(0, 150)}...
                </p>
              </div>

              <button 
                onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                className="group flex items-center gap-3 py-3 px-6 border-2 border-[#8b5e3c] text-[#8b5e3c] hover:bg-[#8b5e3c] hover:text-white transition-all duration-300 font-sans font-bold uppercase tracking-[0.2em] text-xs"
              >
                <Book className="w-4 h-4" />
                {isStoryExpanded ? 'Close Journal' : 'Read Complete Story'}
                {isStoryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
              </button>

              <div className="pt-6 flex gap-4">
                <button 
                  onClick={() => navigateTo('prev')}
                  className="flex items-center gap-2 text-sm font-sans uppercase font-bold text-[#8b5e3c]/60 hover:text-[#8b5e3c] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button 
                  onClick={() => navigateTo('next')}
                  className="flex items-center gap-2 text-sm font-sans uppercase font-bold text-[#8b5e3c]/60 hover:text-[#8b5e3c] transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Full Story Section */}
        <div 
          className={`mt-12 overflow-hidden transition-all duration-700 ease-in-out border-y border-[#e2d1c3] ${isStoryExpanded ? 'max-h-[1000px] py-12 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
        >
          <div className="max-w-3xl mx-auto bg-white/40 p-10 rounded-sm shadow-inner relative">
            <div className="absolute top-0 left-10 w-px h-full bg-[#e2d1c3] opacity-50"></div>
            <div className="pl-12">
              <h4 className="text-[#8b5e3c] font-sans text-xs uppercase tracking-[0.4em] mb-6 font-bold">The Complete Record</h4>
              <p className="text-2xl leading-loose text-[#2c241e] first-letter:text-7xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-[#8b5e3c] first-letter:leading-[1]">
                {selectedPhoto.story}
              </p>
              <div className="mt-12 pt-8 border-t border-[#e2d1c3] flex items-center justify-between opacity-60">
                <div className="flex gap-4">
                  <span className="text-xs font-sans uppercase font-bold tracking-widest">Archive ID: #{selectedPhoto.id}00{selectedPhoto.year}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsStoryExpanded(false);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }} 
                  className="text-xs font-sans uppercase font-bold tracking-widest flex items-center gap-2 hover:text-[#8b5e3c]"
                >
                  Minimize <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Gallery Section */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-8 border-b border-[#e2d1c3] pb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold uppercase tracking-widest font-sans flex items-center gap-3 text-[#2c241e]">
                <Camera className="w-6 h-6" /> Explore the Gallery
              </h3>
              <span className="hidden sm:inline text-gray-400 font-sans text-sm tracking-widest">
                {FAMILY_PHOTOS.length} Moments Archived
              </span>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => scrollGallery('left')}
                className="p-2 border border-[#e2d1c3] hover:bg-[#8b5e3c] hover:text-white transition-all rounded-full"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollGallery('right')}
                className="p-2 border border-[#e2d1c3] hover:bg-[#8b5e3c] hover:text-white transition-all rounded-full"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            id="gallery-scroll-container"
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#8b5e3c #f0e6d6'
            }}
          >
            {FAMILY_PHOTOS.map((photo) => (
              <button 
                key={photo.id}
                onClick={() => changePhoto(photo)}
                className={`flex-none w-64 md:w-80 snap-start group relative aspect-[3/4] overflow-hidden rounded-lg bg-[#e2d1c3] transition-all duration-500 hover:scale-[1.02] ${selectedPhoto.id === photo.id ? 'ring-4 ring-[#8b5e3c]' : ''}`}
              >
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${selectedPhoto.id === photo.id ? 'opacity-100 scale-110' : 'opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-left">
                  <span className="text-white/70 text-xs font-sans uppercase font-bold tracking-[0.2em] mb-1">{photo.year}</span>
                  <p className="text-white font-bold text-lg leading-tight group-hover:translate-x-1 transition-transform">{photo.title}</p>
                  <p className="text-white/60 text-xs font-sans uppercase tracking-widest mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {photo.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-center md:hidden">
            <p className="text-gray-400 text-xs font-sans uppercase tracking-widest">Swipe to explore more</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2c241e] text-[#fdfaf3] py-20 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <BookOpen className="w-12 h-12 mx-auto opacity-50" />
          <h2 className="text-3xl font-bold uppercase tracking-widest">Preserving the Past</h2>
          <p className="max-w-xl mx-auto text-gray-400 font-serif italic text-lg">
            "We are the stories we leave behind. This archive is a love letter to the generations who paved the way for our present."
          </p>
          <div className="pt-8 border-t border-white/10 text-xs font-sans uppercase tracking-[0.3em] text-gray-500">
            &copy; {new Date().getFullYear()} The Archive Project &bull; Handcrafted Legacy
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#2c241e] z-[100] flex flex-col items-center justify-center space-y-8 text-[#fdfaf3] font-sans uppercase tracking-widest text-2xl font-bold">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2">
            <X className="w-10 h-10" />
          </button>
          <a href="#" className="hover:text-[#8b5e3c] transition-colors">Memories</a>
          <a href="#" className="hover:text-[#8b5e3c] transition-colors">Timeline</a>
          <a href="#" className="hover:text-[#8b5e3c] transition-colors">Ancestors</a>
          <a href="#" className="hover:text-[#8b5e3c] transition-colors">About</a>
        </div>
      )}

      {/* Global CSS for no-scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .no-scrollbar::-webkit-scrollbar-track {
          background: #f0e6d6;
        }
        .no-scrollbar::-webkit-scrollbar-thumb {
          background-color: #8b5e3c;
          border-radius: 20px;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
};

export default App;