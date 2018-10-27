"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSlot = "Number";
var CRUDResult;
(function (CRUDResult) {
    CRUDResult["Success"] = "Success";
    CRUDResult["Failed"] = "Failed";
    CRUDResult["Exist"] = "Exist";
    CRUDResult["NotExist"] = "Not Exist";
})(CRUDResult = exports.CRUDResult || (exports.CRUDResult = {}));
var TestStateEnum;
(function (TestStateEnum) {
    TestStateEnum["Starting"] = "Starting";
    TestStateEnum["One"] = "One";
    TestStateEnum["Two"] = "Two";
    TestStateEnum["Three"] = "Three";
})(TestStateEnum = exports.TestStateEnum || (exports.TestStateEnum = {}));
var Handler;
(function (Handler) {
    Handler["LaunchRequestHandler"] = "LaunchRequestHandler";
    Handler["StartDrunkTestIntentHandler"] = "StartDrunkTestIntentHandler";
    Handler["GoodByeIntentHandler"] = "GoodByeIntentHandler";
})(Handler = exports.Handler || (exports.Handler = {}));
