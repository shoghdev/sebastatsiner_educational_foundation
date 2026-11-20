# Git աշխատանքային հոսք

Ճյուղեր՝ `main` (կայուն) ← `dev` (ինտեգրում) ← `feature/<task-name>`

## Քայլեր
```bash
git checkout dev && git pull
git checkout -b feature/home-hero-section
# ... աշխատանք ...
git add .
git commit -m "feat(client): add hero section to home page"
git push -u origin feature/home-hero-section
```
Ապա GitHub-ում բացել **Pull Request դեպի `dev`**։ Merge է արվում միայն թիմակցի կամ դասավանդողի հաստատումից հետո։

## Commit հաղորդագրություն
`<տեսակ>(<տարածք>): <նկարագրություն>`
- տեսակներ՝ `feat`, `fix`, `docs`, `style`, `refactor`, `chore`
- տարածքներ՝ `client`, `server`, `db`, `docs`

## Կանոններ
- Ուղիղ push `main` և `dev` ճյուղեր արգելված է (միացնել Branch protection GitHub-ում)։
- Մեկ PR = մեկ առաջադրանք, փոքր և հասկանալի։
- Conflict-ի դեպքում՝ `git pull origin dev` ձեր feature ճյուղում, լուծել, ապա push։
