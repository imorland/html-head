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

namespace IanM\HtmlHead\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use IanM\HtmlHead\Header;

class HeaderSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'html-headers';

    /**
     * @param \IanM\HtmlHead\Header $header
     */
    protected function getDefaultAttributes($header)
    {
        return [
            'id'            => $header->id,
            'description'   => $header->description,
            'header'        => Header::encode($header->header),
            'active'        => (bool) $header->active,
        ];
    }
}
