### jupyter notebook 명령어 jn으로 만들기

echo "alias 'jn'='jupyter notebook'" >> ~/.zshrc



### 아나콘다 다운받기

https://www.anaconda.com/distribution/

### Pytouch 설치

https://pytorch.org/get-started/locally/
conda install pytorch torchvision -c pytorch

* 설치하고 zsh 쓰면
* ls -a | grep anaconda #anaconda 위치 보기
* echo 'export PATH="$HOME/anaconda3/bin:$PATH"' >> ~/.zshrc #현재 anaconda위치 확인해서 anaconda3위치에 넣어주기 
* 쉘 재실행