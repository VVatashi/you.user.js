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

!function o(a,n,s){function i(e,t){if(!n[e]){if(!a[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(c)return c(e,!0);throw(r=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",r}r=n[e]={exports:{}},a[e][0].call(r.exports,function(t){return i(a[e][1][t]||t)},r,r.exports,o,a,n,s)}return n[e].exports}for(var c="function"==typeof require&&require,t=0;t<s.length;t++)i(s[t]);return i}({1:[function(t,e,r){"use strict";var o=this&&this.__awaiter||function(t,s,i,c){return new(i=i||Promise)(function(r,e){function o(t){try{n(c.next(t))}catch(t){e(t)}}function a(t){try{n(c.throw(t))}catch(t){e(t)}}function n(t){var e;t.done?r(t.value):((e=t.value)instanceof i?e:new i(function(t){t(e)})).then(o,a)}n((c=c.apply(t,s||[])).next())})};Object.defineProperty(r,"__esModule",{value:!0}),r.Config=void 0;class a{constructor(t,e,r,o,a){this.name=t,this.trip=e,this.myPostStyle=r,this.replyPostStyle=o,this.replyLinkStyle=a}static save(t){return GM.setValue(a.localStorageKey,JSON.stringify(t))}static load(){return o(this,void 0,void 0,function*(){var t=JSON.stringify(a.default),t=(yield GM.getValue(a.localStorageKey,t)).toString();return JSON.parse(t)})}}(r.Config=a).default=new a("Name","!Trip","{ box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8); }","{ box-shadow: 6px 0 2px -2px rgba(157,47,208,.8), -6px 0 2px -2px rgba(157,47,208,.8); }",":after { content: ' (You)'; }"),a.localStorageKey="you-config"},{}],2:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ImageBoard=void 0;const o=t("./utils");class a{constructor(t,e,r,o,a,n,s){this.name=t,this.adminBarSelector=e,this.postSelector=r,this.postSubjectelector=o,this.postNameSelector=a,this.postTripSelector=n,this.postBodySelector=s}getAdminBar(){return $(this.adminBarSelector).first()}getPosts(){return $(this.postSelector)}getPostSubject(t){return t.find(this.postSubjectelector).text()}getPostName(t){return t.find(this.postNameSelector).text()}getPostTripcode(t){return t.find(this.postTripSelector).text()}getPostBody(t){return t.find(this.postBodySelector)}getPostBodyText(t){return this.getPostBody(t).text()}getPostBodyLinks(t){return this.getPostBody(t).find("a")}getName(){return this.name}static detect(){return!1}}r.ImageBoard=a;class n extends a{constructor(){super("Hanabira","div.adminbar","td.reply[id]","span.replytitle","span.postername","span.postertrip","div.message")}static detect(){return(0,o.contains)($("p.footer").text(),"hanabira",!0)}}class s extends a{constructor(){super("Makaba","div#adminbar","div.post[id]","span.post-title","span.ananimas","span.postertrip","blockquote")}static detect(){return $("body").hasClass("makaba")}}class i extends a{constructor(){super("Tinyboard","div.boardlist","div.post[id]","span.subject","span.name","span.trip","div.body")}static detect(){return(0,o.contains)($("footer").text(),"tinyboard",!0)}}class c extends a{constructor(){super("TinyIB","div.adminbar","td.reply[id], div.post[id]","span.filetitle","span.postername","span.postertrip","div.message")}static detect(){return(0,o.contains)($("footer").text(),"tinyib",!0)}}class l extends a{constructor(){super("Monaba","div#control-panel","div.post[id]","span.reply-title","span.poster-name","span.poster-trip","div.message")}static detect(){return(0,o.contains)($("footer").text(),"monaba",!0)}}class d extends a{constructor(){super("Phutaba","ul.menu","div.thread_OP[id], div.thread_reply[id]","span.subject","span.postername","span.tripcode","div.post_body")}static detect(){return(0,o.contains)($("footer").text(),"phutaba",!0)}}class p extends a{constructor(){super("Ochoba","div.adminbar","td.reply[id]","span.replytitle","span.commentpostername","span.postertrip","blockquote")}static detect(){return 0<$("script[src]").filter((t,e)=>(0,o.contains)($(e).attr("src"),"ochoba",!0)).length}}class u extends a{constructor(){super("Wakaba","div.adminbar, div#adminbar","td.reply[id]","span.filetitle","span.postername, span.commentpostername","span.postertrip","blockquote")}static detect(){return 0<$("script[src]").filter((t,e)=>(0,o.contains)($(e).attr("src"),"wakaba",!0)).length}}class y extends a{constructor(){super("Kusaba","div.adminbar","td.reply[id], div.reply[id]","span.filetitle","span.postername","span.postertrip","blockquote")}static detect(){return 0<$("script[src]").filter((t,e)=>(0,o.contains)($(e).attr("src"),"kusaba",!0)).length}}a=r.ImageBoard||(r.ImageBoard={}),a.GetImageBoard=function(){const e=[n,s,i,c,l,d,p,u,y];for(let t=0;t<e.length;t++)if(e[t].detect())return new e[t];return null}},{"./utils":4}],3:[function(t,e,r){"use strict";var o=this&&this.__awaiter||function(t,s,i,c){return new(i=i||Promise)(function(r,e){function o(t){try{n(c.next(t))}catch(t){e(t)}}function a(t){try{n(c.throw(t))}catch(t){e(t)}}function n(t){var e;t.done?r(t.value):((e=t.value)instanceof i?e:new i(function(t){t(e)})).then(o,a)}n((c=c.apply(t,s||[])).next())})};Object.defineProperty(r,"__esModule",{value:!0});const c=t("./config"),a=t("./imageboard"),n=t("./utils"),l="you-modal-container",s="you-style",d="you-config-form",p="you-config-form",u="you-processed",y="you-post-my",f="you-post-reply",m="you-post-reply-link";let g=c.Config.default,v,b=[];function x(){$("#"+s).remove();let t=document.createElement("style");t.id=s,t.type="text/css",t.innerHTML=`
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
}`,document.head.appendChild(t)}function i(){const t="you-config-name",e="you-config-trip",r="you-config-mypost-style",o="you-config-replypost-style",a="you-config-replylink-style";var n="you-config-save",s="you-config-default";let i=v.getAdminBar();i&&0!=i.length||(i=$("body")),i.append(`
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
                <td><textarea class="${r}">${g.myPostStyle}</textarea></td>
            </tr>
            <tr>
                <td>Reply post css:</td>
                <td><textarea class="${o}">${g.replyPostStyle}</textarea></td>
            </tr>
            <tr>
                <td>Reply link css:</td>
                <td><textarea class="${a}">${g.replyLinkStyle}</textarea></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="${n}">Ok</button>
                    <button class="${s}">Restore defaults</button>
                </td>
            </tr>
        </table>
    </form>
</div>
`),$("button."+n).click(()=>(g.name=$("input."+t).val().toString(),g.trip=$("input."+e).val().toString(),g.myPostStyle=$("textarea."+r).val().toString(),g.replyPostStyle=$("textarea."+o).val().toString(),g.replyLinkStyle=$("textarea."+a).val().toString(),c.Config.save(g),$("."+u).removeClass(u),$("."+y).removeClass(y),$("."+f).removeClass(f),$("."+m).removeClass(m),b=[],x(),h(),!(window.location.href="#"))),$("button."+s).click(()=>(g=c.Config.default,$("input."+t).val(g.name),$("input."+e).val(g.trip),$("textarea."+r).val(g.myPostStyle),$("textarea."+o).val(g.replyPostStyle),$("textarea."+a).val(g.replyLinkStyle),c.Config.save(g),!1))}function h(){let t=v.getPosts().not("."+u),e=t.filter((t,e)=>{var r=v.getPostName($(e)),e=v.getPostTripcode($(e));return(0,n.contains)(r,g.name)&&(0,n.contains)(e,g.trip)});e.addClass(y);var r=e.map((t,e)=>$(e).attr("id").match(/\d+/)[0]).toArray();b=b.concat(r);let o=t.filter((t,e)=>{var r=v.getPostBodyText($(e));for(let t=0;t<b.length;t++)if((0,n.contains)(r,">>"+b[t]))return!0;return!1});o.addClass(f),v.getPostBodyLinks(o).each((t,e)=>{var r=$(e).text();for(let t=0;t<b.length;t++)if(r==">>"+b[t])return void $(e).addClass(m)}),t.addClass(u)}$(document).ready(()=>o(void 0,void 0,void 0,function*(){v=a.ImageBoard.GetImageBoard(),v?(console.log("[You] imageboard detected as "+v.getName()),g=yield c.Config.load(),x(),i(),h(),setInterval(h,1e4)):console.log("[You] imageboard not detected")}))},{"./config":1,"./imageboard":2,"./utils":4}],4:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.contains=void 0,r.contains=function(t,e,r=!1){return r&&(t=t.toLocaleUpperCase(),e=e.toLocaleUpperCase()),-1!=t.indexOf(e)}},{}]},{},[3,4]);