import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import HeadItemList from './components/HeadItemList';
import type Mithril from 'mithril';

export default class HtmlHeadSettingsPage extends ExtensionPage {
  content(_vnode: Mithril.Vnode) {
    return (
      <div className="container">
        <div className="HtmlHeadSettingsPage">
          <div className="HtmlHeadSettingsPage-help">
            <p>{app.translator.trans('ianm-html-head.admin.help.intro')}</p>
            <ul>
              <li>{app.translator.trans('ianm-html-head.admin.help.preconnect')}</li>
              <li>{app.translator.trans('ianm-html-head.admin.help.cache')}</li>
              <li>{app.translator.trans('ianm-html-head.admin.help.pages')}</li>
              <li>{app.translator.trans('ianm-html-head.admin.help.location')}</li>
            </ul>
          </div>
          <HeadItemList />
        </div>
      </div>
    );
  }
}
