let screenModeFlagEl = null;
let screenModeFlag = null;
let uiMode = null;
const callbacks = [];

function init() {
    screenModeFlagEl = document.getElementById('ui-mode');
    screenModeFlag = window.getComputedStyle(screenModeFlagEl, ':after');
    uiMode = screenModeFlag.content.replace(/"/g,"");

    window.addEventListener('resize', () => {
        // quote removal solution from https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
        const flag = screenModeFlag.content.replace(/"/g,"");
        if (uiMode !== flag) {
            runCallbacks(callbacks.filter(cb => cb.mode === `${flag}`));
            uiMode = flag;
        }
    })
}

function runCallbacks (filteredCallbacks) {
    for (let i = 0; i < filteredCallbacks.length; i++) {
        filteredCallbacks[i].callback();
    }
}

export function registerCallback(mode = 'mobile', callback = () => {}) {
    if (!callbacks.length) init();
    callbacks.push({ mode, callback });
}

export function getScreenMode() {
    return uiMode;
}
