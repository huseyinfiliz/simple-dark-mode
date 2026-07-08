<?php

/*
 * This file is part of huseyinfiliz/simple-dark-mode.
 *
 * Copyright (c) 2026 Hüseyin Filiz.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace HuseyinFiliz\SimpleDarkMode\Tests\integration;

use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

class SettingsTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('huseyinfiliz-simple-dark-mode');
    }

    #[Test]
    public function forum_attributes_default_to_false(): void
    {
        $response = $this->send(
            $this->request('GET', '/api')
        );

        $this->assertEquals(200, $response->getStatusCode());

        $body = json_decode($response->getBody()->getContents(), true);

        $this->assertFalse($body['data']['attributes']['alwaysShowHeaderToggle']);
        $this->assertFalse($body['data']['attributes']['solidThemeIcon']);
    }

    #[Test]
    public function forum_attributes_reflect_changed_settings(): void
    {
        $this->setting('huseyinfiliz-simple-dark-mode.always_show_header_toggle', true);
        $this->setting('huseyinfiliz-simple-dark-mode.solid_icon', true);

        $response = $this->send(
            $this->request('GET', '/api')
        );

        $body = json_decode($response->getBody()->getContents(), true);

        $this->assertTrue($body['data']['attributes']['alwaysShowHeaderToggle']);
        $this->assertTrue($body['data']['attributes']['solidThemeIcon']);
    }
}
