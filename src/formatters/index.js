import renderStylishTree from './stylish.js';
import renderToPlainText from './plain.js';
import renderToJson from './json.js';

const formatters = {
  stylish: renderStylishTree,
  plain: renderToPlainText,
  json: renderToJson,
};

export default function format({ data, formatType = 'stylish' }) {
  const formatter = formatters[formatType];

  if (!formatter) {
    throw new Error(`Format type "${formatType}" is not available.`);
  }

  return formatter(data);
}
