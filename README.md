# eslint-plugin-callback-function

This currently have only one rule which enforces consistent placement of callback functions.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-callback-function`:

```
$ npm install eslint-plugin-callback-function --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-callback-function` globally.

## Usage

Add `callback-function` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "callback-function"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "callback-function/rule-name": 2
    }
}
```

## Supported Rules

* on-newline
