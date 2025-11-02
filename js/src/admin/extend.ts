import Extend from 'flarum/common/extenders';
import HeadItem from './model/HeadItem';
import HtmlHeadSettingsPage from './htmlHeadSettingsPage';

export default [
  new Extend.Store() //
    .add('html-headers', HeadItem),

  new Extend.Admin() //
    .page(HtmlHeadSettingsPage),
];
