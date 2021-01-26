import Page from 'flarum/components/Page';
import HeadItem from './components/HeadItemList';

export default class HtmlHeadSettingsPage extends Page {
    view() {
        return [
            <div className="container">
                <div className="HtmlHeadSettingsPage">{HeadItem.component()}</div>
            </div>,
        ];
    }
}
