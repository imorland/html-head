import { jest } from '@jest/globals';
import app from 'flarum/admin/app';
import mq from 'mithril-query';
import HeaderModal from '../../../src/admin/components/HeaderModal';
import bootAdmin, { modalAttrs, settle } from './boot';

beforeAll(() => bootAdmin());

afterEach(() => jest.restoreAllMocks());

const openModal = () => mq(HeaderModal, modalAttrs());

const switchLabels = (out: { rootEl: HTMLElement }) =>
  Array.from(out.rootEl.querySelectorAll('.HeaderModal-pages .Checkbox--switch')).map((el: Element) => [
    el.textContent!.trim(),
    (el.querySelector('input') as HTMLInputElement).checked,
  ]);

it('uses core dropdowns, with their arrow, for the type and where to inject', () => {
  const out = openModal();

  expect(out.rootEl.querySelectorAll('.HeaderModal-row .Select .Select-caret').length).toBe(2);
});

it('offers the frontends to apply to as switches, the forum on by default', () => {
  expect(switchLabels(openModal())).toEqual([
    ['Forum', true],
    ['Admin Panel', false],
  ]);
});

it('saves the frontends switched on', async () => {
  const request = jest
    .spyOn(app, 'request')
    .mockImplementation(((options: any) =>
      Promise.resolve({ data: { type: 'html-headers', id: '1', attributes: options.body.data.attributes } })) as never);

  const out = openModal();
  const admin = '.HeaderModal-pages .Checkbox--switch:nth-child(2) input';
  (out.rootEl.querySelector(admin) as HTMLInputElement).checked = true;
  out.trigger(admin, 'change', {} as Event);
  out.trigger('form', 'submit', {} as Event);
  await settle();

  expect((request.mock.calls[0][0] as any).body.data.attributes.pages).toEqual(['forum', 'admin']);
});
