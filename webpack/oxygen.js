const fs = require('fs');

function OxygenCssPlugin(options) {
  this.input = options.input;
  this.output = options.output;
}

OxygenCssPlugin.prototype.apply = function (compiler) {
  compiler.plugin('after-compile', (compilation, callback) => {
    const { input, output } = this;

    const write = () => {
      if (input && output && compilation.assets[output]) {
        const style = fs.readFileSync(
          input,
          'utf-8'
        );

        const outputStyle = `${ compilation.assets[output].source() }\n${ style }`;

        compilation.assets[output] = { // eslint-disable-line no-param-reassign
          source: () => outputStyle,
          size: () => outputStyle.length,
        };
      }
      callback();
    };

    fs.exists(this.input, exists => {
      if (exists) {
        write();
      } else {
        callback();
      }
    });
  });
};

function OxygenI18nPlugin(options) {
  this.input = options.input;
}

OxygenI18nPlugin.prototype.apply = function (compiler) {
  compiler.plugin('after-compile', (compilation, callback) => {
    const { input } = this;

    const write = () => {
      if (input) {
        const messagesContent = fs.readFileSync(
          input,
          'utf-8'
        );

        compilation.assets['messages.json'] = { // eslint-disable-line no-param-reassign
          source: () => messagesContent,
          size: () => messagesContent.length,
        };
      }
      callback();
    };

    fs.exists(input, exists => {
      if (exists) {
        write();
      } else {
        callback();
      }
    });
  });
};


module.exports = {
  OxygenCssPlugin,
  OxygenI18nPlugin,
};
