import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
  new Extend.Admin()
    .setting(() => ({
      setting: 'huseyinfiliz-simple-dark-mode.always_show_header_toggle',
      type: 'boolean',
      label: app.translator.trans('huseyinfiliz-simple-dark-mode.admin.settings.always_show_header_toggle_label'),
      help: app.translator.trans('huseyinfiliz-simple-dark-mode.admin.settings.always_show_header_toggle_help'),
    }))
    .setting(() => ({
      setting: 'huseyinfiliz-simple-dark-mode.solid_icon',
      type: 'boolean',
      label: app.translator.trans('huseyinfiliz-simple-dark-mode.admin.settings.solid_icon_label'),
      help: app.translator.trans('huseyinfiliz-simple-dark-mode.admin.settings.solid_icon_help'),
    })),
];
