FROM public.ecr.aws/amazonlinux/amazonlinux:2023.6.20241010.1

USER root

RUN dnf update -y
RUN dnf -y install git zip unzip tar gzip vim less file wget procps sudo glibc-devel
RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - \
  && dnf install nodejs -y \
  && npm install -g npm@latest

ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

RUN dnf install -y https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
RUN dnf install -y https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm \
  && rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023 \
  && dnf install mysql-community-client -y \
  && dnf clean all \
  && rm -rf /var/cache/dnf

# puppeteer can't run as root, need to create another user
RUN groupadd pptruser \
  && useradd -m -g pptruser pptruser \
  && echo 'pptruser:pptruser' | chpasswd \
  && chown -R pptruser:pptruser /home/pptruser \
  && echo 'pptruser ALL=(ALL:ALL)  ALL' >> /etc/sudoers

USER pptruser

WORKDIR /usr/src/app

RUN echo "alias ll='ls -la'" >> ~/.bashrc \
  && echo "alias vi='vim'" >> ~/.bashrc

COPY package*.json ./
RUN npm ci
