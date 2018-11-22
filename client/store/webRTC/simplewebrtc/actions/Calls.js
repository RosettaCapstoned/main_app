"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../Constants");
var Selectors_1 = require("../Selectors");
var Media_1 = require("./Media");
// ====================================================================
function startCall() {
    return;
}
exports.startCall = startCall;
function endCall() {
    return;
}
exports.endCall = endCall;
/**
 * @description
 * Once joined to a room, using the `joinCall()` action will trigger joining the active call.
 *
 * The `desiredMedia` parameter can be used to control what media is received from peers. By default, it will use the type used in the global `setDesiredMedia()` action.
 *
 * **NOTE:** While the `desiredMedia` parameter controls what is _received_, what is _sent_ is determined by which tracks you have marked as shared via `shareLocalMedia()`. It is entirely possible to send audio and video while only receiving audio.
 *
 * @public
 *
 * @param roomAddress The address of a joined room
 * @param desiredMedia The media type to request from peers
 */
function joinCall(roomAddress, desiredMedia) {
    return function (dispatch, getState) {
        dispatch({
            payload: {
                desiredMedia: desiredMedia,
                roomAddress: roomAddress
            },
            type: Constants_1.JOIN_CALL
        });
        var state = getState();
        var client = Selectors_1.getClient(state);
        if (client) {
            client.sendRoomPresence(roomAddress);
            client.mesh.updateConnections();
        }
    };
}
exports.joinCall = joinCall;
/**
 * @description
 * @public
 *
 * @param roomAddress The address of the room hosting the call
 */
function leaveCall(roomAddress) {
    return function (dispatch, getState) {
        var state = getState();
        var originalCalls = Selectors_1.getJoinedCalls(state);
        dispatch({
            payload: {
                roomAddress: roomAddress
            },
            type: Constants_1.LEAVE_CALL
        });
        var updatedState = getState();
        var remainingCalls = Selectors_1.getJoinedCalls(updatedState);
        var client = Selectors_1.getClient(state);
        if (client) {
            client.sendRoomPresence(roomAddress);
            client.mesh.updateConnections();
            var speaking = Selectors_1.userIsSpeaking(state);
            if (speaking) {
                client.sendAllCallsSpeakingUpdate(true);
            }
        }
        if (originalCalls.length > 0 && remainingCalls.length === 0) {
            dispatch(Media_1.removeAllMedia());
        }
    };
}
exports.leaveCall = leaveCall;
function changeCallMode() {
    return;
}
exports.changeCallMode = changeCallMode;
function pauseCall() {
    return;
}
exports.pauseCall = pauseCall;
function resumeCall() {
    return;
}
exports.resumeCall = resumeCall;
function startRecording() {
    return;
}
exports.startRecording = startRecording;
function endRecording() {
    return;
}
exports.endRecording = endRecording;
function pauseRecording() {
    return;
}
exports.pauseRecording = pauseRecording;
function resumeRecording() {
    return;
}
exports.resumeRecording = resumeRecording;
function setDesiredMediaForCall() {
    return;
}
exports.setDesiredMediaForCall = setDesiredMediaForCall;
function updateCallState() {
    return;
}
exports.updateCallState = updateCallState;
