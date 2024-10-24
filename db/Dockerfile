FROM amazonlinux:2023.6.20241010.0

USER root

RUN yum update -y
RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    dnf install nodejs -y && \
    npm install -g npm@latest && \
    yum clean all && \
    rm -rf /var/cache/yum
RUN yum -y install git zip unzip tar gzip vim less file wget procps \
    && rm -rf /var/cache/yum/* \
    && yum clean all

ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

# puppeteer can't run as root, need to create another user
RUN groupadd pptruser
RUN useradd -m -g pptruser pptruser
RUN chown -R pptruser:pptruser /home/pptruser

USER pptruser

WORKDIR /usr/src/app

RUN alias ll='ls -la' && \
    alias vi='vim'

COPY package*.json ./
RUN npm ci