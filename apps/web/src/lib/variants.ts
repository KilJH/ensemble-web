/**
 * Lightweight variant builder for component styling
 * Alternative to class-variance-authority (cva)
 */

type VariantValue = string | undefined;
type VariantRecord = Record<string, VariantValue>;
type VariantsConfig = Record<string, VariantRecord>;

interface VariantOptions<V extends VariantsConfig> {
  base?: string;
  variants: V;
  defaultVariants?: {
    [K in keyof V]?: keyof V[K];
  };
}

type VariantProps<V extends VariantsConfig> = {
  [K in keyof V]?: keyof V[K];
} & {
  className?: string;
};

/**
 * Creates a variant function for component styling
 *
 * @example
 * const buttonVariants = createVariants({
 *   base: 'inline-flex items-center justify-center',
 *   variants: {
 *     variant: {
 *       primary: 'bg-primary text-white',
 *       secondary: 'bg-secondary text-white',
 *     },
 *     size: {
 *       sm: 'h-8 px-3 text-sm',
 *       md: 'h-10 px-4 text-base',
 *     },
 *   },
 *   defaultVariants: {
 *     variant: 'primary',
 *     size: 'md',
 *   },
 * });
 *
 * buttonVariants({ variant: 'primary', size: 'lg' })
 */
export function createVariants<V extends VariantsConfig>(options: VariantOptions<V>) {
  const { base = '', variants, defaultVariants = {} } = options;

  return (props: VariantProps<V> = {}): string => {
    const { className, ...variantProps } = props;
    const classes: string[] = [];

    if (base) {
      classes.push(base);
    }

    for (const variantKey of Object.keys(variants)) {
      const variantOptions = variants[variantKey];
      const value =
        (variantProps as Record<string, unknown>)[variantKey] ??
        (defaultVariants as Record<string, unknown>)[variantKey];

      if (value !== undefined && variantOptions[value as string]) {
        classes.push(variantOptions[value as string] as string);
      }
    }

    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(' ');
  };
}

/**
 * Type helper to extract variant props from a createVariants result
 */
export type VariantPropsOf<T> = T extends (props: infer P) => string
  ? Omit<P, 'className'>
  : Record<string, never>;
