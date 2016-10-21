import { Config } from './config';
import { ImageBoard } from './imageboard';

const configFormClass = 'you-config-form';
const myPostClass = 'you-post-my';
const replyPostClass = 'you-post-reply';
const replyLinkClass = 'you-post-reply-link';

let config: Config = Config.default;
let imageboard: ImageBoard = new ImageBoard();
let myPostsIds: string[] = [];

function checkDomain() {
    const domains = [
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

    for (let i = 0; i < domains.length; i++) {
        if (window.location.hostname.indexOf(domains[i]) != -1)
            return true;
    }

    return false;
}

function createCss() {
    let css = document.createElement("style");
    css.type = "text/css";

    css.innerHTML = `
.${myPostClass}${config.myPostStyle}

.${replyPostClass}${config.replyPostStyle}

.${replyLinkClass}${config.replyLinkStyle}

form.${configFormClass} {
    position: absolute;
    background-color: white;
    box-shadow: 0px 2px 6px 0px rgba(97,107,134,.8);
    padding: 12px 16px;
    z-index: 1;
    min-width: 30%;
}

form.${configFormClass} table, form.${configFormClass} p {
    color: black;
    background-color: white;
    width: 100%;
}

form.${configFormClass} tr, form.${configFormClass} textarea {
    width: 100%;
}`;

    document.head.appendChild(css);
}

function createForm() {
    const configNameFieldClass = 'you-config-name';
    const configTripFieldClass = 'you-config-trip';
    const configMyPostStyleFieldClass = 'you-config-mypost-style';
    const configReplyPostStyleFieldClass = 'you-config-replypost-style';
    const configReplyLinkStyleFieldClass = 'you-config-replylink-style';

    const configToogleButtonClass = 'you-config-toogle';
    const configSaveButtonClass = 'you-config-save';
    const configDefaultButtonClass = 'you-config-default';

    imageboard.getAdminBar().after(`
[ <a class="${configToogleButtonClass}">(You) config</a> ]
<br />
<form class="${configFormClass}">
    <table>
        <tr><td>Name:</td><td><input type="text" class="${configNameFieldClass}" value="${config.name}" /></td></tr>
        <tr><td>Trip:</td><td><input type="text" class="${configTripFieldClass}" value="${config.trip}" /></td></tr>
        <tr><td>My post css:</td><td><textarea class="${configMyPostStyleFieldClass}">${config.myPostStyle}</textarea></td></tr>
        <tr><td>Reply post css:</td><td><textarea class="${configReplyPostStyleFieldClass}">${config.replyPostStyle}</textarea></td></tr>
        <tr><td>Reply link css:</td><td><textarea class="${configReplyLinkStyleFieldClass}">${config.replyLinkStyle}</textarea></td></tr>
        <tr><td colspan="2"><button class="${configSaveButtonClass}">Save</button><button class="${configDefaultButtonClass}">Restore defaults</button></td></tr>
    </table>
    <p>Reload page to apply changes.</p>
</form>
`);

    $('a.' + configToogleButtonClass).click(() => {
        $('form.' + configFormClass).toggle();
        return false;
    });

    $('button.' + configSaveButtonClass).click(() => {
        config.name = $('input.' + configNameFieldClass).val();
        config.trip = $('input.' + configTripFieldClass).val();
        config.myPostStyle = $('textarea.' + configMyPostStyleFieldClass).val();
        config.replyPostStyle = $('textarea.' + configReplyPostStyleFieldClass).val();
        config.replyLinkStyle = $('textarea.' + configReplyLinkStyleFieldClass).val();
        Config.save(config);
        return false;
    });

    $('button.' + configDefaultButtonClass).click(() => {
        config = Config.default;
        $('input.' + configNameFieldClass).val(config.name);
        $('input.' + configTripFieldClass).val(config.trip);
        $('textarea.' + configMyPostStyleFieldClass).val(config.myPostStyle);
        $('textarea.' + configReplyPostStyleFieldClass).val(config.replyPostStyle);
        $('textarea.' + configReplyLinkStyleFieldClass).val(config.replyLinkStyle);
        Config.save(config);
        return false;
    });

    $('form.' + configFormClass).hide();
}

function main() {
    const processedClass = 'you-processed';

    let newPosts = imageboard.getPosts().not('.' + processedClass);
    let myNewPosts = newPosts.filter((index, element) => {
        let name = imageboard.getName($(element));
        let trip = imageboard.getTripcode($(element));

        return name.indexOf(config.name) != -1 && trip.indexOf(config.trip) != -1;
    });

    myNewPosts.addClass(myPostClass);

    let myNewPostsIds = $.map(myNewPosts, (element, index) => {
        return $(element).attr('id').match(/\d+/)[0];
    });

    myPostsIds = myPostsIds.concat(myNewPostsIds);

    let replies = newPosts.filter((index, element) => {
        let replyBodyText = imageboard.getPostBodyText($(element));

        for (let i = 0; i < myPostsIds.length; i++) {
            if (replyBodyText.indexOf('>>' + myPostsIds[i]) != -1)
                return true;
        }

        return false;
    });

    replies.addClass(replyPostClass);

    imageboard.getPostBodyLinks(replies).each((index, element) => {
        let linkText = $(element).text();

        for (let i = 0; i < myPostsIds.length; i++) {
            if (linkText == '>>' + myPostsIds[i]) {
                $(element).addClass(replyLinkClass);
                return;
            }
        }
    });

    newPosts.addClass(processedClass);
}

$(document).ready(() => {
    if (!checkDomain())
        return;

    config = Config.load();
    createCss();
    createForm();
    main();

    setInterval(main, 10000);
});
