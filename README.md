# ESLint Redirect Formatter

Small project to format Redirects for the [ESLint IA Refactor](https://github.com/eslint/rfcs/pull/97).

The project has the following components:

- `parseJsonToNetlify.ts` - Convert the JSON array created by `parseMdToJson.ts`
  to [Netlify _redirect file format](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file).

- `parseMdToJson.ts` - take the .md source from the ESLint IA Refactor RFC
  and convert to intermediary JSON state.
  Used during development but probably no longer useful.


## Usage

Install dependencies with `npm i`.

Run script:

```shell
# Convert JSON output from md to netlify redirect file format
#                       ~input file~            ~output file~
npm run json-to-netlify redirects-modified.json _redirects
```

These scripts were used during initial development, but probably no longer useful.

```shell
# Convert md input to json
npm run md-to-json

# run both of prev 2 scripts in sequence, md -> json -> netlify
npm run md-to-netlify
```

