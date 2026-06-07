/**
 * Automated Metadata Generation Pipeline
 *
 * Generates highly optimized, variant-tested title tags and meta descriptions
 * based on the core parameters of a programmatic tool.
 */

export interface ToolMetadataInput {
  toolName: string;      // e.g., "Ovulation Calculator"
  cluster: string;       // e.g., "Fertility Tools"
  primaryAction: string; // e.g., "calculate"
  inputType?: string;    // e.g., "cycle length"
  outputType?: string;   // e.g., "fertile window"
  keyBenefit?: string;   // e.g., "free & 100% private"
}

export interface GeneratedMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export function generateSeoMetadata(input: ToolMetadataInput): GeneratedMetadata {
  const { toolName, cluster, primaryAction, inputType, outputType, keyBenefit = "free, private, and local" } = input;
  const siteName = "CycleHub";

  // --- Title Tag Generation (Max 60 chars optimal) ---
  const titleVariants = [
    `${toolName} | Free Online Tracker | ${siteName}`,
    `Free ${toolName} - ${siteName}`,
    `${primaryAction.charAt(0).toUpperCase() + primaryAction.slice(1)} Your ${outputType || toolName} | ${siteName}`
  ];

  // Select the longest variant that is still under 60 characters, fallback to the shortest
  let selectedTitle = titleVariants[0];
  const validTitles = titleVariants.filter(t => t.length <= 60);
  if (validTitles.length > 0) {
    selectedTitle = validTitles.reduce((a, b) => a.length > b.length ? a : b);
  } else {
    selectedTitle = titleVariants.reduce((a, b) => a.length < b.length ? a : b);
  }

  // --- Meta Description Generation (Max 155 chars optimal) ---
  const benefitStr = keyBenefit ? ` It's ${keyBenefit}.` : '';
  const ioStr = (inputType && outputType) ? ` Use your ${inputType} to ${primaryAction} your ${outputType}.` : ` Instantly ${primaryAction} online.`;

  const descVariants = [
    `Use our ${toolName} to easily ${primaryAction} today.${ioStr}${benefitStr}`,
    `A fast, accurate ${toolName}. ${ioStr} No signup required, completely private.`,
    `Looking for a ${toolName}? ${siteName} provides a secure way to ${primaryAction} your data.${benefitStr}`
  ];

  // Select the longest valid description under 155 chars
  let selectedDesc = descVariants[0];
  const validDescs = descVariants.filter(d => d.length <= 155);
  if (validDescs.length > 0) {
    selectedDesc = validDescs.reduce((a, b) => a.length > b.length ? a : b);
  } else {
    selectedDesc = descVariants.reduce((a, b) => a.length < b.length ? a : b);
  }

  return {
    title: selectedTitle,
    description: selectedDesc,
    // OG limits are slightly more generous
    ogTitle: `${toolName} - Free ${cluster} | ${siteName}`,
    ogDescription: descVariants[0], // Can be slightly longer, using the primary variant
  };
}

/**
 * Validation helper to catch limits in CI/CD or tests
 */
export function validateMetadata(meta: GeneratedMetadata) {
  const warnings = [];
  if (meta.title.length > 65) warnings.push(`Title too long (${meta.title.length} chars): ${meta.title}`);
  if (meta.description.length > 160) warnings.push(`Description too long (${meta.description.length} chars)`);
  return {
    isValid: warnings.length === 0,
    warnings
  };
}