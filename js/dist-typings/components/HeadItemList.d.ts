export default class HeadItemList extends Component<any, undefined> {
    constructor();
    oninit(vnode: any): void;
    loading: boolean | undefined;
    oncreate(vnode: any): void;
    view(): JSX.Element;
    refresh(): Promise<Page[]>;
    /**
     * Load a new page of HeadItem results.
     *
     * @param {Integer} page number.
     * @return {Promise}
     */
    loadResults(): Promise<any>;
    /**
     * Parse results and append them to the page list.
     *
     * @param {Page[]} results
     * @return {Page[]}
     */
    parseResults(results: Page[]): Page[];
}
import Component from "flarum/common/Component";
