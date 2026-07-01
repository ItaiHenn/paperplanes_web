export default function Home() {
  return (
    <main className="min-h-screen bg-brand-navy flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-brand-gold mb-4">Departo</h1>
        <p className="text-white/70 text-lg mb-8">Professional travel documents, instantly.</p>
        <a
          href="/dev-preview"
          className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded-lg hover:bg-brand-gold-light transition-colors"
        >
          Preview Documents
        </a>
      </div>
    </main>
  );
}
