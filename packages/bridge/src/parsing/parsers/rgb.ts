import { toRGB } from '@/colors/toRGB.js';
import type { RGB } from '@/colors/types.js';

import { createValueParserGenerator } from '../createValueParserGenerator.js';
import { string } from './string.js';
import type { ValueParserGenerator } from '../createValueParserGenerator.js';

/**
 * Returns parser to parse value as RGB color.
 */
export const rgb: ValueParserGenerator<RGB> = createValueParserGenerator((value) => toRGB(string().parse(value)), 'rgb');
