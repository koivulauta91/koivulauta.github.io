"C:\Program Files\Git\cmd\git.exe" remote remove origin || echo remote-remove-failed
"C:\Program Files\Git\cmd\git.exe" remote add origin git@github.com:koivulauta91/koivulauta.github.io.git
"C:\Program Files\Git\cmd\git.exe" push -u origin feature/site-finish
