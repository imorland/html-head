import app from 'flarum/app';
import HtmlHeadSettingsPage from './htmlHeadSettingsPage';
import HeadItem from './model/HeadItem';

app.initializers.add('ianm-html-head', () => {
    app.store.models['html-headers'] = HeadItem;
    app.extensionData.for('ianm-html-head').registerPage(HtmlHeadSettingsPage);
});
