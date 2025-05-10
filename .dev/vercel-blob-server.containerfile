FROM oven/bun:latest AS vbs-build

WORKDIR "/tmp/vbs"
COPY ["vercel-blob-server/src", "src"]
RUN ["bun", "src/build.ts"]

FROM oven/bun:latest

COPY --from=vbs-build ["/tmp/vbs/dist/server.js", "server.js"]
ENV "VERCEL_STORE_PATH"="/var/vercel-blob-store"
EXPOSE 3000
CMD ["bun", "server.js"]
