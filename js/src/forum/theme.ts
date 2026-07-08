import app from 'flarum/forum/app';

/**
 * localStorage key that stores the guest's chosen scheme.
 * Only ever written for guests; a logged-in user's choice always lives in
 * their `colorScheme` preference on the backend instead.
 */
const STORAGE_KEY = 'huseyinfiliz-simple-dark-mode.choice';

/**
 * Stamps which user id last wrote STORAGE_KEY. Lets us tell a genuine guest
 * choice apart from a stale one left behind by a previous session on this
 * browser, so we never silently override a different account's preference.
 */
const OWNER_KEY = 'huseyinfiliz-simple-dark-mode.owner-id';

type Scheme = 'light' | 'dark' | 'light-hc' | 'dark-hc';
type StoredScheme = Scheme | 'auto';

function ls(): Storage | null {
  try {
    return window.localStorage;
  } catch (e) {
    return null;
  }
}

function isScheme(value: unknown): value is Scheme {
  return value === 'light' || value === 'dark' || value === 'light-hc' || value === 'dark-hc';
}

function isStoredScheme(value: unknown): value is StoredScheme {
  return isScheme(value) || value === 'auto';
}

export function isDarkScheme(scheme: Scheme): boolean {
  return scheme === 'dark' || scheme === 'dark-hc';
}

/**
 * Icon for the target state, i.e. what clicking the toggle will switch to.
 */
export function targetIcon(isDark: boolean, solid: boolean): string {
  const prefix = solid ? 'fas' : 'far';

  return `${prefix} fa-${isDark ? 'sun' : 'moon'}`;
}

function currentUserId(): string {
  const user = app.session.user;

  return user ? String(user.id()) : '';
}

/**
 * Reads the theme that is actually painted right now.
 *
 * Flarum 2.x colorScheme values:
 * - light
 * - dark
 * - light-hc
 * - dark-hc
 * - auto
 */
export function effectiveScheme(): Scheme {
  const attr = document.documentElement.getAttribute('data-theme') || '';

  if (attr === 'dark-hc') return 'dark-hc';
  if (attr === 'light-hc') return 'light-hc';
  if (attr === 'dark') return 'dark';
  if (attr === 'light') return 'light';

  // Defensive fallback in case core ever appends additional suffixes.
  if (attr.startsWith('dark')) return 'dark';
  if (attr.startsWith('light')) return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function oppositeScheme(scheme: Scheme): Scheme {
  switch (scheme) {
    case 'dark-hc':
      return 'light-hc';

    case 'light-hc':
      return 'dark-hc';

    case 'dark':
      return 'light';

    case 'light':
    default:
      return 'dark';
  }
}

function readGuestChoice(): Scheme | null {
  const storage = ls();
  if (!storage) return null;

  const value = storage.getItem(STORAGE_KEY);

  return isScheme(value) ? value : null;
}

function writeGuestChoice(scheme: Scheme): void {
  const storage = ls();
  if (!storage) return;

  storage.setItem(STORAGE_KEY, scheme);
  storage.setItem(OWNER_KEY, currentUserId());
}

function clearGuestChoice(): void {
  const storage = ls();
  if (!storage) return;

  storage.removeItem(STORAGE_KEY);
  storage.removeItem(OWNER_KEY);
}

/**
 * Reconciles localStorage with the current session on every boot.
 */
export function syncOnBoot(): void {
  const storage = ls();
  if (!storage) return;

  const user = app.session.user;

  if (!user) {
    // Logged out: any stamped leftover belongs to a previous session.
    const owner = storage.getItem(OWNER_KEY);
    if (owner) clearGuestChoice();

    return;
  }

  const stampedOwner = storage.getItem(OWNER_KEY);
  const guestChoice = readGuestChoice();

  if (!guestChoice) return;

  if (stampedOwner && stampedOwner !== currentUserId()) {
    clearGuestChoice();
    return;
  }

  const existingPreference = user.preferences()?.colorScheme;

  if (isStoredScheme(existingPreference)) {
    // User already has an explicit preference server-side; that wins.
    // This also protects users whose preference is `auto`.
    clearGuestChoice();
    return;
  }

  user
    .savePreferences({ colorScheme: guestChoice })
    .then(() => {
      app.setColorScheme(guestChoice);
      m.redraw();
    })
    .catch(() => {});

  clearGuestChoice();
}

/**
 * Guest users have no server-side saved colorScheme preference.
 *
 * The inline pre-paint script in extend.php applies the guest choice early,
 * but Flarum core can still re-apply its own default during boot.
 * This function runs right after core boot and applies the guest choice again.
 */
export function applyGuestChoiceAfterCoreBoot(): void {
  window.setTimeout(() => {
    if (app.session.user) return;

    const guestChoice = readGuestChoice();

    if (guestChoice) {
      app.setColorScheme(guestChoice);
      m.redraw();
    }
  }, 0);
}

/**
 * Flips the current scheme while preserving the high-contrast variant.
 *
 * light     -> dark
 * dark      -> light
 * light-hc  -> dark-hc
 * dark-hc   -> light-hc
 */
export function toggleScheme(): void {
  const next = oppositeScheme(effectiveScheme());
  const user = app.session.user;

  app.setColorScheme(next);

  if (user) {
    user.savePreferences({ colorScheme: next }).catch(() => {});
  } else {
    writeGuestChoice(next);
  }

  m.redraw();
}