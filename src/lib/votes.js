/* ---------------------------------------------------------------------------
   Per-browser upvotes for individual "ways" of using a tool for a capability.

   Each usage entry (a person's guide) is upvotable. A capability's score is
   the SUM of upvotes across all its ways. Stored in localStorage.

   To make votes GLOBAL (shared across visitors), swap loadVoted/saveVoted +
   the baseline for a shared backend (Firebase/Supabase) — the app only calls
   these helpers, so only this file changes.
   --------------------------------------------------------------------------- */

export const WAYS_KEY = "way-upvotes-v1";
export const REQUESTS_KEY = "request-upvotes-v1";

export function usageId(department, capability, tool, url) {
  return `${department}||${capability}||${tool}||${url}`;
}

export function requestId(department, request) {
  return `${department}||${request}`;
}

// Deterministic baseline so ordering is meaningful on a first visit.
// (Sample/illustrative — true cross-user counts require a shared backend.)
export function baseCount(id) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return 2 + (Math.abs(h) % 28); // 2..29
}

export function loadVoted(key = WAYS_KEY) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set();
  }
}

export function saveVoted(set, key = WAYS_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    /* storage unavailable — votes just won't persist */
  }
}
