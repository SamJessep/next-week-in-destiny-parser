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
exports.CreateMapJSON = exports.CreateWeaponJSON = exports.Details = exports.Search = exports.WEAPON_DEF = exports.MAP_DEF = void 0;
var axios = require('axios')["default"];
var SEARCH_URL = 'https://www.bungie.net/Platform/Destiny2/Armory/Search/';
var DETAIL_URL = 'https://www.bungie.net/Platform/Destiny2/Manifest//';
exports.MAP_DEF = 'DestinyActivityDefinition';
exports.WEAPON_DEF = 'DestinyInventoryItemDefinition';
var AUTH_HEADERS = { "X-API-Key": "194905872e5246a6b74852cb158a9fb7" };
var Search = function (term, defType) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(SEARCH_URL + defType + "/".concat(term.replace(/[^a-zA-Z ]/g, "")));
                return [4 /*yield*/, axios.get(SEARCH_URL + defType + "/".concat(term.replace(/[^a-zA-Z ]/g, "")), { headers: AUTH_HEADERS })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data.Response];
        }
    });
}); };
exports.Search = Search;
var Details = function (hash, defType) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get(DETAIL_URL + defType + "/".concat(hash), { headers: AUTH_HEADERS })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data.Response];
        }
    });
}); };
exports.Details = Details;
var CreateWeaponJSON = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var searchResults, weaponData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.Search)(name, exports.WEAPON_DEF)];
            case 1:
                searchResults = (_a.sent()).results.results;
                if (!(searchResults != null)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.Details)(searchResults[0].hash, exports.WEAPON_DEF)];
            case 2:
                weaponData = _a.sent();
                return [2 /*return*/, {
                        name: weaponData.displayProperties.name,
                        icon: weaponData.displayProperties.icon,
                        overlay_icon: weaponData.iconWatermark,
                        description: weaponData.displayProperties.description
                    }];
            case 3: return [2 /*return*/, {
                    name: "",
                    icon: "",
                    overlay_icon: "",
                    description: ""
                }];
        }
    });
}); };
exports.CreateWeaponJSON = CreateWeaponJSON;
var CreateMapJSON = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var searchResults, mapData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.Search)(name, exports.MAP_DEF)];
            case 1:
                searchResults = (_a.sent()).results.results;
                if (!(searchResults != null)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.Details)(searchResults[0].hash, exports.MAP_DEF)];
            case 2:
                mapData = _a.sent();
                return [2 /*return*/, {
                        name: mapData.displayProperties.name,
                        icon: mapData.displayProperties.icon,
                        backdrop: mapData.pgcrImage,
                        description: mapData.displayProperties.description
                    }];
            case 3: return [2 /*return*/, {
                    name: "",
                    icon: "",
                    backdrop: "",
                    description: ""
                }];
        }
    });
}); };
exports.CreateMapJSON = CreateMapJSON;
