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
profile=pentacle
region=us-east-2
role=arn:aws:iam::529075693336:role/service-role/AmazonSageMakerServiceCatalogProductsUseRole
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

각 모듈 실행스크립트 (경로 에러가 발생할 수 있음)
```shell
./0.setup-cn.sh
```

백엔드 전체 스크립트 실행
```shell
pip install -r requirements.txt
```

각 폴더별 설명
byoc - inference 배포 스크립트 \
db-management - 로컬 데이테이스 \
LLaMA-Factory - 모델 생성 및 관리 \
