import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import HeadItem from './components/HeadItemList';

export default class HtmlHeadSettingsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
  }

  content() {
    return [
      <div className="container">
        <div className="HtmlHeadSettingsPage">
          <HeadItem />
        </div>
      </div>,
    ];
  }
}
