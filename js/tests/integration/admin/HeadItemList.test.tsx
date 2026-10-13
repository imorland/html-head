import { jest } from '@jest/globals';
import app from 'flarum/admin/app';
import mq from 'mithril-query';
import HeadItemList from '../../../src/admin/components/HeadItemList';
import HeaderModal from '../../../src/admin/components/HeaderModal';
import bootAdmin, { modalAttrs, settle, text } from './boot';

beforeAll(() => bootAdmin());

afterEach(() => jest.restoreAllMocks());

/** Stands in for the API: lists what has been created so far, and creates on POST. */
function fakeApi() {
  const rows: any[] = [];

  return jest.spyOn(app, 'request').mockImplementation(((options: any) => {
    if (options.method === 'POST') {
      const row = { type: 'html-headers', id: String(rows.length + 1), attributes: { ...options.body.data.attributes, active: true } };
      rows.push(row);

      return Promise.resolve({ data: row });
    }

    return Promise.resolve({ data: [...rows] });
  }) as never);
}

it('shows a newly created item without reloading the page', async () => {
  fakeApi();
  const show = jest.spyOn(app.modal, 'show').mockImplementation((() => {}) as never);

  const list = mq(HeadItemList);
  await settle();
  list.redraw();

  expect(text(list)).not.toContain('Site description');

  list.click('.HtmlHeadSettingsPage--controls button');

  const [component, attrs] = show.mock.calls[0] as [typeof HeaderModal, Record<string, unknown> | undefined];
  expect(component).toBe(HeaderModal);

  const modal = mq(HeaderModal, { ...attrs, ...modalAttrs() });
  modal.setValue('.Modal-body > .Form-group input', 'Site description');
  modal.setValue('input[list="meta-names"]', 'description');
  modal.setValue('.HeaderModal-section > .Form-group:last-child input', 'A forum about things');
  modal.trigger('form', 'submit', {} as Event);
  await settle();
  await settle();
  list.redraw();

  expect(text(list)).toContain('Site description');
});
