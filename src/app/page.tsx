import RecorderUI from '../components/RecorderUI';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Screen Recorder & Interaction Tracker</h1>
      <RecorderUI />
    </main>
  );
}