"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webrtc = require("webrtc-adapter");
var SESSION_STORAGE_KEY = 'getScreenMediaJSExtensionId';
// ====================================================================
// Shim getDisplayMedia
if (webrtc.browserDetails.browser === 'chrome') {
    webrtc.browserShim.shimGetDisplayMedia(window, function () {
        return new Promise(function (resolve, reject) {
            window.chrome.runtime.sendMessage(sessionStorage[SESSION_STORAGE_KEY], { type: 'getScreen', id: 1 }, null, function (data) {
                if (!data || data.sourceId === '') { // user canceled
                    var error = new Error('NavigatorUserMediaError');
                    error.name = 'NotAllowedError';
                    reject(error);
                }
                else {
                    resolve(data.sourceId);
                }
            });
        });
    });
}
else if (webrtc.browserDetails.browser === 'firefox') {
    webrtc.browserShim.shimGetDisplayMedia(window, 'screen');
}
// ====================================================================
/**
 * @description
 * Check if screensharing is available for this browser.
 *
 * @public
 */
function isAvailable() {
    // Chrome
    if (!!window.chrome) {
        return true;
    }
    // Firefox
    if (!!window.InstallTrigger) {
        return true;
    }
    if ('getDisplayMedia' in window.navigator) {
        return true;
    }
    return false;
}
exports.isAvailable = isAvailable;
/**
 * @description
 * Check if screensharing requires a browser extension.
 *
 * @public
 */
function requiresExtension() {
    // Chrome
    if (!!window.chrome) {
        return true;
    }
    return false;
}
exports.requiresExtension = requiresExtension;
/**
 * Check if the screensharing extension has already been installed.
 *
 * This is an asynchronous install check that attempts to communicate with
 * the extension.
 *
 * The user gesture flag will be lost when an answer is received, so this
 * function can not be used when a user gesture is required. For those cases,
 * use `checkForExtensionSync` instead to know if the extension _might_ be
 * already installed.
 *
 * @param extensionId string WebStore ID of the screensharing extension
 */
function checkForExtension(extensionId) {
    var runtime = window.chrome.runtime;
    return new Promise(function (resolve, reject) {
        runtime.sendMessage(extensionId, { type: 'isInstalled' }, null, function (data) {
            if (!data || !data.installed || !data.extensionId) {
                resolve(false);
                return;
            }
            sessionStorage.setItem(SESSION_STORAGE_KEY, data.extensionId);
            resolve(true);
        });
    });
}
exports.checkForExtension = checkForExtension;
/**
 * Check if the screensharing extension has _possibly_ been installed.
 *
 * This is a synchronous installation check so that user gesture status
 * can be retained.
 *
 * This only checks that the extension ID has been set in sessionStorage. If
 * the extension was removed while the session was active, this function will
 * still return `true` unless the sessionStorage key is manually cleared.
 *
 * @param extensionId string WebStore ID of the screensharing extension
 */
function checkForExtensionSync(extensionId) {
    return sessionStorage[SESSION_STORAGE_KEY] === extensionId;
}
exports.checkForExtensionSync = checkForExtensionSync;
/**
 * Get the URL for the Chrome WebStore page for the screensharing extension.
 *
 * @param extensionId string WebStore ID of the screensharing extension
 */
function getExtensionURL(extensionId) {
    return "https://chrome.google.com/webstore/detail/" + extensionId;
}
exports.getExtensionURL = getExtensionURL;
