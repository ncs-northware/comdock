# COMDOCK

COMDOCK is a web application that allows you to view simulated **fake** company informations, similar to what you would find in applications such as [NorthData](http://www.northdata.de) or the German Websites [unternehmensregister.de](http://www.unternehmensregister.de) and [handelsregister.de](http://www.handelsregister.de) for real informations.

## What you can do with this App

The app visualizes information about companies that could be published in different Bussiness Registers, such as:

- the German [Company Register](https://www.unternehmensregister.de/) 
- the German [DPMAregister](https://register.dpma.de/).
- the European Legal Entity Identifer Register (different providers, such as the [GLEIF Register](https://search.gleif.org/), the German [LEIReg](https://www.leireg.de/) or the [WM LEI-Portal](https://www.wm-leiportal.org/app/de/lei-suche))

The app collects and processes this data and then presents it in an easy-to-understand format inspired by the German App [NorthData](https://www.northdata.de/).

## DISCLAIMER

The resulting web application and its contents of this repository are in many parts very similar to the official websites and entries of the german company register. It is expressly pointed out that all contents of this website in live state and into this repository are entirely fictitious. Any similarities in company names or connections to real existing persons and companies are purely coincidental and do not correspond to reality.

The containing data of the website should be inserted exclusively through an external database. If you still find data into the code of this repository that does not seem to serve the basic structure of the website, please report by an [issue](https://github.com/ncs-northware/comdock/issues) into this repository. Even if you find parts of the code that do not seem to be intended for the public despite our previous review (such as access data or other backdoors), please [report](https://github.com/ncs-northware/comdock/issues) them as an issue to the repository owner. Thank you!


## Install and run this project

### Install the backend

**Run these commands in the `/backend` folder.**

First you will have to install all that is needed, so run

```bash
npm install
```

The installation process will install all needed packages as defined in `package.json`.

After it rename the file `env.example` to `.env` and fill the secrets as described.

To start this Strapi Application in Development configuration, now run

```bash
npm run dev
```

**Attention**: In other Strapi projects this will not work, since the default command provided by strapi is `npm run develop`.

### Install the frontend

**Run these commands in `/frontend`.**

To connect this frontend to the backend you need to create an `.env` File in `/frontend` that contains the `NEXT_PUBLIC_STRAPI_URL`:

```bash
NEXT_PUBLIC_STRAPI_URL = <your backend URL>
```

To install and run the project in development configuration, run the commands in your command line:

```bash
npm install
npm run dev
```

After it, navigate to [localhost:3000](localhost:3000) with your Browser to see the App.

## More Infos

- Please see the issue [Strapi Backup (Data Import/Export/Transfer) #117](https://github.com/ncs-northware/comdock/issues/117) to learn how to backup data when using this App.
- [Next.js Documentation](https://nextjs.org/docs/)
- [Strapi Documentation](http://docs.strapi.io)
- I've learned Next.js and Strapi Development with the official YouTube series [Create your "next" app using Next.js and Strapi](http://youtube.com/playlist?list=PL7Q0DQYATmvjXSuHfB8CY_n_oUeqZzauZ) by Strapi.