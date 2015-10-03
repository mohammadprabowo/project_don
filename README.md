Project Don : Veritrans JS in one bowl
=======================================

Next Generation Veritrans Javascript. Built using [TypeScript](http://www.typescriptlang.org/) for ES6 support, static typing, and type definitions. Resulting compilation are still compatible to ES3 browsers.

## Prequisites

Binaries / global tools:

* NodeJs
* Typescript compiler : `npm install -g typescript`
* tsd, TypeScript Definition Manager : `npm install -g tsd`
* Jasmine : `npm install -g jasmine`
* rimraf : `npm install -g rimraf`

After this, simply do:

* `npm install`. Install all required dependencies from `package.json`
* `tsd install`. Install all type definition file (*d.ts) from `tsd.json`

You're done! Make sure your editor already have typescript plugin installed.

## Scripts

Instead of using build framework / task runner / Grunt / Gulp / Webpack / Whatever.js, we leverage `npm` custom scripts inside `package.json`. More on the reasoning behind it can be read here : http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/

To modify what these scripts do, please look at `scripts` section in `package.json`

### Clean

`npm run clean`. Will clean generated `*.{js,map}` in the `bin/`, `test/` and `src/`

### Compile

`npm run compile`. Compile all TypeScript file *.ts into JavaScript.

### Test

`npm test`. Run all unit test inside the `test/` folder