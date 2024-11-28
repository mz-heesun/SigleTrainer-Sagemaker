# 백엔드 환경 설치
## 0. 중국 지역 안내 (해외 지역은 생략 가능)
1. 중국에 배치된 경우，먼저 다음 스크립트를 실행해 주세요，pip 소스 및 docker 소스를 수정합니다.
```bash
bash 0.setup-cn.sh
```

## 1.安装后端环境
1. 백엔드 디렉터리를 입력하세요.,env.sample 파일을 .env로 복사합니다.
```bash
cd backend
cp env.sample .env
```
2. 修改编辑.env文件
```bash
vim .env
```
* 1.ec2가 역할에 바인딩된 경우 AK, SK 및 프로필을 채울 필요가 없습니다.
* 2.지역을 실제 지역으로 수정하세요.
* 3.IAM에서 이전에 생성된 Sagemaker 실행 역할의 역할을 수정합니다.
* 4.api_keys를 상위 디렉터리의 .env에 있는 api 키로 수정하고 프런트엔드와 백엔드의 일관성을 유지합니다.
* 5.有些模型(如LLaMA等)需要提供HUGGING_FACE_HUB_TOKEN，请在.env中添加
```bash
AK=
SK=
profile=
region=us-east-1
role=arn:aws:iam::
db_host=127.0.0.1
db_name=llm
db_user=llmdata
db_password=llmdata
api_keys=
HUGGING_FACE_HUB_TOKEN=
WANDB_API_KEY=
WANDB_BASE_URL=
MAX_MODEL_LEN=4096
```

2. 仍然在backend/설치할 디렉터리에서 다음 명령을 실행합니다.
```bash
bash 01.setup.sh
```

- 2.1 vllm 추론 이미지 패키징
```bash
cd ~/llm_model_hub/backend/byoc
bash build_and_push.sh
source ../../miniconda3/bin/activate py311
conda activate py311
python3 startup.py 
```

## 2.사용자 추가
- 仍然在backend/사용자를 추가하려면 디렉터리에서 다음 Python 스크립트 명령을 실행하세요.
```bash
cd ~/llm_model_hub/backend/
source ../miniconda3/bin/activate py311
conda activate py311
python3 users/add_user.py your_username your_password default
```
자신의 사용자와 비밀번호를 추가하세요.，그리고 안전한 위치에 저장하세요。


## 3.백그라운드에서 프로세스 시작
- 다음 명령을 실행하여 백그라운드 프로세스를 시작합니다.
```bash
bash 02.start_backend.sh
```
- 다음 명령은 백그라운드 프로세스가 성공적으로 시작되었는지 확인합니다.
```bash
pm2 list
```
modelhub是前端进程，modelhub-engine和modelhub-server是后端进程
![alt text](../assets/image-pm2list.png)


## 4.安装nginx（可选）
- 安装nginx
```bash
sudo apt update 
sudo apt install nginx
```

- 创建nginx配置文件  
목적：
  백엔드 웹 서버가 SSL 없이 포트 443에서 수신하도록 허용  
  localhost:8000에서 실행되는 애플리케이션에 요청을 전달합니다.  

xxx.compute.amazonaws.com을 실제 ec2 dns 이름으로 변경해야 합니다.
```bash 
sudo vim /etc/nginx/sites-available/modelhub
```

```nginx
server {
    listen 80;
    server_name xxx.compute.amazonaws.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443;
    server_name xxx.compute.amazonaws.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- 서버 이름 버킷 크기 변경 
- 打开nginx配置文件
```bash
sudo vim /etc/nginx/nginx.conf
```
- server_names_hash_bucket_size를 256으로 변경합니다.
```nginx
http {
    server_names_hash_bucket_size 256;
    # ... other configurations ...
}
```

- 효과적인 구성:
```bash
sudo ln -s /etc/nginx/sites-available/modelhub /etc/nginx/sites-enabled/ 
sudo nginx -t 
sudo systemctl restart nginx
```