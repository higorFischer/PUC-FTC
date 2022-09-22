"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapKeysByValue = exports.Distinct = exports.AddOnMap = void 0;
function AddOnMap(map, key, newValue) {
    if (!(map === null || map === void 0 ? void 0 : map.has(key)))
        map === null || map === void 0 ? void 0 : map.set(key, []);
    map === null || map === void 0 ? void 0 : map.set(key, Distinct(map === null || map === void 0 ? void 0 : map.get(key), newValue));
}
exports.AddOnMap = AddOnMap;
function Distinct(oldArr, newArr) {
    return [...new Set([...oldArr, ...newArr])];
}
exports.Distinct = Distinct;
function getMapKeysByValue(keys, map) {
    var _a;
    var newMap = new Map();
    for (var key of keys) {
        var values = map.get(key);
        var transitions = (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.keys();
        if (!transitions)
            continue;
        for (var transition of transitions) {
            if (!newMap.has(transition))
                newMap.set(transition, []);
            var oldArray = newMap.get(transition);
            var newArray = values === null || values === void 0 ? void 0 : values.get(transition);
            newMap.set(transition, [...new Set([...oldArray, ...newArray])]);
        }
    }
    return newMap;
}
exports.getMapKeysByValue = getMapKeysByValue;
