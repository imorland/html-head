import app from 'flarum/app';
import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import HtmlHeadSettingsPage from './htmlHeadSettingsPage';
import HeadItem from './model/HeadItem';

app.initializers.add('ianm-html-head', () => {
    app.store.models['html-headers'] = HeadItem;
    
    app.routes.htmlhead = { path: 'htmlhead', component: HtmlHeadSettingsPage.component() };

    app.extensionSettings['ianm-html-head'] = () => m.route(app.route('htmlhead'));

    extend(AdminNav.prototype, 'items', (items) => {
        items.add(
            'ianm-html-head',
            AdminLinkButton.component({
                href: app.route('htmlhead'),
                icon: 'fas fa-heading',
                children: 'HTML <head>',
                description: app.translator.trans('ianm-html-head.admin.nav.description'),
            })
        );
    });
});
