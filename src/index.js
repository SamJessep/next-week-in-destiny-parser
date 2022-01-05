"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Search_1 = require("./Search");
var raidChallengeMap = {
    "Vision of Confluence (Timelost)": 0,
    "Praedyth's Revenge (Timelost)": 1,
    "Fatebringer (Timelost)": 2,
    "Hezen Vengeance (Timelost)": 3,
    "Corrective Measure (Timelost)": 4
};
var MakeGun = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, Search_1.CreateWeaponJSON)(name)];
    });
}); };
var MakeMap = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, Search_1.CreateMapJSON)(name)];
    });
}); };
var fs = require("fs");
// READ CSV INTO STRING
var data = fs.readFileSync("weeklydata.csv").toLocaleString();
// STRING TO ARRAY
var weekJSON = [];
var weeks = data.split("\n").filter(function (_, index) { return index != 0; }); // SPLIT ROWS
weeks.forEach(function (week) {
    var items = week.split(",").map(function (i) { return i.trim(); }); //SPLIT COLUMNS
    if (items.length > 2) {
        Object.keys(items).forEach(function (key) {
            if (key.includes("GUN"))
                items[key] = MakeGun(items[key]);
            if (key.includes("MAP"))
                items[key] = MakeMap(items[key]);
        });
        var DATE = items[0], GM_MAP = items[1], GM_GUN_1 = items[2], GM_GUN_2 = items[3], RAID_GUN = items[4], TRIALS_GUN = items[5], TRIALS_MAP = items[6];
        weekJSON.push({
            date: DATE,
            vendors: {
                trials: {
                    name: "Trials of osiris",
                    items: [
                        TRIALS_GUN
                    ],
                    map: TRIALS_MAP
                },
                raid: {
                    name: "Vault of glass",
                    challengeIndex: raidChallengeMap[RAID_GUN.name],
                    items: [
                        RAID_GUN
                    ]
                },
                gm: {
                    name: "Grandmaster Nightfall",
                    items: [
                        GM_GUN_1,
                        GM_GUN_2
                    ],
                    map: GM_MAP
                }
            }
        });
    }
});
fs.writeFileSync(".weeklyItems.json", JSON.stringify(weekJSON));
