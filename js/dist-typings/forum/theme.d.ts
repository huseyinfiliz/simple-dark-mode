type Scheme = 'light' | 'dark' | 'light-hc' | 'dark-hc';
export declare function isDarkScheme(scheme: Scheme): boolean;
/**
 * Icon for the target state, i.e. what clicking the toggle will switch to.
 */
export declare function targetIcon(isDark: boolean, solid: boolean): string;
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
export declare function effectiveScheme(): Scheme;
/**
 * Reconciles localStorage with the current session on every boot.
 */
export declare function syncOnBoot(): void;
/**
 * Guest users have no server-side saved colorScheme preference.
 *
 * The inline pre-paint script in extend.php applies the guest choice early,
 * but Flarum core can still re-apply its own default during boot.
 * This function runs right after core boot and applies the guest choice again.
 */
export declare function applyGuestChoiceAfterCoreBoot(): void;
/**
 * Flips the current scheme while preserving the high-contrast variant.
 *
 * light     -> dark
 * dark      -> light
 * light-hc  -> dark-hc
 * dark-hc   -> light-hc
 */
export declare function toggleScheme(): void;
export {};
