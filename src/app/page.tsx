import VoteButtons from "./VoteButtons";

export default function Home() {
  // Mock data
  const ayePercent = 65;
  const nayPercent = 35;

  return (
    <main className="main-content">
      <h2 style={{fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.01em'}}>Proposal #001</h2>
      <VoteButtons ayePercent={ayePercent} nayPercent={nayPercent} />
    </main>
  );
}
