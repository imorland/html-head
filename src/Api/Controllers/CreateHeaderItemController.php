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

namespace IanM\HtmlHead\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use IanM\HtmlHead\Api\Serializers\HeaderSerializer;
use IanM\HtmlHead\Command\CreateHeaderItem;
use IanM\HtmlHead\Header;
use IanM\HtmlHead\Validator\HeaderItemValidator;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateHeaderItemController extends AbstractCreateController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = HeaderSerializer::class;

    /**
     * @var HeaderItemValidator
     */
    protected $validator;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(HeaderItemValidator $validator, Dispatcher $bus)
    {
        $this->validator = $validator;
        $this->bus = $bus;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $data = Arr::get($request->getParsedBody(), 'data', []);

        if (Arr::has($data, 'attributes.header')) {
            Arr::set($data, 'attributes.header', Header::decode(Arr::get($data, 'attributes.header')));
        }

        $this->validator->assertValid($data);

        return $this->bus->dispatch(
            new CreateHeaderItem($actor, $data)
        );
    }
}
