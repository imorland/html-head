import bootstrapAdmin from '@flarum/jest-config/src/bootstrap/admin';
import app from 'flarum/admin/app';
import patchMithril from 'flarum/common/utils/patchMithril';
import { extend } from '../../../src/admin';
import loadTranslations from '../loadTranslations';

/**
 * Boots the admin through the extension's real entry point, so its extenders
 * (the `html-headers` store type and the settings page) run as in production.
 */
export default function bootAdmin() {
  // The test setup installs plain Mithril as `m`; core patches it at startup so JSX `bidi` bindings work.
  patchMithril(globalThis);
  bootstrapAdmin();
  loadTranslations();
  app.bootExtensions({ 'ianm-html-head': { extend } } as any);
  app.boot();
}

export const settle = () => new Promise((resolve) => setTimeout(resolve));

export const text = (out: { rootEl: HTMLElement }): string => out.rootEl.textContent ?? '';

/** Modal attrs that `ModalManager` would otherwise supply. */
export const modalAttrs = () => ({ state: app.modal, animateShow: () => {}, animateHide: () => {} });
