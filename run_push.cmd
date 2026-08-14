"C:\Program Files\Git\cmd\git.exe" rev-parse --abbrev-ref HEAD
"C:\Program Files\Git\cmd\git.exe" remote get-url origin || echo NoRemote
"C:\Program Files\Git\cmd\git.exe" push -u origin feature/site-finish
