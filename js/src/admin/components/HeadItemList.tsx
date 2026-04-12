import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import Button from 'flarum/common/components/Button';
import type Mithril from 'mithril';
import type HeadItem from '../model/HeadItem';
import HeadItemListItem from './HeadItemListItem';
import HeaderModal from './HeaderModal';

export default class HeadItemList extends Component {
  loading = true;
  items: HeadItem[] = [];

  // Drag state — kept outside Mithril state to avoid redraws mid-drag
  private dragIndex: number | null = null;
  private dragOverIndex: number | null = null;

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
    this.loading = true;
  }

  oncreate(vnode: Mithril.VnodeDOM) {
    super.oncreate(vnode);
    this.refresh();
  }

  view() {
    return (
      <div>
        <div className="HtmlHeadSettingsPage--controls">
          <Button className="Button Button--primary" icon="fas fa-plus" onclick={() => app.modal.show(HeaderModal)}>
            {app.translator.trans('ianm-html-head.admin.create_button')}
          </Button>
        </div>

        <div className="HtmlHeadSettingsPage-table">
          {this.loading ? (
            <LoadingIndicator />
          ) : this.items.length ? (
            <table className="Table HtmlHeadTable">
              <thead>
                <tr>
                  <th className="HtmlHeadTable-drag" />
                  <th>{app.translator.trans('ianm-html-head.admin.table.description_label')}</th>
                  <th>{app.translator.trans('ianm-html-head.admin.table.type_label')}</th>
                  <th>{app.translator.trans('ianm-html-head.admin.table.location_label')}</th>
                  <th>{app.translator.trans('ianm-html-head.admin.table.pages_label')}</th>
                  <th>{app.translator.trans('ianm-html-head.admin.table.active_label')}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.items.map((item, index) => (
                  <HeadItemListItem
                    key={item.id()}
                    headItem={item}
                    index={index}
                    dragOverIndex={this.dragOverIndex}
                    onchange={() => this.refresh()}
                    ondragstart={(i: number) => {
                      this.dragIndex = i;
                    }}
                    ondragenter={(i: number) => {
                      this.dragOverIndex = i;
                      m.redraw();
                    }}
                    ondragend={() => {
                      if (this.dragIndex !== null && this.dragOverIndex !== null && this.dragIndex !== this.dragOverIndex) {
                        this.reorder(this.dragIndex, this.dragOverIndex);
                      }
                      this.dragIndex = null;
                      this.dragOverIndex = null;
                      m.redraw();
                    }}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <Placeholder text={app.translator.trans('ianm-html-head.admin.table.empty_text')} />
          )}
        </div>
      </div>
    );
  }

  reorder(fromIndex: number, toIndex: number) {
    // Reorder local array immediately for responsive feel
    const reordered = [...this.items];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    this.items = reordered;
    m.redraw();

    // Persist new sort_order values — each item gets its array position as sort_order
    const saves = reordered.map((item, i) => item.save({ sortOrder: i }));
    Promise.all(saves).catch(() => {
      // On failure, refresh from server to get back to consistent state
      this.refresh();
    });
  }

  refresh() {
    this.loading = true;
    return app.store.find('html-headers', { sort: 'sortOrder' }).then((results) => {
      this.items = results as unknown as HeadItem[];
      this.loading = false;
      m.redraw();
    });
  }
}
