import Component from 'flarum/common/Component';
import type Mithril from 'mithril';
import type HeadItem from '../model/HeadItem';
export default class HeadItemList extends Component {
    loading: boolean;
    items: HeadItem[];
    private dragIndex;
    private dragOverIndex;
    oninit(vnode: Mithril.Vnode): void;
    oncreate(vnode: Mithril.VnodeDOM): void;
    view(): JSX.Element;
    reorder(fromIndex: number, toIndex: number): void;
    refresh(): Promise<void>;
}
