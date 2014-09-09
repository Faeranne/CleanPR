# GitHub-CleanPR

GitHub-CleanPR will check your Pull Requests for mergablilty every time you push to the Master branch

## How to add it to your project

1. Go to Settings, Webhooks & Services, Add Webhook
2. Payload URL: `http://github-cleanpr.herokuapp.com/hook`
3. Default options are fine
4. Add webhook

## How it works

When you push code to your master branch, Github-CleanPR scans the current pull
requests to see what needs to be updated.  If the PR can't be auto merged, 
Github-CLeanPR will comment on the issue to let you know.

# Disclamer

This code is in no way affiliated with Github. Please file issues in this repo.
Don't complain to Github if this breaks.
