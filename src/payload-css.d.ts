/***
 * This is a workaround file because the export @payloadcms/next/css has no type declaration export currently.
 * The Type Declaration is needed with TypeScript 6 to get successfull builds.
 * Payload works on this issue already: https://github.com/payloadcms/payload/pull/16348
 ***/
// FIXME: When the Type Declaration is implemented in @payloadcms/next/css remove this file (Internal Issue #412)

declare module "@payloadcms/next/css";
