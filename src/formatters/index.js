import renderStylishTree from './stylish.js';
import renderToPlainText from './plain.js';

const formatters = {
  stylish: renderStylishTree,
  plain: renderToPlainText,
  json: JSON.stringify,
};

export default function format({ data, formatType = 'stylish' }) {
  const formatter = formatters[formatType];

  if (!formatter) {
    throw new Error(`Format type "${formatType}" is not available.`);
  }

  return formatter(data);
}
