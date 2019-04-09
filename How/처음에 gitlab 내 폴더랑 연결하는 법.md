# 처음에 gitlab 내 폴더랑 연결하는 법 

cd 폴더이름

git clone 내 주소

git init 해서 master 뜨기 

git add . 

git commit -m '메모내용'

`$ git remote add origin https://lab.ssafy.com/yurimida/algorithm.git            `

`student@M70323 MINGW64 ~/algorithm (master)                                     
$ git remote -v                                                                 
origin  https://lab.ssafy.com/yurimida/algorithm.git (fetch)                    
origin  https://lab.ssafy.com/yurimida/algorithm.git (push)                     `

불러오는 위치와 보내는 위치 확인

`$ git push -u origin master                                                     `

처음 push 할때는 해줘야함.

rm -rf .git ( master 삭제)