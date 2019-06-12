# ncv

npm check version - A tool to check the latest version of specific package on your `package.json`. Primarily used to check version of private packages that can't be done checked using autocomplete feature.

## Usage

```
ncv                - shows list of package in your `package.json`, and shows latest version of the chosen package.
ncv [packageName]  - check latest version of specific package
```

# installation

```
yarn global add ncv
```

In order to use the list feature, you also need to install `peco`(https://github.com/peco/peco)
