import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import CreateHeadItemModal from './CreateHeadItemModal';

export default class HeadItemListItem extends Component {
    init() {
        this.item = this.props.headItem;
    }

    view() {
        return (
            <tr>
                <td>{this.item.description()}</td>
                <td>
                    <code>{this.item.header()}</code>
                </td>
                <td>
                    {Switch.component({
                        state: this.item.data.attributes.active,
                        onchange: this.update.bind(this),
                    })}
                </td>
                <td>
                    <div className="Button--group">
                        {Button.component(
                            {
                                className: 'Button Button--secondary',
                                onclick: () => app.modal.show(new CreateHeadItemModal({item: this.item})),
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

    update(active) {
        this.props.headItem
            .save({
                decription: this.props.headItem.data.attributes.description,
                header: this.props.headItem.data.attributes.header,
                active: active,
                type: 'html-headers',
            })
            .then(() => m.redraw());
    }
}
