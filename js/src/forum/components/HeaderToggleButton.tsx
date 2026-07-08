import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import type Mithril from 'mithril';
import { effectiveScheme, isDarkScheme, targetIcon, toggleScheme } from '../theme';

export default class HeaderToggleButton extends Component {
  view(): Mithril.Children {
    const isDark = isDarkScheme(effectiveScheme());
    const solid = !!app.forum.attribute('solidThemeIcon');

    const labelKey = isDark ? 'light_mode' : 'dark_mode';
    const label = app.translator.trans(`huseyinfiliz-simple-dark-mode.forum.session.${labelKey}`);

    return (
      <Button
        className="Button Button--flat SimpleDarkModeToggle"
        icon={targetIcon(isDark, solid)}
        title={label}
        aria-label={label}
        onclick={() => toggleScheme()}
      >
        {label}
      </Button>
    );
  }
}