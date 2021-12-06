// ==UserScript==
// @name        (You)
// @include     *
// @version     0.1.7
// @grant       GM.getValue
// @grant       GM.setValue
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-end
// @namespace   https://github.com/VVatashi
// @downloadURL https://raw.githubusercontent.com/VVatashi/you.user.js/master/build/you.user.js
// @updateURL   https://raw.githubusercontent.com/VVatashi/you.user.js/master/build/you.user.js
// ==/UserScript==

!function r(n,a,s){function i(e,t){if(!a[e]){if(!n[e]){var o="function"==typeof require&&require;if(!t&&o)return o(e,!0);if(c)return c(e,!0);throw(o=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",o}o=a[e]={exports:{}},n[e][0].call(o.exports,function(t){return i(n[e][1][t]||t)},o,o.exports,r,n,a,s)}return a[e].exports}for(var c="function"==typeof require&&require,t=0;t<s.length;t++)i(s[t]);return i}({1:[function(t,e,o){"use strict";var r=this&&this.__awaiter||function(t,s,i,c){return new(i=i||Promise)(function(o,e){function r(t){try{a(c.next(t))}catch(t){e(t)}}function n(t){try{a(c.throw(t))}catch(t){e(t)}}function a(t){var e;t.done?o(t.value):((e=t.value)instanceof i?e:new i(function(t){t(e)})).then(r,n)}a((c=c.apply(t,s||[])).next())})};Object.defineProperty(o,"__esModule",{value:!0}),o.Config=void 0;class n{constructor(t,e,o,r,n){this.name=t,this.trip=e,this.myPostStyle=o,this.replyPostStyle=r,this.replyLinkStyle=n}static save(t){return GM.setValue(n.localStorageKey,JSON.stringify(t))}static load(){return r(this,void 0,void 0,function*(){var t=JSON.stringify(n.default),t=(yield GM.getValue(n.localStorageKey,t)).toString();return JSON.parse(t)})}}(o.Config=n).default=new n("Name","!Trip","{ box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8); }","{ box-shadow: 6px 0 2px -2px rgba(157,47,208,.8), -6px 0 2px -2px rgba(157,47,208,.8); }",":after { content: ' (You)'; }"),n.localStorageKey="you-config"},{}],2:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.ImageBoard=void 0;class r{constructor(t,e,o,r,n,a,s){this.name=t,this.adminBarSelector=e,this.postSelector=o,this.postSubjectelector=r,this.postNameSelector=n,this.postTripSelector=a,this.postBodySelector=s}getAdminBar(){return $(this.adminBarSelector).first()}getPosts(){return $(this.postSelector)}getPostSubject(t){return t.find(this.postSubjectelector).text()}getPostName(t){return t.find(this.postNameSelector).text()}getPostTripcode(t){return t.find(this.postTripSelector).text()}getPostBody(t){return t.find(this.postBodySelector)}getPostBodyText(t){return this.getPostBody(t).text()}getPostBodyLinks(t){return this.getPostBody(t).find("a")}getName(){return this.name}static detect(){return!1}}o.ImageBoard=r;class n extends r{constructor(){super("Hanabira","div.adminbar","td.reply[id]","span.replytitle","span.postername","span.postertrip","div.message")}static detect(){return $("p.footer").text().contains("hanabira",!0)}}class a extends r{constructor(){super("Makaba","div#adminbar","div.post[id]","span.post-title","span.ananimas","span.postertrip","blockquote")}static detect(){return $("body").hasClass("makaba")}}class s extends r{constructor(){super("Tinyboard","div.boardlist","div.post[id]","span.subject","span.name","span.trip","div.body")}static detect(){return $("footer").text().contains("tinyboard",!0)}}class i extends r{constructor(){super("TinyIB","div.adminbar","td.reply[id], div.post[id]","span.filetitle","span.postername","span.postertrip","div.message")}static detect(){return $("footer").text().contains("tinyib",!0)}}class c extends r{constructor(){super("Monaba","div#control-panel","div.post[id]","span.reply-title","span.poster-name","span.poster-trip","div.message")}static detect(){return $("footer").text().contains("monaba",!0)}}class l extends r{constructor(){super("Phutaba","ul.menu","div.thread_OP[id], div.thread_reply[id]","span.subject","span.postername","span.tripcode","div.post_body")}static detect(){return $("footer").text().contains("phutaba",!0)}}class d extends r{constructor(){super("Ochoba","div.adminbar","td.reply[id]","span.replytitle","span.commentpostername","span.postertrip","blockquote")}static detect(){return 0<$("script[src]").filter((t,e)=>$(e).attr("src").contains("ochoba",!0)).length}}class p extends r{constructor(){super("Wakaba","div.adminbar, div#adminbar","td.reply[id]","span.filetitle","span.postername, span.commentpostername","span.postertrip","blockquote")}static detect(){return 0<$("script[src]").filter((t,e)=>$(e).attr("src").contains("wakaba",!0)).length}}class u extends r{constructor(){super("Kusaba","div.adminbar","td.reply[id], div.reply[id]","span.filetitle","span.postername","span.postertrip","blockquote")}static detect(){return 0<$("script[src]").filter((t,e)=>$(e).attr("src").contains("kusaba",!0)).length}}r=o.ImageBoard||(o.ImageBoard={}),r.GetImageBoard=function(){const e=[n,a,s,i,c,l,d,p,u];for(let t=0;t<e.length;t++)if(e[t].detect())return new e[t];return null}},{}],3:[function(t,e,o){"use strict";var r=this&&this.__awaiter||function(t,s,i,c){return new(i=i||Promise)(function(o,e){function r(t){try{a(c.next(t))}catch(t){e(t)}}function n(t){try{a(c.throw(t))}catch(t){e(t)}}function a(t){var e;t.done?o(t.value):((e=t.value)instanceof i?e:new i(function(t){t(e)})).then(r,n)}a((c=c.apply(t,s||[])).next())})};Object.defineProperty(o,"__esModule",{value:!0});const c=t("./config"),n=t("./imageboard"),l="you-modal-container",a="you-style",d="you-config-form",p="you-config-form",u="you-processed",y="you-post-my",f="you-post-reply",m="you-post-reply-link";let g=c.Config.default,v,b=[];function x(){$("#"+a).remove();let t=document.createElement("style");t.id=a,t.type="text/css",t.innerHTML=`
.${y}${g.myPostStyle}

.${f}${g.replyPostStyle}

.${m}${g.replyLinkStyle}

div.${l} {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 500ms;
    visibility: hidden;
    opacity: 0;
}

div.${l}:target {
    visibility: visible;
    opacity: 1;
}

form.${p} {
    margin: 70px auto;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    width: 30%;
    position: relative;
    transition: all 5s ease-in-out;
    text-align: justify;
    z-index: 1000;
}

form.${p} table, form.${p} p, form.${p} input, form.${p} textarea {
    color: black;
    background-color: white;
    width: 100%;
}

form.${p} input, form.${p} textarea {
    border: solid 1px;
}

form.${p} tr {
    width: 100%;
}`,document.head.appendChild(t)}function s(){const t="you-config-name",e="you-config-trip",o="you-config-mypost-style",r="you-config-replypost-style",n="you-config-replylink-style";var a="you-config-save",s="you-config-default";let i=v.getAdminBar();i&&0!=i.length||(i=$("body")),i.append(`
[ <a class="you-config-toogle" href="#${d}">(You) config</a> ]
<div id="${d}" class="${l}">
    <form class="${p}">
        <table>
            <tr>
                <td>Name:</td>
                <td><input type="text" class="${t}" value="${g.name}" /></td>
            </tr>
            <tr>
                <td>Trip:</td>
                <td><input type="text" class="${e}" value="${g.trip}" /></td>
            </tr>
            <tr>
                <td>My post css:</td>
                <td><textarea class="${o}">${g.myPostStyle}</textarea></td>
            </tr>
            <tr>
                <td>Reply post css:</td>
                <td><textarea class="${r}">${g.replyPostStyle}</textarea></td>
            </tr>
            <tr>
                <td>Reply link css:</td>
                <td><textarea class="${n}">${g.replyLinkStyle}</textarea></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="${a}">Ok</button>
                    <button class="${s}">Restore defaults</button>
                </td>
            </tr>
        </table>
    </form>
</div>
`),$("button."+a).click(()=>(g.name=$("input."+t).val().toString(),g.trip=$("input."+e).val().toString(),g.myPostStyle=$("textarea."+o).val().toString(),g.replyPostStyle=$("textarea."+r).val().toString(),g.replyLinkStyle=$("textarea."+n).val().toString(),c.Config.save(g),$("."+u).removeClass(u),$("."+y).removeClass(y),$("."+f).removeClass(f),$("."+m).removeClass(m),b=[],x(),h(),!(window.location.href="#"))),$("button."+s).click(()=>(g=c.Config.default,$("input."+t).val(g.name),$("input."+e).val(g.trip),$("textarea."+o).val(g.myPostStyle),$("textarea."+r).val(g.replyPostStyle),$("textarea."+n).val(g.replyLinkStyle),c.Config.save(g),!1))}function h(){let t=v.getPosts().not("."+u),e=t.filter((t,e)=>{let o=v.getPostName($(e)),r=v.getPostTripcode($(e));return o.contains(g.name)&&r.contains(g.trip)});e.addClass(y);var o=e.map((t,e)=>$(e).attr("id").match(/\d+/)[0]).toArray();b=b.concat(o);let r=t.filter((t,e)=>{let o=v.getPostBodyText($(e));for(let t=0;t<b.length;t++)if(o.contains(">>"+b[t]))return!0;return!1});r.addClass(f),v.getPostBodyLinks(r).each((t,e)=>{var o=$(e).text();for(let t=0;t<b.length;t++)if(o==">>"+b[t])return void $(e).addClass(m)}),t.addClass(u)}$(document).ready(()=>r(void 0,void 0,void 0,function*(){v=n.ImageBoard.GetImageBoard(),v?(console.log("[You] imageboard detected as "+v.getName()),g=yield c.Config.load(),x(),s(),h(),setInterval(h,1e4)):console.log("[You] imageboard not detected")}))},{"./config":1,"./imageboard":2}],4:[function(t,e,o){"function"!=typeof String.prototype.contains&&(String.prototype.contains=function(t,e){return(e=void 0===e?!1:e)?-1!=this.toUpperCase().indexOf(t.toUpperCase()):-1!=this.indexOf(t)})},{}]},{},[3,4]);