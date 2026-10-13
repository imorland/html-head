import { jest } from '@jest/globals';
import app from 'flarum/admin/app';
import mq from 'mithril-query';
import HeaderModal from '../../../src/admin/components/HeaderModal';
import bootAdmin, { modalAttrs, settle, text } from './boot';

beforeAll(() => bootAdmin());

afterEach(() => jest.restoreAllMocks());

const openModal = () => mq(HeaderModal, modalAttrs());

const preview = (out: { rootEl: HTMLElement }) => out.rootEl.querySelector('.HeaderModal-previewCode')!.textContent;

const NAME = 'input[list="meta-names"]';
const PROPERTY = 'input[list="meta-properties"]';
const CONTENT = '.HeaderModal-section > .Form-group:last-child input';

describe('a new meta tag', () => {
  it('starts with an empty name that must be filled in, and a placeholder that is not a value', () => {
    const out = openModal();

    expect(out).toHaveElementAttr(NAME, 'required');
    expect(out).toHaveElementAttr(NAME, 'placeholder', 'Choose or type a name');
  });

  it('starts with an empty property that must be filled in, and a placeholder that is not a value', () => {
    const out = openModal();
    out.trigger('input[name="meta-mode"]:not(:checked)', 'change', {} as Event);

    expect(out).toHaveElementAttr(PROPERTY, 'required');
    expect(out).toHaveElementAttr(PROPERTY, 'placeholder', 'Choose or type a property');
  });

  it('explains that some names replace the tag Flarum already outputs', () => {
    expect(text(openModal())).toContain('description, viewport or theme-color replace the tag Flarum already outputs');
  });

  it('previews the name that was typed in', () => {
    const out = openModal();
    out.setValue(NAME, 'robots');
    out.setValue(CONTENT, 'noindex');

    expect(preview(out)).toBe('<meta name="robots" content="noindex">');
  });

  it('saves the name that was typed in', async () => {
    const request = jest
      .spyOn(app, 'request')
      .mockImplementation(((options: any) =>
        Promise.resolve({ data: { type: 'html-headers', id: '1', attributes: options.body.data.attributes } })) as never);

    const out = openModal();
    out.setValue('.Modal-body > .Form-group input', 'Robots');
    out.setValue(NAME, 'robots');
    out.setValue(CONTENT, 'noindex');
    out.trigger('form', 'submit', {} as Event);
    await settle();

    expect((request.mock.calls[0][0] as any).body.data.attributes.attributes).toEqual({ name: 'robots', content: 'noindex' });
  });
});
