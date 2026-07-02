/* ---------------------------------------------------------------------------
   Per-browser upvotes, stored in localStorage.

   To make popularity GLOBAL (shared across all visitors), replace loadVoted /
   saveVoted / the count source with a shared backend (e.g. Firebase Firestore
   or Supabase) — the rest of the app calls these helpers, so only this file
   would change.
   --------------------------------------------------------------------------- */

const KEY = "cap-upvotes-v1";

export function capId(cap) {
  return `${cap.department}|${cap.capability}`;
}

// Deterministic baseline so "Most popular" is meaningful on a first visit.
// (Sample/illustrative — true cross-user counts require a shared backend.)
export function baseCount(cap) {
  const s = capId(cap);
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return 6 + (Math.abs(h) % 55); // 6..60
}

export function loadVoted() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    return new Set();
  }
}

export function saveVoted(set) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* storage unavailable — votes just won't persist */
  }
}
