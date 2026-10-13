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
        // Structured items keep their content in `attributes` and leave the
        // legacy `header` column empty, which a NOT NULL column refuses.
        $schema->table('html_headers', function (Blueprint $table) {
            $table->text('header')->nullable()->change();
        });
    },

    'down' => function (Builder $schema) {
        $schema->getConnection()->table('html_headers')->whereNull('header')->update(['header' => '']);

        $schema->table('html_headers', function (Blueprint $table) {
            $table->text('header')->nullable(false)->change();
        });
    },
];
