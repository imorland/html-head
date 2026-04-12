/// <reference types="mithril" />
import Component from 'flarum/common/Component';
import type HeadItem from '../model/HeadItem';
interface Attrs {
    headItem: HeadItem;
    index: number;
    dragOverIndex: number | null;
    onchange: () => void;
    ondragstart: (index: number) => void;
    ondragenter: (index: number) => void;
    ondragend: () => void;
}
export default class HeadItemListItem extends Component<Attrs> {
    activeLoading: boolean;
    deleting: boolean;
    view(): JSX.Element;
}
export {};
