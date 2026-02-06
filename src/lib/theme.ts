import resolveConfig from 'tailwindcss/resolveConfig';

// @ts-expect-error - tailwind.config.js doesn't have type declarations
import tailwindConfig from '../../tailwind.config.js';

const { theme } = resolveConfig(tailwindConfig);

export default theme;
