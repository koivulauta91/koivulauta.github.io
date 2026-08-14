"C:\Program Files\Git\cmd\git.exe" --version
"C:\Program Files\Git\cmd\git.exe" init
"C:\Program Files\Git\cmd\git.exe" checkout -b feature/site-finish || "C:\Program Files\Git\cmd\git.exe" switch -c feature/site-finish
"C:\Program Files\Git\cmd\git.exe" config user.name "koivulauta-bot"
"C:\Program Files\Git\cmd\git.exe" config user.email "dev@koivulauta.local"
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Finish site: add navbar, footer, meta, CSS improvements and Pages workflow" || echo NoChangesToCommit
"C:\Program Files\Git\cmd\git.exe" remote get-url origin || "C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/koivulauta91/koivulauta.github.io.git
"C:\Program Files\Git\cmd\git.exe" push -u origin feature/site-finish
