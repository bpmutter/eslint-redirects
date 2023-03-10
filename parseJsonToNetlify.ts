import { readFileSync, writeFileSync } from 'fs';

const [_, __, maybeJsonFile, maybeNetlifyFile] = process.argv;

const jsonFile = maybeJsonFile || 'redirects.json';
const netlifyFile = maybeNetlifyFile || '_redirects';

const redirects = JSON.parse(readFileSync(jsonFile, 'utf-8')) as Redirect[];

/**
 * Set a standard length for the 'from' link.
 * Must be longer than the longest from path.
 * Done to keep organized and consistent with other redirects.
 * Adding 2 characters at the end to create space between the from link
 * and the 'to' link.
 */
const fromTotLen = redirects.reduce<number>((prevLen, curr) =>
  curr.from.length > prevLen ? curr.from.length : prevLen
  , 0) + 2;

const redirectStrings = redirects.map<string>(redirect => {
  const extraWhiteSpace = new Array(fromTotLen - redirect.from.length).join(" ");
  return redirect.from + extraWhiteSpace + redirect.to + " " + redirect.status;
});

const descriptionComment = "# Redirects for the ESLint IA Refactor (https://github.com/eslint/rfcs/pull/97)\n";
const netlifyRedirectFileContent = descriptionComment + redirectStrings.join("\n");


writeFileSync(netlifyFile, netlifyRedirectFileContent);
console.log(`Wrote redirects from \`${jsonFile}\` to file \`${netlifyFile}\` in Netlify format!`);