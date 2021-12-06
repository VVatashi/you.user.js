import { Config } from './config';
import { ImageBoard } from './imageboard';

const modalContainerClass = 'you-modal-container';
const styleId = 'you-style';
const configFormId = 'you-config-form';
const configFormClass = 'you-config-form';
const processedClass = 'you-processed';
const myPostClass = 'you-post-my';
const replyPostClass = 'you-post-reply';
const replyLinkClass = 'you-post-reply-link';

let config: Config = Config.default;
let imageboard: ImageBoard;
let myPostsIds: string[] = [];

function reset() {
    $('.' + processedClass).removeClass(processedClass);
    $('.' + myPostClass).removeClass(myPostClass);
    $('.' + replyPostClass).removeClass(replyPostClass);
    $('.' + replyLinkClass).removeClass(replyLinkClass);

    myPostsIds = [];

    createCss();
    main();
}

function createCss() {
    $('#' + styleId).remove();

    let css = document.createElement("style");
    css.id = styleId;
    css.type = "text/css";

    css.innerHTML = `
.${myPostClass}${config.myPostStyle}

.${replyPostClass}${config.replyPostStyle}

.${replyLinkClass}${config.replyLinkStyle}

div.${modalContainerClass} {
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

div.${modalContainerClass}:target {
    visibility: visible;
    opacity: 1;
}

form.${configFormClass} {
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

form.${configFormClass} table, form.${configFormClass} p, form.${configFormClass} input, form.${configFormClass} textarea {
    color: black;
    background-color: white;
    width: 100%;
}

form.${configFormClass} input, form.${configFormClass} textarea {
    border: solid 1px;
}

form.${configFormClass} tr {
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

    let parent = imageboard.getAdminBar();

    if (!parent || parent.length == 0)
        parent = $('body');

    parent.append(`
[ <a class="${configToogleButtonClass}" href="#${configFormId}">(You) config</a> ]
<div id="${configFormId}" class="${modalContainerClass}">
    <form class="${configFormClass}">
        <table>
            <tr>
                <td>Name:</td>
                <td><input type="text" class="${configNameFieldClass}" value="${config.name}" /></td>
            </tr>
            <tr>
                <td>Trip:</td>
                <td><input type="text" class="${configTripFieldClass}" value="${config.trip}" /></td>
            </tr>
            <tr>
                <td>My post css:</td>
                <td><textarea class="${configMyPostStyleFieldClass}">${config.myPostStyle}</textarea></td>
            </tr>
            <tr>
                <td>Reply post css:</td>
                <td><textarea class="${configReplyPostStyleFieldClass}">${config.replyPostStyle}</textarea></td>
            </tr>
            <tr>
                <td>Reply link css:</td>
                <td><textarea class="${configReplyLinkStyleFieldClass}">${config.replyLinkStyle}</textarea></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <button class="${configSaveButtonClass}">Ok</button>
                    <button class="${configDefaultButtonClass}">Restore defaults</button>
                </td>
            </tr>
        </table>
    </form>
</div>
`);

    $('button.' + configSaveButtonClass).click(() => {
        config.name = $('input.' + configNameFieldClass).val().toString();
        config.trip = $('input.' + configTripFieldClass).val().toString();
        config.myPostStyle = $('textarea.' + configMyPostStyleFieldClass).val().toString();
        config.replyPostStyle = $('textarea.' + configReplyPostStyleFieldClass).val().toString();
        config.replyLinkStyle = $('textarea.' + configReplyLinkStyleFieldClass).val().toString();
        Config.save(config);

        reset();

        window.location.href = '#';
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
}

function main() {
    let newPosts = imageboard.getPosts().not('.' + processedClass);
    let myNewPosts = newPosts.filter((index, element) => {
        let name = imageboard.getPostName($(element));
        let trip = imageboard.getPostTripcode($(element));

        return name.contains(config.name) && trip.contains(config.trip);
    });

    myNewPosts.addClass(myPostClass);

    let myNewPostsIds = myNewPosts.map((index, element) => {
        return $(element).attr('id').match(/\d+/)[0];
    }).toArray();

    myPostsIds = myPostsIds.concat(myNewPostsIds);

    let replies = newPosts.filter((index, element) => {
        let replyBodyText = imageboard.getPostBodyText($(element));

        for (let i = 0; i < myPostsIds.length; i++) {
            if (replyBodyText.contains('>>' + myPostsIds[i]))
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
    imageboard = ImageBoard.GetImageBoard();

    if (!imageboard) {
        console.log('[You] imageboard not detected');
        return;
    }

    console.log('[You] imageboard detected as ' + imageboard.getName());

    config = Config.load();
    createCss();
    createForm();
    main();

    setInterval(main, 10000);
});
