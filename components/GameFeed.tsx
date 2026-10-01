import { formatKickoff, getFeaturedMatches, isLive, type Match } from '@/lib/bigballs';

const ROW_COUNT = 3;

type GameRow = { id: string; home: string; away: string; time: string; live: boolean };

// Shown when the API is unavailable (missing/invalid key, rate limit, outage).
const fallbackRows: GameRow[] = [
    { id: 'fallback-1', home: 'LAKERS 112', away: 'CELTICS 109', time: 'Q4 02:45', live: true },
    { id: 'fallback-2', home: 'ARSENAL', away: 'LIVERPOOL', time: 'SUN 16:30', live: false },
    { id: 'fallback-3', home: 'KNICKS', away: 'HEAT', time: 'MON 19:00', live: false },
];

function toRow(match: Match): GameRow {
    const live = isLive(match);
    const showScore = live && match.score?.home != null && match.score?.away != null;
    const home = match.home.name.toUpperCase();
    const away = match.away.name.toUpperCase();

    return {
        id: match.id,
        home: showScore ? `${home} ${match.score!.home}` : home,
        away: showScore ? `${away} ${match.score!.away}` : away,
        time: live ? 'LIVE' : formatKickoff(match.kickoff_utc),
        live,
    };
}

export default async function GameFeed() {
    const matches = await getFeaturedMatches(ROW_COUNT);
    const rows = matches?.length ? matches.map(toRow) : fallbackRows;
    const hasLive = rows.some((r) => r.live);

    return (
        <div className="game-feed">
            <div className="feed-header">
                <span className="time-tag">{hasLive ? 'IN PLAY NOW' : 'COMING UP'}</span>
                <h4 className="feed-title">CURRENT ACTION</h4>
            </div>

            {rows.map(({ id, home, away, time, live }, i) => (
                <div key={id} className={i === rows.length - 1 ? 'game-row game-row--last' : 'game-row'}>
                    <div className="team-meta">
                        {live && <span className="live-dot"></span>}
                        {home}
                    </div>
                    <div className="team-meta">{away}</div>
                    <div className="time-tag">{time}</div>
                </div>
            ))}

            <div className="nav-pill nav-pill--block">VIEW FULL GAME SCHEDULE</div>
        </div>
    );
}
