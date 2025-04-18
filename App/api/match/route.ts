import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const team = searchParams.get('team');

  // Requisição para a API do futebol
  const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6014d15aeb21559553781a2f2fd6e18a', // Substitua pela sua chave API
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  });

  const data = await response.json();

  // Encontre a partida do time informado
  const match = data.response.find((m: any) =>
    m.teams.home.name.toLowerCase().includes(team?.toLowerCase()) ||
    m.teams.away.name.toLowerCase().includes(team?.toLowerCase())
  );

  if (!match) {
    return NextResponse.json({ message: 'Jogo não encontrado.' });
  }

  // Resultado da partida
  const result = {
    home: match.teams.home.name,
    away: match.teams.away.name,
    firstHalf: match.score.halftime,
    secondHalf: match.score.fulltime,
    firstGoal: match.goals && match.goals.length ? match.goals[0] : "Não identificado"
  };

  return NextResponse.json(result);
}
