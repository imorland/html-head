(()=>{var t={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},d:(e,n)=>{for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e);const n=flarum.core.compat["admin/app"];var a=t.n(n);function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,o(t,e)}const i=flarum.core.compat["admin/components/ExtensionPage"];var l=t.n(i);const s=flarum.core.compat["common/Component"];var c=t.n(s);const d=flarum.core.compat["common/components/LoadingIndicator"];var u=t.n(d);const h=flarum.core.compat["common/components/Placeholder"];var p=t.n(h);const f=flarum.core.compat["common/components/Button"];var b=t.n(f);const v=flarum.core.compat["common/components/Switch"];var y=t.n(v);const g=flarum.core.compat["common/components/Modal"];var _=t.n(g);const N=flarum.core.compat["common/utils/Stream"];var x=t.n(N);function w(t){var e=Uint8Array.from(atob(t),(function(t){return t.charCodeAt(0)}));return(new TextDecoder).decode(e)}var P=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.item=this.attrs.item||a().store.createRecord("html-headers"),this.description=x()(this.item.description()||""),this.header=x()(this.item.header()?w(this.item.header()):""),this.loading=!1},n.className=function(){return"Modal--medium"},n.title=function(){return this.item.exists?a().translator.trans("ianm-html-head.admin.modal.edit_title"):a().translator.trans("ianm-html-head.admin.modal.create_title")},n.content=function(){return m("div",{className:"Modal-body"},m("p",null,a().translator.trans("ianm-html-head.admin.modal.text")),m("div",{className:"Form-group"},m("label",{className:"label"},a().translator.trans("ianm-html-head.admin.modal.description_label")),m("input",{type:"text",className:"FormControl",bidi:this.description,required:!0})),m("div",{className:"Form-group"},m("label",{className:"label"},a().translator.trans("ianm-html-head.admin.modal.header_label")),m("input",{type:"text",className:"FormControl",bidi:this.header,required:!0,placeholder:'<link rel="example" href="example">'})),m("div",{className:"Form-group"},m(b(),{className:"Button Button--primary",type:"submit",loading:this.loading},a().translator.trans("ianm-html-head.admin.modal.save_button"))))},n.onsubmit=function(t){t.preventDefault(),this.loading=!0;var e,n,a={description:this.description(),header:(e=this.header(),n=(new TextEncoder).encode(e),btoa(String.fromCharCode.apply(String,n)))};this.item.save(a).then(this.hide.bind(this),this.onerror.bind(this),this.loaded.bind(this))},e}(_()),S=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.item=this.attrs.headItem},n.view=function(){var t=this;return m("tr",null,m("td",null,this.item.description()),m("td",null,m("code",null,w(this.item.header()))),m("td",null,y().component({state:this.item.active(),onchange:function(e){t.activeLoading=!0,a().request({method:"PATCH",url:a().forum.attribute("apiUrl")+"/html-headers/"+t.item.id(),body:{active:e}}).then((function(e){t.item.data=e.data,t.activeLoading=!1,m.redraw()}))},loading:this.activeLoading})),m("td",null,m("div",{className:"Button--group"},b().component({className:"Button Button--secondary",onclick:function(){return a().modal.show(P,{item:t.item})}},a().translator.trans("ianm-html-head.admin.table.edit_button")),b().component({className:"Button Button--danger",onclick:function(){t.deleting=!0,t.item.delete().then((function(){t.deleting=!1,m.redraw()}))},loading:this.deleting},a().translator.trans("ianm-html-head.admin.table.delete_button")))))},e}(c()),B=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.loading=!0},n.oncreate=function(e){t.prototype.oncreate.call(this,e),this.refresh()},n.view=function(){return m("div",null,m("div",{className:"HtmlHeadSettingsPage--controls"},b().component({className:"Button Button--primary",icon:"fas fa-plus",onclick:function(){return a().modal.show(P)}},a().translator.trans("ianm-html-head.admin.create_button"))),m("br",null),m("div",{className:"HtmlHeadSettingsPage-table"},this.loading?u().component():a().store.all("html-headers").length?m("table",{style:{width:"100%",textAlign:"left"},className:"table"},m("thead",null,m("tr",null,m("th",null,a().translator.trans("ianm-html-head.admin.table.description_label")),m("th",null,a().translator.trans("ianm-html-head.admin.table.header_label")),m("th",null,a().translator.trans("ianm-html-head.admin.table.active_label")),m("th",null))),m("tbody",null,a().store.all("html-headers").map((function(t){return S.component({headItem:t})})))):m("div",null,p().component({text:a().translator.trans("ianm-html-head.admin.table.empty_text")}))))},n.refresh=function(){return this.loadResults().then(this.parseResults.bind(this))},n.loadResults=function(){return a().store.find("html-headers")},n.parseResults=function(t){this.loading=!1,m.redraw()},e}(c()),O=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e)},n.content=function(){return[m("div",{className:"container"},m("div",{className:"HtmlHeadSettingsPage"},m(B,null)))]},e}(l());const C=flarum.core.compat["common/Model"];var H=t.n(C),M=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var n=e.prototype;return n.description=function(){return H().attribute("description").call(this)},n.header=function(){return H().attribute("header").call(this)},n.active=function(){return H().attribute("active").call(this)},e}(H());a().initializers.add("ianm-html-head",(function(){a().store.models["html-headers"]=M,a().extensionData.for("ianm-html-head").registerPage(O)}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map