// Standalone build fallback: TypeScript accepts the declaration signatures in
// action type modules without the platform's optional rewrite transform.
module.exports = function declareFunctionRewriteLoader(source) {
  return source;
};
