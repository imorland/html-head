export default class CreateHeadItemModal extends FormModal<import("flarum/common/components/FormModal").IFormModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    item: any;
    description: any;
    header: any;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: any): void;
}
import FormModal from "flarum/common/components/FormModal";
