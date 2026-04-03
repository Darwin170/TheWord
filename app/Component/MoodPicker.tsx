"use client";

import { useState } from 'react';

const MOOD_DATA = {
  Anxious: ["Philippians 4:6-7", "1 Peter 5:7", "Psalm 94:19", "Isaiah 41:10", "Matthew 6:34", "John 14:27", "Psalm 55:22", "Proverbs 3:5-6"],
  Lonely: ["Psalm 23:4", "Joshua 1:9", "Isaiah 41:10", "Deuteronomy 31:6", "Psalm 68:5-6", "Hebrews 13:5", "Psalm 147:3", "John 14:18"],
  Grieving: ["Matthew 5:4", "2 Corinthians 1:3-4", "Psalm 34:18", "Revelation 21:4", "Psalm 147:3", "John 11:25-26", "Isaiah 61:1-3", "Romans 8:38-39"],
  Overwhelmed: ["Matthew 11:28", "Psalm 61:2", "Isaiah 40:31", "Psalm 34:17-18", "2 Corinthians 12:9-10", "Psalm 46:1-3", "John 16:33", "Psalm 55:22"],
  Guilty: ["1 John 1:9", "Romans 8:1", "Psalm 103:12", "Isaiah 1:18", "Psalm 32:5", "2 Corinthians 5:17", "Psalm 51:1-2", "Ephesians 1:7"],
  Confused: ["Proverbs 3:5-6", "James 1:5", "Psalm 119:105", "Isaiah 30:21", "Psalm 25:4-5", "John 16:13", "Psalm 32:8", "Colossians 1:9-10"],
  Angry: ["James 1:19-20", "Ephesians 4:26", "Proverbs 15:1", "Psalm 37:8", "Ecclesiastes 7:9", "Colossians 3:8", "Psalm 4:4", "Proverbs 29:11"],
  Doubtful: ["Hebrews 11:1", "Mark 9:24", "James 1:6", "Psalm 34:8", "Romans 4:20-21", "John 20:29", "Psalm 27:13-14", "2 Corinthians 5:7"],
  Weak: ["2 Corinthians 12:9", "Isaiah 41:10", "Philippians 4:13", "Psalm 73:26", "Ephesians 6:10", "Psalm 46:1", "John 15:5", "Psalm 18:32-34"],
  Grateful: ["Psalm 100:4", "1 Thessalonians 5:18", "Colossians 3:17", "Psalm 107:1", "Ephesians 5:20", "Psalm 136:1-3", "Philippians 4:6", "Psalm 9:1"],
  Joyful: ["Philippians 4:4", "Psalm 16:11", "Nehemiah 8:10", "Psalm 118:24", "John 15:11", "Psalm 30:5", "Romans 15:13", "Psalm 126:2-3"],
  Peaceful: ["John 14:27", "Numbers 6:24-26", "Isaiah 26:3", "Psalm 29:11", "Philippians 4:6-7", "Psalm 34:14", "Colossians 3:15", "Psalm 85:8"],
  Hopeful: ["Romans 15:13", "Jeremiah 29:11", "Lamentations 3:22-23", "Psalm 39:7", "Hebrews 10:23", "Psalm 71:14", "Isaiah 40:31", "Romans 5:5"],
};

export default function MoodPicker() {
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleMoodClick = async (mood: string) => {
    setLoading(true);
    const verses = MOOD_DATA[mood as keyof typeof MOOD_DATA];
    const randomRef = verses[Math.floor(Math.random() * verses.length)];

    try {
      const res = await fetch(`https://bible-api.com/${randomRef}`);
      const data = await res.json();
      setSelectedVerse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 mx-auto mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {Object.keys(MOOD_DATA).map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodClick(mood)}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-500 border border-slate-400/30 shadow-sm 
                       hover:shadow-lg hover:bg-gray-400 hover:border-white 
                       transition-all text-base md:text-lg font-medium text-white active:scale-95"
          >
            {mood}
          </button>
        ))}
      </div>

      {(selectedVerse || loading) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300">
            
            {loading ? (
              <div className="flex flex-col items-center py-10 md:py-12">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Finding a word for you...</p>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setSelectedVerse(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 mb-4 md:mb-6 font-bold">
                  Scripture
                </h3>
                
                <blockquote className="text-xl md:text-3xl font-serif text-slate-800 italic leading-relaxed">
                  "{selectedVerse.text.trim()}"
                </blockquote>
                
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-100">
                  <p className="text-base md:text-lg font-bold text-slate-700">
                    — {selectedVerse.reference}
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedVerse(null)}
                  className="mt-8 md:mt-10 w-full py-3 md:py-4 bg-slate-900 text-white rounded-xl md:rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-lg"
                >
                  Amen
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}