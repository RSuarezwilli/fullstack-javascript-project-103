import renderStylishTree from './stylish.js';
import renderToPlainText from './plain.js';

const formatters = {
  json: JSON.stringify,
  stylish: renderStylishTree,
  plain: renderToPlainText,
};

export default function format({ data, formatType = 'stylish' }) {
  const formatter = formatters[formatType];

  if (!formatter) {
    throw new Error(`Format type "${formatType}" is not available.`);
  }

  return formatter(data);
}
