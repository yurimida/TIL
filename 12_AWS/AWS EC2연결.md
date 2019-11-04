## AWS EC2연결 

1. EC2 인스턴스 만들고 , Elastic Ip에 연결 

2. ~.pem 파일 저장해놓은 위치로 들어가기 

3. chmod 400 ~.pem

4. ssh -i ~.pem ubuntu@서버IP

5. python-pip 설치 sudo apt-get install python-pip

6. zsh설치 sudo apt-get install zsh

7. oh-my-zsh sudo curl -L http://install.ohmyz.sh | sh

8. default shell 변경 sudo chsh ubuntu -s /usr/bin/zsh

9. pyenv requirements 설치 

   ```
   sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
   libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils
   ```

10. pyenv설치 

    curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash

11.pyenv 설정을 .zshrc에 기록

```
vi ~/.zshrc
export PATH="/home/ubuntu/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

Django 설정 

장고 애플리케이션은 /srv Directory

```
sudo chown -R ubuntu:ubuntu /srv/
```

git clone 

```
git clone 자신의 프로젝트
```

pyenv 3.4.3 설치 및 virtualenv

```
cd <clone 혹은 copy한 프로젝트 폴더>
pyenv install 3.4.3 (버전 바꿔야함)
pyenv virtualenv deploy_ec2
pyenv local deploy_ec2
```

runserver 테스트

```
cd deploy_ec2/django_app/
python manage.py runserver 0:8000(여기까지만 하면됨) --settings=config.settings.debug
```

만약 하는데 접근이 안된다면

```
ALLOWED_HOSTS = ["13.209.135.201"(이건 aws elsticIp로 고정해준것), "localhost", "0.0.0.0"]
이런식으로 자세하게 써줘야함
django settings.py의 allowed_hosts 부분
```

이렇게 해서 zsh 나갔다가 다시 들어와서 git pull 당기고 

다시 python manage.py runserver 0:8000

```
13.209.135.201:8000
으로 들어가면 접속 가능해짐
```

----------------------------------------------------------------------------------------------------------------------------------

```
node js 설치 

[https://yuddomack.tistory.com/entry/%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-EC2-nodejs-%EC%84%A4%EC%B9%98](https://yuddomack.tistory.com/entry/처음부터-시작하는-EC2-nodejs-설치)

npm install 

npm run serve

* 만약에 sh: 1: vue-cli-service: Permission denied  에러 뜨면
	rm -rf node_modules 한후 run serve

http://52.79.194.10(ec2주소):8080/

```

```
vue에 register.vue에 
 axios.post('http://localhost:8000/auth/', this.credentials).then(res => {
 localhost 바꿔줘야함.
```





* 서버 계속 실행하는 방법

  ```
  $ nohup python3 manage.py runserver 0.0.0.0:8000 &
  $ nohup python3 manage.py runserver 0.0.0.0:8000 &(0.0.0.0 으로도 켜야함)
  13.209.135.201
  $ ps -l
  
  http://54.180.0.51:8000/api/wines/
  0 S  1000 20847 20259  5  80   0 - 23755 wait   pts/0    00:00:00 python3 0 S  1000 20849 20847  6  80   0 - 43989 poll_s pts/0    00:00:00 python3
  
  
  ```

* 서버 종료

  ```
  $ ps -ef 
  $ kill -9 [PID]
$ kill [processID]
  ```
  

