<?php

/*
 * This file is part of ianm/htmlhead.
 *
 * Copyright (c) IanM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 *
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('html_headers', function (Blueprint $table) {
            // Type of head item: meta, link, script, style, raw
            $table->string('type', 20)->nullable()->after('header');

            // Where to inject: head or foot
            $table->string('location', 10)->default('head')->after('type');

            // Which frontends to inject into: ['forum'], ['admin'], or ['forum','admin']
            $table->json('pages')->nullable()->after('location');

            // Display/injection order
            $table->unsignedInteger('sort_order')->default(0)->after('pages');

            // Structured attributes per type (replaces header column for new rows)
            $table->json('attributes')->nullable()->after('sort_order');
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('html_headers', function (Blueprint $table) {
            $table->dropColumn(['type', 'location', 'pages', 'sort_order', 'attributes']);
        });
    },
];
