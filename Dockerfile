FROM node:18

WORKDIR /workspace

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN npm install -g mocha jest

ENTRYPOINT ["/entrypoint.sh"]
