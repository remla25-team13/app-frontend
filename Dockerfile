FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

RUN pnpm install

EXPOSE 4200

ENTRYPOINT [ "pnpm" ]
CMD [ "start" ]