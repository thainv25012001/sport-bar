import 'server-only';

const API_BASE = 'https://api.bigballsdata.com/v1';

// Free tier allows 250 requests/day; one request per 10 minutes stays well under it.
const REVALIDATE_SECONDS = 600;

const VENUE_TZ = 'Africa/Lagos';

export type MatchStatus =
    | 'scheduled'
    | 'live'
    | 'in_progress'
    | 'finished'
    | 'postponed'
    | 'cancelled'
    | 'suspended';

type MatchSide = { name: string; short_name?: string | null };

export type Match = {
    id: string;
    sport: string;
    league: string;
    kickoff_utc: string;
    status: MatchStatus;
    home: MatchSide;
    away: MatchSide;
    score?: { home: number | null; away: number | null } | null;
};

export function isLive(match: Match) {
    return match.status === 'live' || match.status === 'in_progress';
}

function venueDate(date: Date) {
    // en-CA formats as YYYY-MM-DD
    return new Intl.DateTimeFormat('en-CA', { timeZone: VENUE_TZ }).format(date);
}

export function formatKickoff(kickoffUtc: string) {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: VENUE_TZ,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(new Date(kickoffUtc));
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    return `${get('weekday').toUpperCase()} ${get('hour')}:${get('minute')}`;
}

/** Live matches first, then upcoming by kickoff. Returns null if the API is unavailable. */
export async function getFeaturedMatches(count: number): Promise<Match[] | null> {
    const apiKey = process.env.BB_API_KEY?.trim();
    if (!apiKey) {
        console.error('[bigballs] BB_API_KEY is not set');
        return null;
    }

    const params = new URLSearchParams({ date: venueDate(new Date()), tz: VENUE_TZ, limit: '50' });

    try {
        const res = await fetch(`${API_BASE}/matches?${params}`, {
            headers: { Authorization: `Bearer ${apiKey}` },
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) {
            const body = await res.json().catch(() => null);
            console.error(`[bigballs] ${res.status} ${body?.error?.code ?? ''}: ${body?.error?.message ?? res.statusText}`);
            return null;
        }

        const { data } = (await res.json()) as { data: Match[] };
        const now = Date.now();

        const live = data.filter(isLive);
        const upcoming = data
            .filter((m) => m.status === 'scheduled' && new Date(m.kickoff_utc).getTime() > now)
            .sort((a, b) => a.kickoff_utc.localeCompare(b.kickoff_utc));

        return [...live, ...upcoming].slice(0, count);
    } catch (err) {
        console.error('[bigballs] request failed', err);
        return null;
    }
}
