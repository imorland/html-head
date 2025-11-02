import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import HeadItem from './components/HeadItemList';
import type Mithril from 'mithril';

export default class HtmlHeadSettingsPage extends ExtensionPage {
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
  }

  content(vnode: Mithril.Vnode) {
    return (
      <div className="container">
        <div className="HtmlHeadSettingsPage">
          <HeadItem />
        </div>
      </div>
    );
  }
}
