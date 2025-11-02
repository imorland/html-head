import Model from 'flarum/common/Model';
export default class HeadItem extends Model {
    description(): string;
    header(): string;
    active(): boolean;
}
