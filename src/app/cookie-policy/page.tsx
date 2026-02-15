export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071410] via-[#0b1f1a] to-[#071410] text-white px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Cookie Policy</h1>
        <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4 text-white/80 leading-relaxed">
          <p>
            This Cookie Policy explains how Maison Elaris uses cookies and similar
            technologies to recognize you when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold text-white">What are cookies?</h2>
          <p>
            Cookies are small data files stored on your device that help improve
            website functionality, performance, and analytics.
          </p>

          <h2 className="text-2xl font-semibold text-white">Types of cookies we use</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Necessary:</strong> Required for core functionality.</li>
            <li><strong>Analytics:</strong> Help us understand user behavior.</li>
            <li><strong>Marketing:</strong> Used for advertising and retargeting.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">Manage your preferences</h2>
          <p>
            You can update your cookie preferences anytime using the
            <strong> Cookie Settings</strong> option in the footer.
          </p>

          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p>
            Maison Elaris<br />
            Email: contact@maisonelaris.com<br />
            Website: https://www.maisonelaris.com
          </p>
        </section>
      </div>
    </main>
  );
}
