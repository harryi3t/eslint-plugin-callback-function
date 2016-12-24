# eslint-plugin-callback-function
[![Travis Status][travis-badge]][travis-project]
[![Shippable Status][shippable-badge]][shippable-project]



This currently have only one rule which enforces consistent placement of callback functions.
![rule-on-newline-code](https://cloud.githubusercontent.com/assets/5207331/21466439/cd32197a-c9f1-11e6-9e91-41c593a050ec.png)



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

* [on-newline](docs/rules/on-newline.md)


[travis-project]: https://travis-ci.org/harryi3t/eslint-plugin-callback-function
[travis-badge]: https://travis-ci.org/harryi3t/eslint-plugin-callback-function.svg?branch=master
[shippable-badge]: https://img.shields.io/shippable/585cc235e18a291000c1999c.svg?label=shippable
[shippable-project]: https://app.shippable.com/projects/585cc235e18a291000c1999c/status/dashboard

