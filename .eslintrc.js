module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "globals": {
      "require": true,
      "module": true,
      "__dirname": true
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
