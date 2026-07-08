import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';

import HeaderToggleButton from './components/HeaderToggleButton';
import { applyGuestChoiceAfterCoreBoot, effectiveScheme, isDarkScheme, syncOnBoot, targetIcon, toggleScheme } from './theme';

app.initializers.add('huseyinfiliz-simple-dark-mode', () => {
  // app.session isn't populated yet during initializers, so this has to wait.
  app.beforeMount(() => {
    syncOnBoot();
    applyGuestChoiceAfterCoreBoot();
  });

  // Header button: always visible to guests.
  // For logged-in users it's controlled by the admin setting.
  extend(HeaderSecondary.prototype, 'items', function (items) {
    if (app.session.user && !app.forum.attribute('alwaysShowHeaderToggle')) return;

    items.add('huseyinfiliz-simple-dark-mode', <HeaderToggleButton />, 15);
  });

  // Session dropdown entry for logged-in users.
  extend(SessionDropdown.prototype, 'items', function (items) {
    if (!app.session.user) return;

    const isDark = isDarkScheme(effectiveScheme());
    const solid = !!app.forum.attribute('solidThemeIcon');

    // Label describes the target state.
    const labelKey = isDark ? 'light_mode' : 'dark_mode';

    items.add(
      'huseyinfiliz-simple-dark-mode',
      <Button icon={targetIcon(isDark, solid)} onclick={() => toggleScheme()}>
        {app.translator.trans(`huseyinfiliz-simple-dark-mode.forum.session.${labelKey}`)}
      </Button>,
      -1
    );
  });
});
