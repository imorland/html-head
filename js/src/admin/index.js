import app from 'flarum/admin/app';
import HtmlHeadSettingsPage from './htmlHeadSettingsPage';
import HeadItem from './model/HeadItem';

app.initializers.add('ianm-html-head', () => {
  app.store.models['html-headers'] = HeadItem;
  app.registry.for('ianm-html-head').registerPage(HtmlHeadSettingsPage);
});
