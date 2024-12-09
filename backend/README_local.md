# 백엔드 개발 환경

- python 3.12
- mysql8.0


```shell
cp env.sample .env
```

.env 파일에 필요한 부분 입력
```shell
AK=
SK=
profile=armiq-local
region=us-east-2
role=arn:aws:iam::850205788233:role/LocalSageMakerRole
db_host=127.0.0.1
db_name=llm
db_user=llmdata
db_password=llmdata
api_keys=123456
HUGGING_FACE_HUB_TOKEN=<필수 입력>
WANDB_API_KEY=<필수 입력>
WANDB_BASE_URL=
MAX_MODEL_LEN=4096
```


도커 실행 스크립트 
```shell
docker run -d \
  --name hub-mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=1234560 \
  -e MYSQL_DATABASE=llm \
  -e MYSQL_USER=llmdata \
  -e MYSQL_PASSWORD=llmdata \
  -v mysql-data:/var/lib/mysql \
  -v $(pwd)/scripts:/opt/data \
  --restart always \
  mysql:8.0
```
테이블 생성 
```shell
cd scripts 
docker exec hub-mysql sh -c "mysql -u root -p1234560 -D llm  < /opt/data/mysql_setup.sql"
```

백엔드 전체 스크립트 실행
```shell
pip install -r requirements.txt
```

```shell
bash byoc/build_and_push_mac_local.sh 
```
백엔드 API 서버 실행
```shell
python server.py --host 0.0.0.0 --port 8000
```
배치 실행
```shell
python3 processing_engine/main.py
```

각 폴더별 설명
byoc - inference 배포 스크립트 \
db-management - 로컬 데이테이스 \
LLaMA-Factory - 모델 생성 및 관리 \

