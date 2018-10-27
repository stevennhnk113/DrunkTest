"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AddSentence(speech) {
    return "<s>" + speech + "</s>";
}
exports.AddSentence = AddSentence;
function AddBreak(second) {
    if (second === void 0) { second = 1; }
    return "<break time=\"" + second + "s\"/>";
}
exports.AddBreak = AddBreak;
function AddCount(max, rate, pitch, volumn) {
    if (rate === void 0) { rate = "slow"; }
    if (pitch === void 0) { pitch = ""; }
    if (volumn === void 0) { volumn = ""; }
    var countSpeech = "";
    for (var count = 1; count <= max; count++) {
        countSpeech += count.toString() + " ";
    }
    //if()
    return countSpeech;
}
exports.AddCount = AddCount;
function ModifyProsody(speech, rate, pitch, volumn) {
    if (rate === void 0) { rate = "slow"; }
    if (pitch === void 0) { pitch = ""; }
    if (volumn === void 0) { volumn = ""; }
    return "<prosody pitch=";
}
exports.ModifyProsody = ModifyProsody;
