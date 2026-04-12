import Model from 'flarum/common/Model';
export default class HeadItem extends Model {
    description(): string;
    type(): string;
    location(): string;
    pages(): string[];
    sortOrder(): number;
    itemAttributes(): Record<string, unknown>;
    header(): string | null;
    active(): boolean;
}
