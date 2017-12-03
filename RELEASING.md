# Releasing

## Publishing via Travis (recommended)

* Commit

        $ npm run release
        $ # review workspace and commits - if all looks good...
        $ git push --follow-tags

Travis CI will do the rest.

## How to re-tag if a publish fails

Delete broken tag:

    $ git tag -d "X.Y.Z" && git push origin :refs/tags/X.Y.Z

Now you can re-tag and push as above.

## Updating NPM key

Log in to pact-foundation npm account in a browser and revoke the old key in the Tokens section.
Delete the env.global.secure key from travis.yml
Log in to npm via command line using the pact-foundation account.
Echo the ~/.npmrc file and grab the token out of it.

    $ gem install travis
    $ travis encrypt NPM_KEY=${NPM_KEY} --add env.global
