'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [teamName, setTeamName] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchMatchData = async () => {
    if (!teamName) return;
    setLoading(true);
    try {
      const res = await fetch('/api/match?team=' + encodeURIComponent(teamName));
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Buscar Jogo de Futebol</h1>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Digite o nome do time"
        className="border p-2 rounded mb-4 w-full max-w-sm"
      />
      <button onClick={fetchMatchData} className="bg-blue-600 text-white px-4 py-2 rounded">
        Buscar
      </button>
      {loading && <p className="mt-4">Carregando...</p>}
      {result && (
        <div className="mt-6 text-left max-w-xl w-full">
          <h2 className="text-xl font-semibold">Resultado:</h2>
          <pre className="bg-gray-100 p-4 rounded mt-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
