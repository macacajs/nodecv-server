FROM xudafeng/nodecv:1.0.1

COPY . /nodecv-server

ENTRYPOINT ["/nodecv-server/entrypoint.sh"]
