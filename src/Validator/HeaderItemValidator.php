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

namespace IanM\HtmlHead\Validator;

use Flarum\Foundation\AbstractValidator;

class HeaderItemValidator extends AbstractValidator
{
    protected function getRules(): array
    {
        return [
            'description' => 'required|string|max:200',
            'header'      => 'required|string|max:300',
        ];
    }
}
