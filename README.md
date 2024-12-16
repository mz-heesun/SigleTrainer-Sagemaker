# Model Hub
Model Hub V2는 원스톱 모델 미세 조정, 배포 및 디버깅을 제공하는 코드 없는 시각화 플랫폼으로, 사용자가 다양한 오픈 소스 모델의 미세 조정 효과를 신속하게 확인하고 사용자를 용이하게 할 수 있습니다. 신속하게 실험하고 결정을 내리고 대규모 모델에 대한 사용자 임계값을 줄입니다. 자세한 내용은 [Feishu 사용 지침](https://amzn-chn.feishu.cn/docx/QniUdr7FroxShfxeoPacLJKtnXf)
# 다음 배포 방법을 선택하세요.
# 1. 자동 배포 (아직 사용할 수 없음) 중국 지원)
- CloudFormation을 입력하여 스택을 생성하고 배포 파일을 업로드하도록 선택합니다.
[cloudformation-template.yaml](./cloudformation-template.yaml)
![alt text](./assets/image-cf1.png)
- modelhub, HuggingFaceHubToken 등 스택 이름을 입력합니다(선택).
![alt text](./assets/image-cf2.png)
- 확인 상자를 체크한 후 제출할 때까지 다음 단계로 계속 진행하세요.
![alt text](./assets/image-cf3.png)
- 구성이 완료된 후 스택이 생성될 때까지 기다린 후 스택 출력 열에서 공용 IP 주소를 찾은 다음 http://{ip}:3000을 방문하여 modelhub에 액세스합니다.
![alt text](./assets/image-cf6.png)
- 비밀번호 획득: AWS System Manager->Parameter Store 서비스 콘솔에 들어가면 추가로 /modelhub/RandomPassword가 있는 것을 확인할 수 있습니다. 입력 후 복호화된 값 표시 스위치를 켜면 로그인 비밀번호를 얻을 수 있습니다.
![alt text](./assets/image-cf5.png)
- ⚠️스택에 배포가 완료되었다고 표시된 후 시작된 EC2가 일부 스크립트를 자동으로 실행하는 데 8~10분이 소요됩니다. 작동하지 않으면 8~10분 정도 기다린 후 페이지를 새로 고치세요.
![alt text](./assets/image-cf4.png)

# 2. 수동 배포
## 1. 환경 설치
- 하드웨어 요구 사항: ec2 인스턴스, m5.xlarge, 200GB EBS 스토리지
- OS 요구 사항: ubuntu 22.04
- 구성 권한:
1. IAM:adminrole-for-ec2에서 ec2 역할을 생성합니다.
-신뢰를 선택합니다. 유형: AWS 서비스, 서비스: EC2,
- AmazonSageMakerFullAccess, CloudWatchLogsFullAccess 2개 서비스에 대한 권한 추가
- ![alt text](./assets/image_iamrole.png)
- ![alt text](./assets/image_iamrole2.png)
- ![alt text](./assets/image_iamrole3.png)
- EC2 인스턴스를 역할에 연결
- ![alt text](./assets/bindrole.png)  


2. AmazonSageMaker 서비스 역할 생성: sagemaker_exection_role
![alt text](./assets/image-1.png)
![alt text](./assets/image-2.png)

- 지금 바로 역할을 찾아 인라인 정책을 생성하세요.
- ![alt text](./assets/image-3.png)
- ![alt text](./assets/image-4.png)
- 중국인 경우 "arn:aws:s3:::*"를 "arn:aws-cn:s3:::sagemaker*"로 변경해야 합니다.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:CreateBucket"
            ],
            "Resource": [
                "arn:aws:s3:::*"
            ]
        }
    ]
}
```
- SSH에서 EC2 인스턴스로

- 중국이라면 먼저 git 에이전트를 설정해주세요.
```bash
git config --global url."https://gitclone.com/".insteadOf https://
```

- 如果是中国区需要手动下载代码并打包传到ec2中
- 请先在能访问github的环境中执行以下命令下载代码，然后把代码打包成zip文件，上传到ec2服务器。
- 使用--recurse-submodule下载代码  
```bash
git clone --recurse-submodule https://github.com/aws-samples/llm_model_hub.git
````

## 2. 프론트엔드
배포 1. nodejs 설치 18
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```
2. 如果是中国区安装，则用设置中国代理
```bash
npm config set registry https://registry.npm.taobao.org
```
3. 安装yarn
```bash
sudo apt install -y nodejs
sudo npm install --global yarn
```
2. 환경 변수 구성
- llm_model_hub/env.sample을 .env 파일에 복사하고 ip를 해당 ec2 ip로 수정한 후 무작위로 api 키를 제공합니다. 이 키는 백엔드 구성 backend/.env의 다음 부분에 있는 apikey와 일치해야 합니다. .
```
REACT_APP_API_ENDPOINT=http://{ip}:8000/v1
REACT_APP_API_KEY=무작위로 열쇠를 줘
```



3. 웹페이지
시작 - 실 설치
```bash
yarn install
```

```bash
#install pm2
sudo yarn global add pm2
pm2 start pm2run.config.js 
```
- 기타 관리 명령어는 다음과 같습니다. (참고로 실행할 필요는 없습니다.)
```bash
pm2 list
pm2 stop modelhub
pm2 restart modelhub
pm2 delete modelhub
```

## 3.백엔드 구성
[백엔드 구성](./backend/README.md)을 참조하세요.

## 4. 프런트엔드
시작 - 위 배포가 완료된 후 프런트엔드가 시작된 후 http://{ip}:3000에 접속하여 브라우저를 통해 프런트엔드
에 접근할 수 있습니다. 포트 포워딩이 필요한 경우 구성의 nginx 구성 섹션을 참조하세요.


# 업그레이드하는 방법은 무엇입니까?
- **방법 1**. 새 cloudformation 템플릿을 다운로드하고 다시 배포합니다. 새 모델허브를 배포하는 데 약 12분이 소요됩니다. (이 방법을 사용하면 이전 작업 데이터가 손실됩니다.)
- **방법 2** .
1. 원클릭 업그레이드 스크립트 사용(1.0.6 이후 지원):
```bash
cd /home/ubuntu/llm_model_hub/backend/
bash 03.upgrade.sh
```
- **방법 3**. 수동 업데이트:
1. 코드를 업데이트하고 byoc 이미지를 다시 패키징합니다.
```bash
git pull
git submodule update --remote
cd /home/ubuntu/llm_model_hub/backend/byoc
bash build_and_push.sh 
```
2. 서비스 다시 시작
```bash
pm2 restart all
```
4. 업데이트 완료