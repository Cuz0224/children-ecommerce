// The platform normally injects this loader during generation. For a
// standalone deployment the generated action modules already exist, so the
// source can pass through unchanged.
module.exports = function rpcLoader(source) {
  return source;
};
