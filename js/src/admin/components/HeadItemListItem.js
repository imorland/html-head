import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';

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
                    <code>{this.item.header()}</code>
                </td>
                <td>
                    {Switch.component({
                        state: this.item.data.attributes.active,
                        onchange: (value) => {
                            this.activeLoading = true;

                            app.request({
                                method: 'PATCH',
                                url: `${app.forum.attribute('apiUrl')}/html-headers/${this.item.id()}`,
                                body: {
                                    active: value,
                                },
                            }).then((response) => {
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
                                className: 'Button Button--danger',
                                onclick: () => {
                                    this.deleting = true;
                                    this.item.delete().then(() => {
                                        this.deleting = false;
                                        m.redraw();
                                    });
                                    // app.request({
                                    //     method: 'DELETE',
                                    //     url: `${app.forum.attribute('apiUrl')}/html-headers/${this.item.id()}`,
                                    // }).then(() => {
                                    //     this.deleting = false;
                                    //     console.log(this);
                                    // });
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
