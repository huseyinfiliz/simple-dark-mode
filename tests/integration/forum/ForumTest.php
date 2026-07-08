<?php

/*
 * This file is part of huseyinfiliz/simple-dark-mode.
 *
 * Copyright (c) 2026 Hüseyin Filiz.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace HuseyinFiliz\SimpleDarkMode\Tests\integration\forum;

use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ForumTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('huseyinfiliz-simple-dark-mode');
    }

    #[Test]
    public function extension_boots_and_serializes(): void
    {
        $response = $this->send($this->request('GET', '/'));

        $this->assertEquals(200, $response->getStatusCode());

        $body = (string) $response->getBody();

        $this->assertStringStartsWith('<!doctype html>', $body);
        $this->assertStringContainsString('</html>', $body);
    }
}
