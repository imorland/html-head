import { jest } from '@jest/globals';
import app from 'flarum/admin/app';
import mq from 'mithril-query';
import HeaderModal from '../../../src/admin/components/HeaderModal';
import bootAdmin, { modalAttrs, settle } from './boot';

beforeAll(() => bootAdmin());

afterEach(() => jest.restoreAllMocks());

const openModal = () => mq(HeaderModal, modalAttrs());

const preview = (out: { rootEl: HTMLElement }) => out.rootEl.querySelector('.HeaderModal-previewCode')!.textContent;

const CONTENT = '.HeaderModal-section > .Form-group:last-child input';

describe('a new meta tag', () => {
  it('previews the suggested name when the name is left untouched', () => {
    const out = openModal();
    out.setValue(CONTENT, 'A forum about things');

    expect(preview(out)).toBe('<meta name="description" content="A forum about things">');
  });

  it('previews the suggested property when the property is left untouched', () => {
    const out = openModal();
    out.trigger('input[name="meta-mode"]:not(:checked)', 'change', {} as Event);
    out.setValue(CONTENT, 'My Forum');

    expect(preview(out)).toBe('<meta property="og:title" content="My Forum">');
  });

  it('previews the name that was typed in', () => {
    const out = openModal();
    out.setValue('input[list="meta-names"]', 'robots');
    out.setValue(CONTENT, 'noindex');

    expect(preview(out)).toBe('<meta name="robots" content="noindex">');
  });

  it('can be saved without typing a name, and saves the name the preview showed', async () => {
    const request = jest
      .spyOn(app, 'request')
      .mockImplementation(((options: any) =>
        Promise.resolve({ data: { type: 'html-headers', id: '1', attributes: options.body.data.attributes } })) as never);

    const out = openModal();

    expect(out).not.toHaveElementAttr('input[list="meta-names"]', 'required');

    out.setValue('.Modal-body > .Form-group input', 'Site description');
    out.setValue(CONTENT, 'A forum about things');
    out.trigger('form', 'submit', {} as Event);
    await settle();

    expect((request.mock.calls[0][0] as any).body.data.attributes.attributes).toEqual({ name: 'description', content: 'A forum about things' });
  });
});
