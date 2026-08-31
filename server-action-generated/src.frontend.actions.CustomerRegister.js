"use server";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common-redirect:@/tools/prisma
var require_prisma = __commonJS({
  "common-redirect:@/tools/prisma"(exports2, module2) {
    var prisma2 = require("./_common").prisma;
    module2.exports = {
      __esModule: true,
      default: prisma2,
      prisma: prisma2
    };
  }
});

// common-redirect:@/frontend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/frontend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").frontendAuth;
  }
});

// src/frontend/actions/CustomerRegister.ts
var CustomerRegister_exports = {};
__export(CustomerRegister_exports, {
  registerCustomer: () => registerCustomer
});
module.exports = __toCommonJS(CustomerRegister_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
var registerCustomer = (0, import_action_utils.withResult)(
  async (input) => {
    const trimmedUsername = input.username?.trim();
    if (!trimmedUsername || trimmedUsername.length < 3) {
      throw new Error("Username must be at least 3 characters long.");
    }
    if (trimmedUsername.length > 255) {
      throw new Error("Username must not exceed 255 characters.");
    }
    if (!input.password || input.password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
    if (input.password.length > 255) {
      throw new Error("Password must not exceed 255 characters.");
    }
    const existingUser = await import_prisma.default.accountUser.findUnique({
      where: {
        username: trimmedUsername
      }
    });
    if (existingUser) {
      throw new Error("Username is already taken. Please pick another explorer name.");
    }
    const hashedPassword = (0, import_action_utils.hashPassword)(input.password);
    const newUser = await import_prisma.default.accountUser.create({
      data: {
        username: trimmedUsername,
        passwordHash: hashedPassword,
        role: "CUSTOMER"
      }
    });
    await import_prisma.default.shoppingCart.create({
      data: {
        customerId: newUser.id,
        cartStatus: "ACTIVE"
      }
    });
    const token = await (0, import_action_utils.signToken)(newUser.id, newUser.role);
    return {
      userId: newUser.id,
      // data-from: AccountUser-id
      username: newUser.username,
      // data-from: AccountUser-username
      role: newUser.role,
      // data-from: AccountUser-role
      token
    };
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerCustomer
});
