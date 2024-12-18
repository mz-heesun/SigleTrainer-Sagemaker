# AWS 기본 인프라 설치

따로 환경 구분은 없습니다.

다이렉트로 개발환경 구성되는 스크립트입니다.

구분된 환경은 추후에 업데이트 될 수 있습니다.

현재 디렉토리에서 명령어를 진행해야합니다.

## 주의점 !!
- terraform으로 생성되는 리소스는 모두 **ap-northeast-2 리전에 생성**됩니다.
- sagemaker 리소스들은 모두 **us-east-2리전**에 생성됩니다.
- backend 리소스를 실행할때 주의 해야합니다. 
- aws configure 세팅할때도 주의 해야합니다. 

## 사전 준비

- aws configure profile 세팅
- terraform 설치


### 1. 테라폼 초기화
```shell
terraform init
```

### 2-1. 테라폼 적용 가능 확인 
```shell
terraform plan
```

### 2-2. 테라폼 적용
```shell
terraform apply
```


### - 리소스 삭제 
```shell
terraform destroy
```

