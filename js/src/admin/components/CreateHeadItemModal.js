import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class CreateHeadItemModal extends Modal {
    init() {
        this.item = this.props.item || app.store.createRecord('html-headers');

        this.description = m.prop(this.item.description() || '');
        this.header = m.prop(this.item.header() || '');

        this.loading = false;
    }

    className() {
        return 'Modal--medium';
    }

    title() {
        return this.item.exists ? app.translator.trans('ianm-html-head.admin.modal.edit_title') : app.translator.trans('ianm-html-head.admin.modal.create_title');
    }

    content() {
        return (
            <div className="Modal-body">
                <p>{app.translator.trans('ianm-html-head.admin.modal.text')}</p>

                <div className="Form-group">
                    <label className="label">{app.translator.trans('ianm-html-head.admin.modal.description_label')}</label>
                    <input type="text" className="FormControl" bidi={this.description} required />
                </div>

                <div className="Form-group">
                    <label className="label">{app.translator.trans('ianm-html-head.admin.modal.header_label')}</label>
                    <input type="text" className="FormControl" bidi={this.header} required placeholder='<link rel="example" href="example">' />
                </div>

                <div className="Form-group">
                    <Button className="Button Button--primary" type="submit" loading={this.loading}>
                        {app.translator.trans('ianm-html-head.admin.modal.save_button')}
                    </Button>
                </div>
            </div>
        );
    }

    onsubmit(e) {
        e.preventDefault();

        if (!this.header()) return;

        this.loading = true;

        const attrs = {
            description: this.description(),
            header: this.header(),
        };

        this.item.save(attrs).then(this.hide.bind(this), this.onerror.bind(this), this.loaded.bind(this));
    }
}
