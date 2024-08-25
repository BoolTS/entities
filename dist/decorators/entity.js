"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.entityKey = void 0;
exports.entityKey = Symbol.for("__bool:entity__");
const Entity = () => (target, context) => {
    Reflect.defineMetadata(exports.entityKey, undefined, target);
    return target;
};
exports.Entity = Entity;
exports.default = exports.Entity;
