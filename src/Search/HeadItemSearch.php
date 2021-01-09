<?php

/*
 * This file is part of ianm/html-head.
 *
 * Copyright (c) 2021 IanM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace IanM\HtmlHead\Search;

use Flarum\Search\AbstractSearch;

class HeadItemSearch extends AbstractSearch
{
    /**
     * {@inheritdoc}
     */
    protected $defaultSort = ['created_at' => 'desc'];
}
