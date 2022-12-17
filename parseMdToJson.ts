import { writeFileSync } from 'fs';

/**
 * Taken from [Docs IA Update RFC](https://github.com/eslint/rfcs/pull/97/files#diff-793eee6d713c7712fadec8513f140747f52e89c0318990c1e8c1df82328ed3f2R216).
 */
const redirectsSrc = `| <https://eslint.org/docs/latest/user-guide/> | <https://eslint.org/docs/latest/use/> |
| <https://eslint.org/docs/latest/user-guide/core-concepts> | <https://eslint.org/docs/latest/use/core-concepts> |
| <https://eslint.org/docs/latest/user-guide/configuring/> | <https://eslint.org/docs/latest/use/configure/> |
| <https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new> | <https://eslint.org/docs/latest/use/configure/configuration-files-new> |
| <https://eslint.org/docs/latest/user-guide/configuring/configuration-files> | <https://eslint.org/docs/latest/use/configure/configuration-files> |
| <https://eslint.org/docs/latest/user-guide/configuring/language-options> | <https://eslint.org/docs/latest/use/configure/language-options> |
| <https://eslint.org/docs/latest/user-guide/configuring/rules> | <https://eslint.org/docs/latest/use/configure/rules> |
| <https://eslint.org/docs/latest/user-guide/configuring/plugins> | <https://eslint.org/docs/latest/use/configure/plugins> |
| <https://eslint.org/docs/latest/user-guide/configuring/ignoring-code> | <https://eslint.org/docs/latest/use/configure/ignore> |
| <https://eslint.org/docs/latest/user-guide/command-line-interface> | <https://eslint.org/docs/latest/use/command-line-interface> |
| <https://eslint.org/docs/latest/user-guide/formatters/> | <https://eslint.org/docs/latest/use/formatters/> |
| <https://eslint.org/docs/latest/user-guide/integrations> | <https://eslint.org/docs/latest/use/integrations> |
| <https://eslint.org/docs/latest/user-guide/migrating-to-8.0.0> | <https://eslint.org/docs/latest/use/migrate-to-8.0.0> |
| <https://eslint.org/docs/latest/user-guide/**> (any other pages not in sidebar) | <https://eslint.org/docs/latest/use/**> |
| <https://eslint.org/docs/latest/developer-guide/architecture/> | <https://eslint.org/docs/latest/contribute/architecture/> |
| <https://eslint.org/docs/latest/developer-guide/source-code> |  <https://eslint.org/docs/latest/contribute/development-environment> |
| <https://eslint.org/docs/latest/developer-guide/development-environment> |  <https://eslint.org/docs/latest/contribute/development-environment> |
| <https://eslint.org/docs/latest/developer-guide/unit-tests> | <https://eslint.org/docs/latest/contribute/tests> |
| <https://eslint.org/docs/latest/developer-guide/working-with-rules> | <https://eslint.org/docs/latest/extend/custom-rules> |
| <https://eslint.org/docs/latest/developer-guide/working-with-plugins> | <https://eslint.org/docs/latest/extend/plugins> |
| <https://eslint.org/docs/latest/developer-guide/working-with-custom-formatters> | <https://eslint.org/docs/latest/extend/custom-formatters> |
| <https://eslint.org/docs/latest/developer-guide/working-with-custom-parsers> | <https://eslint.org/docs/latest/extend/custom-parsers> |
| <https://eslint.org/docs/latest/developer-guide/nodejs-api> | <https://eslint.org/docs/latest/integrate/nodejs-api> |
| <https://eslint.org/docs/latest/developer-guide/contributing/> | <https://eslint.org/docs/latest/contribute/> |
| <https://eslint.org/docs/latest/developer-guide/contributing/reporting-bugs> | <https://eslint.org/docs/latest/contribute/report-bugs> |
| <https://eslint.org/docs/latest/developer-guide/contributing/new-rules> | <https://eslint.org/docs/latest/contribute/propose-new-rule> |
| <https://eslint.org/docs/latest/developer-guide/contributing/rule-changes> | <https://eslint.org/docs/latest/contribute/propose-rule-change> |
| <https://eslint.org/docs/latest/developer-guide/contributing/changes> | <https://eslint.org/docs/latest/contribute/request-change> |
| <https://eslint.org/docs/latest/developer-guide/contributing/working-on-issues> | <https://eslint.org/docs/latest/contribute/work-on-issue> |
| <https://eslint.org/docs/latest/developer-guide/contributing/pull-requests> | <https://eslint.org/docs/latest/contribute/pull-requests> |
| <https://eslint.org/docs/latest/developer-guide/**> (any other pages not in sidebar) | <https://eslint.org/docs/latest/extend/**> |
| <https://eslint.org/docs/latest/maintainer-guide/> | <https://eslint.org/docs/latest/maintain/> |
| <https://eslint.org/docs/latest/maintainer-guide/issues> | <https://eslint.org/docs/latest/maintain/manage-issues> |
| <https://eslint.org/docs/latest/maintainer-guide/pullrequests> |  <https://eslint.org/docs/latest/maintain/review-pull-requests> |
| <https://eslint.org/docs/latest/maintainer-guide/releases> | <https://eslint.org/docs/latest/maintain/manage-releases> |
| <https://eslint.org/docs/latest/maintainer-guide/governance> | <https://eslint.org/docs/latest/contribute/governance> |
| <https://eslint.org/docs/latest/maintainer-guide/**> (any other pages not in sidebar) | <https://eslint.org/docs/latest/maintain/**> |`;


// Permanent move. Used by all examples.
// Not sure what the exclamation point signifies, but it's present
// in all the ESLint and Netlify examples, so using here.
const status = '301!';

/**
 * Array of redirect objects.
 * Note that order matters as [Netlify redirects evaluate redirects in sequential order](https://docs.netlify.com/routing/redirects/#rule-processing-order).
 */
const redirects = redirectsSrc.split('\n').map<Redirect>(line => {
  const [_, fromCol, toCol, __] = line.split("|");

  // For context on replacements of "/**", see https://docs.netlify.com/routing/redirects/redirect-options/#splats
  const from = reformatLinkForRedirect(fromCol).replace("/**", "/*");
  const to = reformatLinkForRedirect(toCol).replace("/**", "/:splat");
  return { from, to, status };
});

function reformatLinkForRedirect(link: string): string {
  return link.substring(link.indexOf('<') + 1, link.lastIndexOf(">"))
    .replace('https://eslint.org', '');
}

writeFileSync('redirects.json', JSON.stringify(redirects, null, 4));
console.log("Wrote redirects to file `redirects.json`!");
