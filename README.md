# ncv

npm check version - A tool to check the latest version of specific package on your `package.json`. Primarily used to check version of private packages that can't be done checked using autocomplete feature.

## Usage

```
ncv                - shows list of package in your `package.json`, and shows latest version of the chosen package.
ncv [packageName]  - check latest version of specific package
```

# installation

You can run `ncv` by running the following command:

```
npx ncv
```

You can also install `ncv` globally

```
yarn global add ncv
```

In order to use the list feature, you also need to install `peco`(https://github.com/peco/peco)

# demo

![demo](https://user-images.githubusercontent.com/6936373/59322487-4601e300-8d11-11e9-8809-faf59fb89880.gif)
