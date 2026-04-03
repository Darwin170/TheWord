import MoodPicker from './Component/MoodPicker';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 text-center px-6 py-10">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
        How are you feeling?
      </h1>
      
      <p className="text-slate-600 mb-8 md:mb-12 max-w-md md:text-lg">
        Select a feeling to receive a Word for your soul.
      </p>
      
      <div className="w-full max-w-4xl">
        <MoodPicker />
      </div>
      
      <footer className="mt-12 md:mt-16 text-slate-800 text-sm md:text-base max-w-2xl italic leading-relaxed">
        "For God so loved the world that he gave his one and only Son, 
        that whoever believes in him shall not perish but have eternal life." 
        <span className="block mt-1 font-semibold">— John 3:16</span>
      </footer>
    </main>
  );
}
