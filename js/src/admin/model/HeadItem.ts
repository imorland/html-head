import Model from 'flarum/common/Model';

export default class HeadItem extends Model {
  description() {
    return Model.attribute<string>('description').call(this);
  }

  type() {
    return Model.attribute<string>('type').call(this);
  }

  location() {
    return Model.attribute<string>('location').call(this);
  }

  pages() {
    return Model.attribute<string[]>('pages').call(this);
  }

  sortOrder() {
    return Model.attribute<number>('sortOrder').call(this);
  }

  itemAttributes() {
    return Model.attribute<Record<string, unknown>>('attributes').call(this);
  }

  // Legacy field — only populated for old raw rows migrated from the header column
  header() {
    return Model.attribute<string | null>('header').call(this);
  }

  active() {
    return Model.attribute<boolean>('active').call(this);
  }
}
