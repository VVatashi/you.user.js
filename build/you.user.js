// ==UserScript==
// @name        (You)
// @include     *
// @version     0.1.3
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://code.jquery.com/jquery-3.1.1.min.js
// @run-at      document-end
// @namespace   https://github.com/VVatashi
// @downloadURL https://raw.githubusercontent.com/VVatashi/-You-/master/build/you.user.js
// @updateURL   https://raw.githubusercontent.com/VVatashi/-You-/master/build/you.user.js
// ==/UserScript==
var configLocalStorageKey = 'you-config';
var configDefault = {
    name: 'Name',
    trip: '!Trip',
    myPostStyle: "{ box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8); }",
    replyPostStyle: "{ box-shadow: 6px 0 2px -2px rgba(97,134,107,.8), -6px 0 2px -2px rgba(97,134,107,.8); }",
    replyLinkStyle: ":after { content: ' (You)'; }"
};
var config = configDefault;
function loadConfig() {
    config = JSON.parse(GM_getValue(configLocalStorageKey, JSON.stringify(config)));
}
function saveConfig() {
    GM_setValue(configLocalStorageKey, JSON.stringify(config));
}
var configFormClass = 'you-config-form';
var myPostClass = 'you-post-my';
var replyPostClass = 'you-post-reply';
var replyLinkClass = 'you-post-reply-link';
function createStyle() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "\n." + myPostClass + config.myPostStyle + "\n\n." + replyPostClass + config.replyPostStyle + "\n\n." + replyLinkClass + config.replyLinkStyle + "\n\nform." + configFormClass + " {\n    position: absolute;\n    background-color: white;\n    box-shadow: 0px 2px 6px 0px rgba(97,107,134,.8);\n    padding: 12px 16px;\n    z-index: 1;\n    min-width: 30%;\n}\n\nform." + configFormClass + " table, form." + configFormClass + " p {\n    color: black;\n    background-color: white;\n    width: 100%;\n}\n\nform." + configFormClass + " tr, form." + configFormClass + " textarea {\n    width: 100%;\n}";
    document.head.appendChild(css);
}
function createConfigForm() {
    var configNameFieldClass = 'you-config-name';
    var configTripFieldClass = 'you-config-trip';
    var configMyPostStyleFieldClass = 'you-config-mypost-style';
    var configReplyPostStyleFieldClass = 'you-config-replypost-style';
    var configReplyLinkStyleFieldClass = 'you-config-replylink-style';
    var configToogleButtonClass = 'you-config-toogle';
    var configSaveButtonClass = 'you-config-save';
    var configDefaultButtonClass = 'you-config-default';
    var parent = $('.adminbar, #adminbar, .boardlist, .menu, .board-list').first();
    parent.after("\n[ <a class=\"" + configToogleButtonClass + "\">(You) config</a> ]\n<br />\n<form class=\"" + configFormClass + "\">\n    <table>\n        <tr><td>Name:</td><td><input type=\"text\" class=\"" + configNameFieldClass + "\" value=\"" + config.name + "\" /></td></tr>\n        <tr><td>Trip:</td><td><input type=\"text\" class=\"" + configTripFieldClass + "\" value=\"" + config.trip + "\" /></td></tr>\n        <tr><td>My post css:</td><td><textarea class=\"" + configMyPostStyleFieldClass + "\">" + config.myPostStyle + "</textarea></td></tr>\n        <tr><td>Reply post css:</td><td><textarea class=\"" + configReplyPostStyleFieldClass + "\">" + config.replyPostStyle + "</textarea></td></tr>\n        <tr><td>Reply link css:</td><td><textarea class=\"" + configReplyLinkStyleFieldClass + "\">" + config.replyLinkStyle + "</textarea></td></tr>\n        <tr><td colspan=\"2\"><button class=\"" + configSaveButtonClass + "\">Save</button><button class=\"" + configDefaultButtonClass + "\">Restore defaults</button></td></tr>\n    </table>\n    <p>Reload page to apply changes.</p>\n</form>\n");
    $('a.' + configToogleButtonClass).click(function () {
        $('form.' + configFormClass).toggle();
        return false;
    });
    $('button.' + configSaveButtonClass).click(function () {
        config.name = $('input.' + configNameFieldClass).val();
        config.trip = $('input.' + configTripFieldClass).val();
        config.myPostStyle = $('textarea.' + configMyPostStyleFieldClass).val();
        config.replyPostStyle = $('textarea.' + configReplyPostStyleFieldClass).val();
        config.replyLinkStyle = $('textarea.' + configReplyLinkStyleFieldClass).val();
        saveConfig();
        return false;
    });
    $('button.' + configDefaultButtonClass).click(function () {
        config = configDefault;
        $('input.' + configNameFieldClass).val(config.name);
        $('input.' + configTripFieldClass).val(config.trip);
        $('textarea.' + configMyPostStyleFieldClass).val(config.myPostStyle);
        $('textarea.' + configReplyPostStyleFieldClass).val(config.replyPostStyle);
        $('textarea.' + configReplyLinkStyleFieldClass).val(config.replyLinkStyle);
        saveConfig();
        return false;
    });
    $('form.' + configFormClass).hide();
}
var domains = [
    '2ch.hk',
    'dobrochan.com',
    'iichan.hk',
    'syn-ch.com',
    '2-ch.su',
    'nowere.net',
    '410chan.org',
    'kurisa.ch',
    'chuck.dfwk.ru',
    'owlchan.ru',
    'haibane.ru',
    'volgach.ru',
    'hohoemy.exach.com',
    'zerochan.ru',
    'haruhichan.ovh',
    'chaos.cyberpunk.us',
    '02ch.in',
    'ozuchan.ru',
    'dvach.hut2.ru',
    '2watch.su'
];
function checkDomain() {
    for (var i = 0; i < domains.length; i++) {
        if (window.location.hostname.indexOf(domains[i]) != -1)
            return true;
    }
    return false;
}
var postSelector = 'td.reply[id], div.reply[id], td.post[id], div.post[id], div.thread_OP[id], div.thread_reply[id]';
var postBodySelector = 'blockquote, .body, .postbody, .post_body';
var nameSelector = '.postername, .name, .commentpostername, .poster-name';
var tripSelector = '.postertrip, .trip, .tripcode';
var processedClass = 'you-processed';
var processedSelector = '.' + processedClass;
var myPostsIds = [];
function main() {
    var newPosts = $(postSelector).not(processedSelector);
    var myNewPosts = newPosts.filter(function (index, element) {
        var name = $(element).find(nameSelector).text();
        var trip = $(element).find(tripSelector).text();
        return name.indexOf(config.name) != -1 && trip.indexOf(config.trip) != -1;
    });
    myNewPosts.addClass(myPostClass);
    var myNewPostsIds = $.map(myNewPosts, function (element, index) {
        return $(element).attr('id').match(/\d+/)[0];
    });
    myPostsIds = myPostsIds.concat(myNewPostsIds);
    var replies = newPosts.filter(function (index, element) {
        var replyBodyText = $(element).find(postBodySelector).text();
        for (var i = 0; i < myPostsIds.length; i++) {
            if (replyBodyText.indexOf('>>' + myPostsIds[i]) != -1)
                return true;
        }
        return false;
    });
    replies.addClass(replyPostClass);
    replies.find(postBodySelector).find('a').each(function (index, element) {
        var linkText = $(element).text();
        for (var i = 0; i < myPostsIds.length; i++) {
            if (linkText == '>>' + myPostsIds[i]) {
                $(element).addClass(replyLinkClass);
                return;
            }
        }
    });
    newPosts.addClass(processedClass);
}
$(document).ready(function () {
    if (!checkDomain())
        return;
    loadConfig();
    createStyle();
    createConfigForm();
    main();
    setInterval(main, 10000);
});
//# sourceMappingURL=you.user.js.map