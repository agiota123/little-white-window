<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render solution and project photography as lazy-loaded images with intrinsic dimensions and descriptive alt text; import generated photos directly and uploaded photos through asset pointers to keep media loading stable.
- Resolve Lovable asset pointers through src/lib/asset-url.ts before rendering or adding image metadata, because external hosts do not serve /__l5e/assets-v1 paths; leave generated pointer JSON unchanged.
