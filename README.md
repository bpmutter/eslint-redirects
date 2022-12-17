# ESLint Redirect Formatter

Small project to format Redirects for the [ESLint IA Refactor](https://github.com/eslint/rfcs/pull/97).

The project has the following components:

- `parseMdToJson.ts` - take the .md source from the ESLint IA Refactor RFC
  and convert to intermediary JSON state.
- `parseJsonToNetlify.ts` - Convert the JSON array created by `parseMdToJson.ts`
  to [Netlify _redirect file format](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file).


## Usage

Install dependencies with `npm i`.

Run scripts:

```shell
# Convert md input to json
npm run md-to-json

# Convert JSON output from md to netlify redirect file format
npm run json-to-netlify

# run both of prev 2 scripts in sequence, md -> json -> netlify
npm run md-to-netlify
```

