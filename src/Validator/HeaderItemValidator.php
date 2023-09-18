<?php

namespace IanM\HtmlHead\Validator;

use Flarum\Foundation\AbstractValidator;

class HeaderItemValidator extends AbstractValidator
{
    protected function getRules(): array
    {
        return [
            'description' => 'required|string',
            'header' => 'required|string',
        ];
    }
}
