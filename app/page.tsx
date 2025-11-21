import PromptBuilder from '@/components/PromptBuilder'

export default function Page() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Mahakal Tandav ? Ultra?Realistic 8K Video Prompt
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          A production?ready, richly?structured prompt capturing Lord Shiva in his fierce
          Mahakal form performing the divine Tandav amid fire, storm, and cosmic energy. Copy, tweak,
          and export to your favorite video model.
        </p>
      </header>
      <PromptBuilder />
    </main>
  )
}
