import app from 'flarum/admin/app';
import FormModal from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import type Mithril from 'mithril';
import type HeadItem from '../model/HeadItem';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TYPES = ['meta', 'link', 'script', 'style', 'raw'] as const;
const LOCATIONS = ['head', 'foot'] as const;
const PAGES = ['forum', 'admin'] as const;

const COMMON_META_NAMES = ['description', 'robots', 'theme-color', 'author', 'keywords', 'generator', 'referrer', 'viewport', 'color-scheme'];

const COMMON_OG_PROPERTIES = [
  'og:title',
  'og:description',
  'og:image',
  'og:url',
  'og:type',
  'og:site_name',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
];

const COMMON_LINK_RELS = [
  'preconnect',
  'dns-prefetch',
  'preload',
  'prefetch',
  'stylesheet',
  'icon',
  'canonical',
  'alternate',
  'modulepreload',
  'manifest',
];

type LinkAs = '' | 'style' | 'script' | 'font' | 'image' | 'fetch' | 'worker';
type FetchPriority = '' | 'high' | 'low' | 'auto';

export default class HeaderModal extends FormModal {
  item!: HeadItem;

  // Common fields
  description!: ReturnType<typeof Stream<string>>;
  type!: ReturnType<typeof Stream<string>>;
  location!: ReturnType<typeof Stream<string>>;
  pages!: ReturnType<typeof Stream<string[]>>;

  // Meta fields
  metaNameMode!: ReturnType<typeof Stream<'name' | 'property'>>;
  metaName!: ReturnType<typeof Stream<string>>;
  metaProperty!: ReturnType<typeof Stream<string>>;
  metaContent!: ReturnType<typeof Stream<string>>;

  // Link fields
  linkRel!: ReturnType<typeof Stream<string>>;
  linkHref!: ReturnType<typeof Stream<string>>;
  linkAs!: ReturnType<typeof Stream<LinkAs>>;
  linkType!: ReturnType<typeof Stream<string>>;
  linkCrossorigin!: ReturnType<typeof Stream<boolean>>;
  linkFetchpriority!: ReturnType<typeof Stream<FetchPriority>>;
  linkExtras!: ReturnType<typeof Stream<Array<{ key: string; value: string }>>>;

  // Script fields
  scriptMode!: ReturnType<typeof Stream<'src' | 'inline'>>;
  scriptSrc!: ReturnType<typeof Stream<string>>;
  scriptInline!: ReturnType<typeof Stream<string>>;
  scriptDefer!: ReturnType<typeof Stream<boolean>>;
  scriptAsync!: ReturnType<typeof Stream<boolean>>;
  scriptModule!: ReturnType<typeof Stream<boolean>>;
  scriptCrossorigin!: ReturnType<typeof Stream<boolean>>;

  // Style fields
  styleInline!: ReturnType<typeof Stream<string>>;

  // Raw fields
  rawContent!: ReturnType<typeof Stream<string>>;

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    this.item = (this.attrs as any).item || app.store.createRecord('html-headers');

    const attrs = (this.item.itemAttributes() as Record<string, unknown>) || {};
    const existingType = this.item.type() || 'meta';

    this.description = Stream(this.item.description() || '');
    this.type = Stream(existingType);
    this.location = Stream(this.item.location() || 'head');
    this.pages = Stream(this.item.pages() || ['forum']);

    // Meta
    this.metaNameMode = Stream(attrs.property ? 'property' : 'name');
    this.metaName = Stream((attrs.name as string) || '');
    this.metaProperty = Stream((attrs.property as string) || '');
    this.metaContent = Stream((attrs.content as string) || '');

    // Link
    this.linkRel = Stream((attrs.rel as string) || '');
    this.linkHref = Stream((attrs.href as string) || '');
    this.linkAs = Stream(((attrs.as as LinkAs) || '') as LinkAs);
    this.linkType = Stream((attrs.type as string) || '');
    this.linkCrossorigin = Stream(attrs.crossorigin !== undefined && attrs.crossorigin !== false);
    this.linkFetchpriority = Stream(((attrs.fetchpriority as FetchPriority) || '') as FetchPriority);

    // Any link attributes not covered by dedicated fields
    const knownLinkAttrs = new Set(['rel', 'href', 'as', 'type', 'crossorigin', 'fetchpriority']);
    const extras = Object.entries(attrs)
      .filter(([k]) => !knownLinkAttrs.has(k))
      .map(([k, v]) => ({ key: k, value: String(v) }));
    this.linkExtras = Stream(extras);

    // Script
    this.scriptMode = Stream(attrs.inline !== undefined ? 'inline' : 'src');
    this.scriptSrc = Stream((attrs.src as string) || '');
    this.scriptInline = Stream((attrs.inline as string) || '');
    this.scriptDefer = Stream((attrs.defer as boolean) || false);
    this.scriptAsync = Stream((attrs.async as boolean) || false);
    this.scriptModule = Stream((attrs.module as boolean) || false);
    this.scriptCrossorigin = Stream((attrs.crossorigin as boolean) || false);

    // Style
    this.styleInline = Stream((attrs.inline as string) || '');

    // Raw — support both new-style (attributes.content) and legacy (header column)
    const legacyHeader = this.item.header();
    const rawContent = (attrs.content as string) || (legacyHeader ? atob(legacyHeader) : '');
    this.rawContent = Stream(rawContent);
  }

  className() {
    return 'Modal--large HeaderModal';
  }

  title() {
    return this.item.exists
      ? app.translator.trans('ianm-html-head.admin.modal.edit_title')
      : app.translator.trans('ianm-html-head.admin.modal.create_title');
  }

  buildPreviewHtml(): string {
    const attrs = this.buildAttributes();

    switch (this.type()) {
      case 'meta': {
        const mode = this.metaNameMode();
        const key = mode === 'property' ? 'property' : 'name';
        const keyVal = mode === 'property' ? this.metaProperty() : this.metaName();
        const content = this.metaContent();
        if (!keyVal && !content) return '';
        let tag = '<meta';
        if (keyVal) tag += ` ${key}="${esc(keyVal)}"`;
        if (content) tag += ` content="${esc(content)}"`;
        return tag + '>';
      }

      case 'link': {
        const rel = this.linkRel();
        if (!rel) return '';
        let tag = `<link rel="${esc(rel)}"`;
        if (this.linkHref()) tag += ` href="${esc(this.linkHref())}"`;
        if (attrs.as) tag += ` as="${esc(attrs.as as string)}"`;
        if (attrs.type) tag += ` type="${esc(attrs.type as string)}"`;
        if (this.linkFetchpriority()) tag += ` fetchpriority="${esc(this.linkFetchpriority())}"`;
        if (this.linkCrossorigin()) tag += ' crossorigin="anonymous"';
        for (const { key, value } of this.linkExtras()) {
          if (key.trim()) tag += ` ${esc(key.trim())}="${esc(value)}"`;
        }
        return tag + '>';
      }

      case 'script': {
        if (this.scriptMode() === 'inline') {
          const code = this.scriptInline();
          const typeAttr = this.scriptModule() ? ' type="module"' : '';
          return `<script${typeAttr}>${code || '// your code here'}</script>`;
        }
        const src = this.scriptSrc();
        if (!src) return '';
        let tag = `<script src="${esc(src)}"`;
        if (this.scriptDefer()) tag += ' defer';
        if (this.scriptAsync()) tag += ' async';
        if (this.scriptModule()) tag += ' type="module"';
        if (this.scriptCrossorigin()) tag += ' crossorigin="anonymous"';
        return tag + '></script>';
      }

      case 'style': {
        const css = this.styleInline();
        return css ? `<style>${css}</style>` : '';
      }

      case 'raw':
        return this.rawContent() || '';

      default:
        return '';
    }
  }

  helpText(key: string) {
    return <p className="helpText">{app.translator.trans(`ianm-html-head.admin.modal.${key}`)}</p>;
  }

  renderPreviewBlock() {
    const html = this.buildPreviewHtml();
    return (
      <div className="HeaderModal-preview">
        <label>{app.translator.trans('ianm-html-head.admin.modal.preview_label')}</label>
        <pre className="HeaderModal-previewCode">
          {html || <span className="HeaderModal-previewEmpty">{app.translator.trans('ianm-html-head.admin.modal.preview_empty')}</span>}
        </pre>
      </div>
    );
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.description_label')}</label>
          <input type="text" className="FormControl" bidi={this.description} required />
          {this.helpText('description_help')}
        </div>

        <div className="Form-group HeaderModal-row">
          <div className="HeaderModal-col">
            <label>{app.translator.trans('ianm-html-head.admin.modal.type_label')}</label>
            <select
              className="FormControl"
              value={this.type()}
              onchange={(e: Event) => {
                this.type((e.target as HTMLSelectElement).value);
              }}
            >
              {TYPES.map((t) => (
                <option value={t}>{app.translator.trans(`ianm-html-head.admin.modal.type.${t}`)}</option>
              ))}
            </select>
          </div>

          <div className="HeaderModal-col">
            <label>{app.translator.trans('ianm-html-head.admin.modal.location_label')}</label>
            <select
              className="FormControl"
              value={this.location()}
              onchange={(e: Event) => {
                this.location((e.target as HTMLSelectElement).value);
              }}
            >
              {LOCATIONS.map((l) => (
                <option value={l}>{app.translator.trans(`ianm-html-head.admin.modal.location.${l}`)}</option>
              ))}
            </select>
            {this.helpText('location_help')}
          </div>

          <div className="HeaderModal-col">
            <label>{app.translator.trans('ianm-html-head.admin.modal.pages_label')}</label>
            <div className="HeaderModal-checkboxes">
              {PAGES.map((p) => (
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={this.pages().includes(p)}
                    onchange={(e: Event) => {
                      const checked = (e.target as HTMLInputElement).checked;
                      const current = this.pages();
                      this.pages(checked ? [...current, p] : current.filter((x) => x !== p));
                    }}
                  />{' '}
                  {app.translator.trans(`ianm-html-head.admin.modal.pages.${p}`)}
                </label>
              ))}
            </div>
          </div>
        </div>

        <hr />

        {this.type() === 'meta' && this.renderMetaFields()}
        {this.type() === 'link' && this.renderLinkFields()}
        {this.type() === 'script' && this.renderScriptFields()}
        {this.type() === 'style' && this.renderStyleFields()}
        {this.type() === 'raw' && this.renderRawFields()}

        {this.renderPreviewBlock()}

        <div className="Form-group">
          <Button className="Button Button--primary" type="submit" loading={(this as any).loading}>
            {app.translator.trans('ianm-html-head.admin.modal.save_button')}
          </Button>
        </div>
      </div>
    );
  }

  renderMetaFields() {
    return (
      <div className="HeaderModal-section">
        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.meta.variant_label')}</label>
          <div className="HeaderModal-checkboxes">
            <label className="checkbox">
              <input type="radio" name="meta-mode" checked={this.metaNameMode() === 'name'} onchange={() => this.metaNameMode('name')} />{' '}
              {app.translator.trans('ianm-html-head.admin.modal.meta.name_label')}
            </label>
            <label className="checkbox">
              <input type="radio" name="meta-mode" checked={this.metaNameMode() === 'property'} onchange={() => this.metaNameMode('property')} />{' '}
              {app.translator.trans('ianm-html-head.admin.modal.meta.property_label')}
            </label>
          </div>
        </div>

        {this.metaNameMode() === 'name' ? (
          <div className="Form-group">
            <label>{app.translator.trans('ianm-html-head.admin.modal.meta.name_label')}</label>
            <input className="FormControl" list="meta-names" bidi={this.metaName} placeholder="description" required />
            <datalist id="meta-names">
              {COMMON_META_NAMES.map((n) => (
                <option value={n} />
              ))}
            </datalist>
          </div>
        ) : (
          <div className="Form-group">
            <label>{app.translator.trans('ianm-html-head.admin.modal.meta.property_label')}</label>
            <input className="FormControl" list="meta-properties" bidi={this.metaProperty} placeholder="og:title" required />
            <datalist id="meta-properties">
              {COMMON_OG_PROPERTIES.map((p) => (
                <option value={p} />
              ))}
            </datalist>
          </div>
        )}

        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.meta.content_label')}</label>
          <input type="text" className="FormControl" bidi={this.metaContent} required />
        </div>
      </div>
    );
  }

  renderLinkFields() {
    const rel = this.linkRel();
    const showAs = ['preload', 'modulepreload', 'prefetch'].includes(rel);

    return (
      <div className="HeaderModal-section">
        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.link.rel_label')}</label>
          <input className="FormControl" list="link-rels" bidi={this.linkRel} placeholder="stylesheet" required />
          <datalist id="link-rels">
            {COMMON_LINK_RELS.map((r) => (
              <option value={r} />
            ))}
          </datalist>
        </div>

        {rel !== 'preconnect' && rel !== 'dns-prefetch' && (
          <div className="Form-group">
            <label>{app.translator.trans('ianm-html-head.admin.modal.link.href_label')}</label>
            <input type="url" className="FormControl" bidi={this.linkHref} placeholder="https://example.com/style.css" />
          </div>
        )}

        {showAs && (
          <div className="Form-group">
            <label>{app.translator.trans('ianm-html-head.admin.modal.link.as_label')}</label>
            <select
              className="FormControl"
              value={this.linkAs()}
              onchange={(e: Event) => {
                this.linkAs((e.target as HTMLSelectElement).value as LinkAs);
              }}
            >
              <option value="">—</option>
              {(['style', 'script', 'font', 'image', 'fetch', 'worker'] as const).map((a) => (
                <option value={a}>{a}</option>
              ))}
            </select>
            {this.helpText('link.as_help')}
          </div>
        )}

        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.link.fetchpriority_label')}</label>
          <select
            className="FormControl"
            value={this.linkFetchpriority()}
            onchange={(e: Event) => {
              this.linkFetchpriority((e.target as HTMLSelectElement).value as FetchPriority);
            }}
          >
            <option value="">— {app.translator.trans('ianm-html-head.admin.modal.link.fetchpriority_default')}</option>
            <option value="high">high</option>
            <option value="low">low</option>
            <option value="auto">auto</option>
          </select>
          {this.helpText('link.fetchpriority_help')}
        </div>

        <div className="Form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={this.linkCrossorigin()}
              onchange={(e: Event) => {
                this.linkCrossorigin((e.target as HTMLInputElement).checked);
              }}
            />{' '}
            {app.translator.trans('ianm-html-head.admin.modal.link.crossorigin_label')}
          </label>
          {this.helpText('link.crossorigin_help')}
        </div>

        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.link.extras_label')}</label>
          {this.linkExtras().map((pair: { key: string; value: string }, i: number) => (
            <div className="HeaderModal-extraRow">
              <input
                type="text"
                className="FormControl HeaderModal-extraKey"
                value={pair.key}
                placeholder="attribute"
                oninput={(e: Event) => {
                  const updated = [...this.linkExtras()];
                  updated[i] = { ...updated[i], key: (e.target as HTMLInputElement).value };
                  this.linkExtras(updated);
                }}
              />
              <input
                type="text"
                className="FormControl HeaderModal-extraValue"
                value={pair.value}
                placeholder="value"
                oninput={(e: Event) => {
                  const updated = [...this.linkExtras()];
                  updated[i] = { ...updated[i], value: (e.target as HTMLInputElement).value };
                  this.linkExtras(updated);
                }}
              />
              <button
                type="button"
                className="Button Button--icon Button--danger"
                title={app.translator.trans('ianm-html-head.admin.modal.link.extras_remove')}
                aria-label={app.translator.trans('ianm-html-head.admin.modal.link.extras_remove')}
                onclick={() => {
                  this.linkExtras(this.linkExtras().filter((_: unknown, j: number) => j !== i));
                }}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="Button"
            onclick={() => {
              this.linkExtras([...this.linkExtras(), { key: '', value: '' }]);
            }}
          >
            <i className="fas fa-plus" /> {app.translator.trans('ianm-html-head.admin.modal.link.extras_add')}
          </button>
        </div>
      </div>
    );
  }

  renderScriptFields() {
    return (
      <div className="HeaderModal-section">
        <div className="Form-group">
          <div className="HeaderModal-checkboxes">
            <label className="checkbox">
              <input type="radio" name="script-mode" checked={this.scriptMode() === 'src'} onchange={() => this.scriptMode('src')} />{' '}
              {app.translator.trans('ianm-html-head.admin.modal.script.external_label')}
            </label>
            <label className="checkbox">
              <input type="radio" name="script-mode" checked={this.scriptMode() === 'inline'} onchange={() => this.scriptMode('inline')} />{' '}
              {app.translator.trans('ianm-html-head.admin.modal.script.inline_label')}
            </label>
          </div>
        </div>

        {this.scriptMode() === 'src' ? (
          <div className="Form-group">
            <label>{app.translator.trans('ianm-html-head.admin.modal.script.src_label')}</label>
            <input type="url" className="FormControl" bidi={this.scriptSrc} placeholder="https://example.com/script.js" />
          </div>
        ) : (
          <div className="Form-group">
            <label>{app.translator.trans('ianm-html-head.admin.modal.script.inline_content_label')}</label>
            <textarea className="FormControl HeaderModal-code" bidi={this.scriptInline} rows={6} />
          </div>
        )}

        <div className="Form-group">
          <div className="HeaderModal-scriptOptions">
            {this.scriptMode() === 'src' && (
              <>
                <div className="HeaderModal-scriptOption">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={this.scriptDefer()}
                      onchange={(e: Event) => {
                        this.scriptDefer((e.target as HTMLInputElement).checked);
                      }}
                    />{' '}
                    {app.translator.trans('ianm-html-head.admin.modal.script.defer_label')}
                  </label>
                  <span className="helpText">{app.translator.trans('ianm-html-head.admin.modal.script.defer_help')}</span>
                </div>
                <div className="HeaderModal-scriptOption">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={this.scriptAsync()}
                      onchange={(e: Event) => {
                        this.scriptAsync((e.target as HTMLInputElement).checked);
                      }}
                    />{' '}
                    {app.translator.trans('ianm-html-head.admin.modal.script.async_label')}
                  </label>
                  <span className="helpText">{app.translator.trans('ianm-html-head.admin.modal.script.async_help')}</span>
                </div>
                <div className="HeaderModal-scriptOption">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={this.scriptCrossorigin()}
                      onchange={(e: Event) => {
                        this.scriptCrossorigin((e.target as HTMLInputElement).checked);
                      }}
                    />{' '}
                    {app.translator.trans('ianm-html-head.admin.modal.script.crossorigin_label')}
                  </label>
                  <span className="helpText">{app.translator.trans('ianm-html-head.admin.modal.script.crossorigin_help')}</span>
                </div>
              </>
            )}
            <div className="HeaderModal-scriptOption">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.scriptModule()}
                  onchange={(e: Event) => {
                    this.scriptModule((e.target as HTMLInputElement).checked);
                  }}
                />{' '}
                {app.translator.trans('ianm-html-head.admin.modal.script.module_label')}
              </label>
              <span className="helpText">{app.translator.trans('ianm-html-head.admin.modal.script.module_help')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderStyleFields() {
    return (
      <div className="HeaderModal-section">
        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.style.inline_label')}</label>
          <textarea className="FormControl HeaderModal-code" bidi={this.styleInline} rows={8} placeholder="body { margin: 0; }" />
          {this.helpText('style.inline_help')}
        </div>
      </div>
    );
  }

  renderRawFields() {
    return (
      <div className="HeaderModal-section">
        <p className="helpText">{app.translator.trans('ianm-html-head.admin.modal.raw.help_text')}</p>
        <div className="Form-group">
          <label>{app.translator.trans('ianm-html-head.admin.modal.raw.content_label')}</label>
          <textarea
            className="FormControl HeaderModal-code"
            bidi={this.rawContent}
            rows={6}
            placeholder='<link rel="example" href="https://example.com">'
          />
        </div>
      </div>
    );
  }

  buildAttributes(): Record<string, unknown> {
    switch (this.type()) {
      case 'meta': {
        const attrs: Record<string, unknown> = { content: this.metaContent() };
        if (this.metaNameMode() === 'property') {
          attrs.property = this.metaProperty();
        } else {
          attrs.name = this.metaName();
        }
        return attrs;
      }

      case 'link': {
        const attrs: Record<string, unknown> = { rel: this.linkRel() };
        if (this.linkHref()) attrs.href = this.linkHref();
        if (this.linkAs()) attrs.as = this.linkAs();
        if (this.linkType()) attrs.type = this.linkType();
        if (this.linkCrossorigin()) attrs.crossorigin = 'anonymous';
        if (this.linkFetchpriority()) attrs.fetchpriority = this.linkFetchpriority();
        for (const { key, value } of this.linkExtras()) {
          if (key.trim()) attrs[key.trim()] = value;
        }
        return attrs;
      }

      case 'script': {
        if (this.scriptMode() === 'inline') {
          return { inline: this.scriptInline(), module: this.scriptModule() };
        }
        const attrs: Record<string, unknown> = { src: this.scriptSrc() };
        if (this.scriptDefer()) attrs.defer = true;
        if (this.scriptAsync()) attrs.async = true;
        if (this.scriptModule()) attrs.module = true;
        if (this.scriptCrossorigin()) attrs.crossorigin = 'anonymous';
        return attrs;
      }

      case 'style':
        return { inline: this.styleInline() };

      case 'raw':
        return { content: this.rawContent() };

      default:
        return {};
    }
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    (this as any).loading = true;

    const pages = this.pages().length > 0 ? this.pages() : ['forum'];

    this.item
      .save({
        description: this.description(),
        type: this.type(),
        location: this.location(),
        pages,
        attributes: this.buildAttributes(),
      })
      .then(() => {
        (this as any).loading = false;
        (this as any).hide();
      })
      .catch((error: unknown) => {
        (this as any).loading = false;
        (this as any).onerror(error);
      });
  }
}
