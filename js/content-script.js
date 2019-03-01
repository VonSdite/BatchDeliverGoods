function injectCustomJs()
{
    let jsPath;
    let head = document.getElementsByTagName('head')[0];
    let headNode = head.childNodes[0];
    jsPath = 'js/inject.js';
    temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    head.insertBefore(temp, headNode);
}

injectCustomJs();
