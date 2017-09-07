const fs = require('fs');

function OxygenCssPlugin(options) {
  this.input = options.input;
  this.output = options.output;
  this.messages = options.messages;
}

OxygenCssPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    const { messages, input, output } = this;

    const style = fs.readFileSync(
      input,
      'utf-8'
    );

    if (input && output && compilation.assets[output]) {
      const outputStyle = `${ compilation.assets[output].source() }\n${ style }`;

      compilation.assets[output] = { // eslint-disable-line no-param-reassign
        source: () => outputStyle,
        size: () => outputStyle.length,
      };
    }

    if (messages) {
      const messagesContent = fs.readFileSync(
        messages,
        'utf-8'
      );

      compilation.assets['server/messages.json'] = { // eslint-disable-line no-param-reassign
        source: () => messagesContent,
        size: () => messagesContent.length,
      };
    }

    callback();
  });
};

module.exports = OxygenCssPlugin;
