import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import type Mithril from 'mithril';
import type HeadItem from '../model/HeadItem';
import HeaderModal from './HeaderModal';

interface Attrs {
  headItem: HeadItem;
  index: number;
  dragOverIndex: number | null;
  onchange: () => void;
  ondragstart: (index: number) => void;
  ondragenter: (index: number) => void;
  ondragend: () => void;
}

export default class HeadItemListItem extends Component<Attrs> {
  activeLoading = false;
  deleting = false;

  view() {
    const item = this.attrs.headItem;
    const type = item.type() || 'raw';
    const location = item.location() || 'head';
    const pages = item.pages() || ['forum'];
    const isDragTarget = this.attrs.dragOverIndex === this.attrs.index;

    return (
      <tr className={isDragTarget ? 'HtmlHeadTable-row--dragover' : ''} draggable={false}>
        <td
          className="HtmlHeadTable-drag"
          draggable={true}
          title={app.translator.trans('ianm-html-head.admin.table.drag_handle')}
          aria-label={app.translator.trans('ianm-html-head.admin.table.drag_handle')}
          ondragstart={(e: DragEvent) => {
            e.dataTransfer!.effectAllowed = 'move';
            // Minimal payload — actual data lives in parent state
            e.dataTransfer!.setData('text/plain', String(this.attrs.index));
            this.attrs.ondragstart(this.attrs.index);
          }}
          ondragenter={(e: DragEvent) => {
            e.preventDefault();
            this.attrs.ondragenter(this.attrs.index);
          }}
          ondragover={(e: DragEvent) => {
            e.preventDefault();
            e.dataTransfer!.dropEffect = 'move';
          }}
          ondragend={() => {
            this.attrs.ondragend();
          }}
        >
          <i className="fas fa-grip-vertical HtmlHeadTable-gripIcon" />
        </td>

        <td className="HtmlHeadTable-description">{item.description()}</td>

        <td>
          <span className={`HtmlHeadBadge HtmlHeadBadge--type HtmlHeadBadge--${type}`}>
            {app.translator.trans(`ianm-html-head.admin.modal.type.${type}`)}
          </span>
        </td>

        <td>
          <span className={`HtmlHeadBadge HtmlHeadBadge--location HtmlHeadBadge--${location}`}>
            {app.translator.trans(`ianm-html-head.admin.modal.location.${location}`)}
          </span>
        </td>

        <td>
          <div className="HtmlHeadTable-pages">
            {pages.map((p: string) => (
              <span className="HtmlHeadBadge HtmlHeadBadge--page">{app.translator.trans(`ianm-html-head.admin.modal.pages.${p}`)}</span>
            ))}
          </div>
        </td>

        <td>
          <Switch
            state={item.active()}
            loading={this.activeLoading}
            onchange={(value: boolean) => {
              this.activeLoading = true;
              item
                .save({ active: value })
                .then(() => {
                  this.activeLoading = false;
                  m.redraw();
                })
                .catch(() => {
                  this.activeLoading = false;
                  m.redraw();
                });
            }}
          />
        </td>

        <td>
          <div className="ButtonGroup">
            <Button
              className="Button Button--icon"
              icon="fas fa-pencil-alt"
              title={app.translator.trans('ianm-html-head.admin.table.edit_button')}
              aria-label={app.translator.trans('ianm-html-head.admin.table.edit_button')}
              onclick={() => app.modal.show(HeaderModal, { item })}
            />
            <Button
              className="Button Button--icon Button--danger"
              icon="fas fa-times"
              title={app.translator.trans('ianm-html-head.admin.table.delete_button')}
              aria-label={app.translator.trans('ianm-html-head.admin.table.delete_button')}
              loading={this.deleting}
              onclick={() => {
                if (!confirm(app.translator.trans('ianm-html-head.admin.table.delete_confirm') as string)) return;
                this.deleting = true;
                item.delete().then(() => {
                  this.deleting = false;
                  this.attrs.onchange();
                });
              }}
            />
          </div>
        </td>
      </tr>
    );
  }
}
