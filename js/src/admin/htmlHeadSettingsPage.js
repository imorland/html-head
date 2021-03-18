import ExtensionPage from 'flarum/common/components/ExtensionPage';
import HeadItem from './components/HeadItemList';

export default class HtmlHeadSettingsPage extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);
    }

    content() {
        return [
            <div className="container">
                <div className="HtmlHeadSettingsPage">{HeadItem.component()}</div>
            </div>,
        ];
    }
}
