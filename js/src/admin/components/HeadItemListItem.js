import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import CreateHeadItemModal from './CreateHeadItemModal';
import { encode, decode } from '../util/base64';

export default class HeadItemListItem extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.item = this.attrs.headItem;
  }

  view() {
    return (
      <tr>
        <td>{this.item.description()}</td>
        <td>
          <code>{decode(this.item.header())}</code>
        </td>
        <td>
          {Switch.component({
            state: this.item.active(),
            onchange: (value) => {
              this.activeLoading = true;

              app
                .request({
                  method: 'PATCH',
                  url: `${app.forum.attribute('apiUrl')}/html-headers/${this.item.id()}`,
                  body: {
                    active: value,
                  },
                })
                .then((response) => {
                  this.item.data = response.data;
                  this.activeLoading = false;

                  m.redraw();
                });
            },
            loading: this.activeLoading,
          })}
        </td>
        <td>
          <div className="Button--group">
            {Button.component(
              {
                className: 'Button Button--secondary',
                onclick: () => app.modal.show(CreateHeadItemModal, { item: this.item }),
              },
              app.translator.trans('ianm-html-head.admin.table.edit_button')
            )}
            {Button.component(
              {
                className: 'Button Button--danger',
                onclick: () => {
                  this.deleting = true;
                  this.item.delete().then(() => {
                    this.deleting = false;
                    m.redraw();
                  });
                },
                loading: this.deleting,
              },
              app.translator.trans('ianm-html-head.admin.table.delete_button')
            )}
          </div>
        </td>
      </tr>
    );
  }
}
