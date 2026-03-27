import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'vineethk96';
const CACHE_KEY = 'github_data_cache';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getDayKey(date) {
  return date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function computeStats(events) {
  const now = new Date();
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

  let weeklyCommits = 0;
  const daysWithCommits = new Set();

  for (const event of events) {
    if (event.type !== 'PushEvent') continue;
    const eventDate = new Date(event.created_at);
    const dayKey = getDayKey(eventDate);
    if (eventDate >= sevenDaysAgo) {
      weeklyCommits += 1; // public API returns truncated payloads without commit counts
    }
    daysWithCommits.add(dayKey);
  }

  // Compute streak: consecutive days with commits going backwards from today
  let streak = 0;
  const cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);
  while (true) {
    const key = getDayKey(cursor);
    if (daysWithCommits.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      // Allow a gap for today if no commits yet — check yesterday to start streak
      if (streak === 0) {
        cursor.setDate(cursor.getDate() - 1);
        const yesterdayKey = getDayKey(cursor);
        if (daysWithCommits.has(yesterdayKey)) {
          streak++;
          cursor.setDate(cursor.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }

  return { weeklyCommits, currentStreak: streak };
}

function computeDailyContributions(events) {
  const now = new Date();
  const dayMap = {};
  for (const event of events) {
    if (event.type !== 'PushEvent') continue;
    const dayKey = getDayKey(new Date(event.created_at));
    dayMap[dayKey] = (dayMap[dayKey] || 0) + 1; // public API returns truncated payloads without commit counts
  }
  const result = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    result.push(dayMap[getDayKey(d)] || 0);
  }
  return result;
}

function computeOngoingProjects(repos) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  return repos.filter(r => new Date(r.pushed_at) >= thirtyDaysAgo).length;
}

export function useGitHubData() {
  const [state, setState] = useState({
    weeklyCommits: null,
    currentStreak: null,
    ongoingProjectsCount: null,
    contributionsByDay: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    // Check sessionStorage cache
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
          console.log('[useGitHubData] Serving from cache:', cached.data);
          setState({ ...cached.data, isLoading: false, isError: false });
          return;
        }
      }
    } catch (_) { /* ignore cache errors */ }

    let cancelled = false;

    async function fetchData() {
      try {
        const [eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=all`),
        ]);

        if (!eventsRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const [events, repos] = await Promise.all([eventsRes.json(), reposRes.json()]);

        if (cancelled) return;

        const { weeklyCommits, currentStreak } = computeStats(events);
        const ongoingProjectsCount = computeOngoingProjects(repos);
        const contributionsByDay = computeDailyContributions(events);

        console.log('[useGitHubData] API response — events count:', events.length, '| push events:', events.filter(e => e.type === 'PushEvent').length);
        console.log('[useGitHubData] Computed:', { weeklyCommits, currentStreak, ongoingProjectsCount, contributionsByDay });

        const data = { weeklyCommits, currentStreak, ongoingProjectsCount, contributionsByDay };

        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
        } catch (_) { /* ignore storage errors */ }

        setState({ ...data, isLoading: false, isError: false });
      } catch (err) {
        console.error('[useGitHubData] Fetch failed:', err);
        if (!cancelled) {
          setState(prev => ({ ...prev, isLoading: false, isError: true }));
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return state;
}
