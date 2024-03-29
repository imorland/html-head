import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import Button from 'flarum/common/components/Button';
import HeadItemListItem from './HeadItemListItem';
import CreateHeadItemModal from './CreateHeadItemModal';

export default class HeadItemList extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = true;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.refresh();
  }

  view() {
    return (
      <div>
        <div className="HtmlHeadSettingsPage--controls">
          {Button.component(
            {
              className: 'Button Button--primary',
              icon: 'fas fa-plus',
              onclick: () => app.modal.show(CreateHeadItemModal),
            },
            app.translator.trans('ianm-html-head.admin.create_button')
          )}
        </div>
        <br />
        <div className="HtmlHeadSettingsPage-table">
          {this.loading ? (
            LoadingIndicator.component()
          ) : app.store.all('html-headers').length ? (
            <table style={{ width: '100%', textAlign: 'left' }} className="table">
              <thead>
                <tr>
                  <th>{app.translator.trans('ianm-html-head.admin.table.description_label')}</th>
                  <th>{app.translator.trans('ianm-html-head.admin.table.header_label')}</th>
                  <th>{app.translator.trans('ianm-html-head.admin.table.active_label')}</th>
                  <th />
                </tr>
              </thead>
              <tbody>{app.store.all('html-headers').map((headItem) => HeadItemListItem.component({ headItem }))}</tbody>
            </table>
          ) : (
            <div>{Placeholder.component({ text: app.translator.trans('ianm-html-head.admin.table.empty_text') })}</div>
          )}
        </div>
      </div>
    );
  }

  refresh() {
    return this.loadResults().then(this.parseResults.bind(this));
  }

  /**
   * Load a new page of HeadItem results.
   *
   * @param {Integer} page number.
   * @return {Promise}
   */
  loadResults() {
    return app.store.find('html-headers');
  }

  /**
   * Parse results and append them to the page list.
   *
   * @param {Page[]} results
   * @return {Page[]}
   */
  parseResults(results) {
    this.loading = false;

    m.redraw();
  }
}
