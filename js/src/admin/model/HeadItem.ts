import Model from 'flarum/common/Model';

export default class HeadItem extends Model {
  description() {
    return Model.attribute<string>('description').call(this);
  }

  header() {
    return Model.attribute<string>('header').call(this);
  }

  active() {
    return Model.attribute<boolean>('active').call(this);
  }
}
