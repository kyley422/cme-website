# setting up local dev environment

## basic setup

- this project uses `pnpm` (instead of `yarn`, `npm`, etc.) for node package management because it is the fastest. make sure you have `pnpm` installed (instructions at <https://pnpm.io/installation>).
- run `pnpm install` to install all dependencies.

## storage services

> NOTE: upon some testing the vercel blob server is kind of buggy, or its API is obsolete compared to the actual current vercel blob protocol (see <https://github.com/634750802/vercel-blob-server/issues/2>). in the interest of circumventing those issues, we’ll ditch using the blob server altogether for now, and just store images _directly_ within postgres. this isn’t great at scale, especially if we start working with larger files, but it does make the infrastructure easier to manage and the code simpler to write, so let’s just keep things simple until becomes a problem, cross that bridge when we get to it. (certainly we’ll need to look into better storage solutions anyway if we want to upload larger files, e.g. videos and music, etc.)

the CME website/app relies on two storage services:

- postgresql: main database for structured data, i.e., accounts, website data/content, etc.
- vercel blob server: unstructured flat file storage for image/media uploads

production instances of these services are linked to the vercel project under the “storage” tab. for local development, we need to run separate instances of each service (otherwise prototyping/testing changes is impossible without risking breaking things, especially with multiple developers involved). i recommend running them locally via docker/podman. here are some instructions for doing so:

- vercel does not provide any container images (or even source code?) for its blob server; instead we use this third-party clone <https://github.com/634750802/vercel-blob-server>. first retrieve the repo (already configured in as a submodule of this repo):

  ```sh
  git submodule init
  git submodule update
  ```

  then build the container image via `pnpm run setup:docker` (or `setup:podman` if you use podman instead of docker).

- next, configure access credentials (database password, blob server api token, etc.) in environment variables. create a `.env.local` file, and inside it provide the following variables:

  - `POSTGRES_PASSWORD`: password for accessing the postgresql database. choose any password you like.
  - `POSTGRES_URL="postgresql://postgres:$POSTGRES_PASSWORD@localhost:5432"`
  - `VERCEL_BLOB_API_URL='http://localhost:9966'`
  - `SESSION_SECRET`: a 48-byte base64-encoded secret, used to sign/verify login sessions. you can obtain this one of a few ways:
    - run this command in a terminal: `openssl rand -base64 48`
    - open a node.js REPL and run: `Buffer.from(crypto.getRandomValues(new Uint8Array(48))).toString('base64')`
    - open a browser JS console and run: `btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(48))))`
  - `BLOB_READ_WRITE_TOKEN`: API token used to access the vercel blob server. choose any password you like.
  - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`: credentials given to the admin account when initializing the database for the first time. choose any email/password you like.

  here’s a sample `.env` file:

  ```env
  # for docker/podman containers (also `BLOB_READ_WRITE_TOKEN`)
  POSTGRES_PASSWORD='sulphate-cobbler-unloader-oxidize'

  # for seeding the database
  SEED_ADMIN_EMAIL='uclacm.inquiry@gmail.com'
  SEED_ADMIN_PASSWORD='footwear-hedging-escalate-unstaffed'

  # actual environment variables used by server
  POSTGRES_URL="postgresql://postgres:$POSTGRES_PASSWORD@localhost:5432"
  SESSION_SECRET='/nu1U9g59LiZNBuZoanB9Taeic85lLidQb5uIs9AjjtZF87uJ/UEGzW0FcEgMjk1'
  BLOB_READ_WRITE_TOKEN='support-uncork-smugness-clock'
  VERCEL_BLOB_API_URL='http://localhost:9966'
  ```

- next, create and launch the service containers (configured in `compose.yaml`). run `pnpm run dev:docker up` (or `dev:podman up`).

- initialize the database with `pnpm run dev:drizzle migrate` followed by `pnpm run dev:seed`. (the first command sets up database tables/columns/schemas etc.; the second command populates the database with some initial data.)
