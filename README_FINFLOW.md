# LLM OPS - FINFLOW

# 배포가이드 
- terraform

- local


## 주의점 !!
- terraform으로 생성되는 리소스는 모두 **ap-northeast-2 리전에 생성**됩니다.
- sagemaker 리소스들은 모두 **us-east-2리전**에 생성됩니다.
- backend 리소스를 실행할때 주의 해야합니다. 
- aws configure 세팅할때도 주의 해야합니다.