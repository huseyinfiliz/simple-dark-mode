<?php

/*
 * This file is part of huseyinfiliz/simple-dark-mode.
 *
 * Copyright (c) 2026 Hüseyin Filiz.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace HuseyinFiliz\SimpleDarkMode;

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->content(function (Document $document): void {
            // Guests have no stored preference on the backend, so core cannot
            // render the correct data-theme server-side for them.
            //
            // This inline script applies the browser-side choice as early as
            // possible to reduce the flash of the wrong theme.
            $document->preHead[] = '<script>(function(){try{'
                .'var v=localStorage.getItem("huseyinfiliz-simple-dark-mode.choice");'
                .'if(v==="light"||v==="dark"||v==="light-hc"||v==="dark-hc"){document.documentElement.setAttribute("data-theme",v);}'
                .'}catch(e){}})()</script>';
        }, 100),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->default('huseyinfiliz-simple-dark-mode.always_show_header_toggle', true)
        ->default('huseyinfiliz-simple-dark-mode.solid_icon', true)
        ->serializeToForum('alwaysShowHeaderToggle', 'huseyinfiliz-simple-dark-mode.always_show_header_toggle', 'boolval')
        ->serializeToForum('solidThemeIcon', 'huseyinfiliz-simple-dark-mode.solid_icon', 'boolval'),
];