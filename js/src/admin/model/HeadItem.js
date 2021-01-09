import Model from 'flarum/Model';

export default class HeadItem extends Model {
    id = Model.attribute('id');
    description = Model.attribute('description');
    header = Model.attribute('header');
    active = Model.attribute('active');
}
