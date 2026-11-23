# getstuffed.app

The Stuffed website. Cloudflare Pages (project `getstuffed`) publishes `main`
to getstuffed.app, getstuffed.au, getstuffedapp.com and getstuffedapp.com.au (with www). Nothing else is published: branch previews are off.

## How a change goes live

Main is locked. Nothing reaches the live site without the developer's
approval, typed in the GitHub app on the phone.

1. A session (or the developer) makes the change on a new branch and pushes
   it: `git push origin HEAD:refs/heads/site/<short-name>`. A branch push
   publishes nothing.
2. The session gives the developer the link to open the pull request:
   `https://github.com/danpatmore/stuffed-website/pull/new/site/<short-name>`.
   Sessions on the Mac can't open pull requests themselves.
3. The developer opens it on the phone. Within a minute the site gate
   comments with the files changed, a link to the full change and a phrase
   like `approve 3f9a1c27d0b4e851`.
4. The developer reads the change, then replies with exactly that phrase in
   the GitHub app on the phone. Never on the Mac: GitHub stays signed out
   there.
5. The check turns green. The developer taps Merge (a merge commit).
   Cloudflare publishes main within a few minutes.

A new push to the branch needs a new approval. If main has moved on, tap
Update branch first; that needs no new approval unless it changes the PR's
own files. A change under `.github/` needs `with workflows` in the phrase,
and comes from a Claude cloud session or GitHub's website on the phone,
because the Mac's token can't push workflow files.

The Mac's token can merge a pull request once it is approved, before the
developer taps Merge (GitHub ties merging to pushing). It can't merge one
that isn't approved.

## What protects it

- Ruleset "Protect main": pull request required, merge commits only, branch
  up to date, the check `site-gate` from the HybridEdge data gate app, no
  force push or deletion, and nobody can bypass it.
- `.github/workflows/site-gate.yml` and `site-gate-approval.yml` post that
  check by running the specs repo's gate (`tools/gate.py --site`). How it
  decides: danpatmore/hybridedge-vehicle-specs, `README-automation.md`,
  "The websites".
- Cloudflare Pages: production branch `main`, preview deployments off.
