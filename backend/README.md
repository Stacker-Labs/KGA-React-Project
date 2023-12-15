### build 간 메모리 부족 시

```sh
# 스왑 파일 생성
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 부팅 시 자동으로 스왑 파일을 활성화하도록 /etc/fstab에 추가
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### package.json 스크립트 수정

"build": "node --max-old-space-size=4096 ./node_modules/.bin/nest build",
