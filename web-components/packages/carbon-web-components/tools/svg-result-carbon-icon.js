/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { getAttributes, formatAttributes } = require('@carbon/icon-helpers');

// TODO: update @carbon/icon-helpers with this version of toString
const toString = (descriptor) => {
  if (typeof descriptor === 'string') {
    return descriptor;
  }
  const { elem = 'svg', attrs = {}, content = [] } = descriptor;
  const children = content.map(toString).join('');
  if (elem !== 'svg') {
    return `<${elem} ${formatAttributes(attrs)}>${children}</${elem}>`;
  }
  return `<${elem} ${formatAttributes(
    getAttributes(attrs)
  )}>${children}</${elem}>`;
};

/**
 * Function that takes a valid @carbon/icons style icon descriptor and returns a lit-html svg instance
 *
 * @param {object} descriptor Object representation of an SVG icon as generated by @carbon/icons
 */
const icon = (descriptor) => {
  descriptor.attrs = getAttributes(
    Object.assign(descriptor.attrs, {
      '...': '${spread(attrs)}', // eslint-disable-line no-template-curly-in-string
    })
  );
  descriptor?.content?.unshift('${children}'); // eslint-disable-line no-template-curly-in-string
  return `({ children, ...attrs } = {}) => svg\`${toString(descriptor)}\``;
};

module.exports = icon;
