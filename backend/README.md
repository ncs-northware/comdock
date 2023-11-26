# COMDOCK Backend

COMDOCK is a web application that allows you to view simulated **fake** company informations, similar to what you would find in applications such as [NorthData](http://www.northdata.de) or the German Websites [unternehmensregister.de](http://www.unternehmensregister.de) and [handelsregister.de](http://www.handelsregister.de) for real informations.

The backend of COMDOCK is developed using Strapi and can be found in this repository. You can find the frontend's Repo at [onissen/comdock-frontend](https://github.com/onissen/comdock-frontend).

## DISCLAIMER

The resulting web application and its contents of this repository are in many parts very similar to the official websites and entries of the german company register. It is expressly pointed out that all contents of this website in live state and into this repository are entirely fictitious. Any similarities in company names or connections to real existing persons and companies are purely coincidental and do not correspond to reality.

The containing data of the website should be inserted exclusively through an external database. If you still find data into the code of this repository that does not seem to serve the basic structure of the website, please report by an [issue](https://github.com/onissen/comdock-backend/issues) into this repository. Even if you find parts of the code that do not seem to be intended for the public despite our previous review (such as access data or other backdoors), please [report](https://github.com/onissen/comdock-backend/issues) them as an issue to the repository owner. Thank you!

## Install and run this App

First you will have to install all that is needed, so run

```bash
npm install
```

The installation process will install all needed packages as defined in `package.json`.

After it rename the file `env.example` to `.env` and fill the secrets as described.

To generate random salt strings you can use the following command and copy the string (without any semicolons etc.)

```bash
node -p "require('crypto').randomBytes(48).toString('base64');
```

To start this Strapi Application in Development configuration, now run

```bash
npm run dev
```

**Attention**: In other Strapi projects this will not work, since the default command provided by strapi is `npm run develop`.

### Other Commands

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```bash
npm run start
# or
yarn start
```

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```bash
npm run build
# or
yarn build
```

## More Infos

- Please see the issue [Strapi Backup (Data Import/Export/Transfer) #45](https://github.com/onissen/comdock-backend/issues/45) to learn how to backup data when using this Backend.
- [Strapi Documentation](http://docs.strapi.io)
- I've learned Next.js and Strapi Development with the official YouTube series [Create your "next" app using Next.js and Strapi](http://youtube.com/playlist?list=PL7Q0DQYATmvjXSuHfB8CY_n_oUeqZzauZ) by Strapi.
