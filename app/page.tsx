import MoodPicker from './Component/MoodPicker';

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 text-center px-4">
      <h1 className="text-4xl font-serif mb-2">How are you feeling?</h1>
      <p className="text-slate-600 mb-10">Select a feeling to receive a Word for your soul.</p>
      
      <MoodPicker />
      
      <footer className="mt-5 text-slate-800 text-sm">
        for God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16
      </footer>
    </main>
  );
}