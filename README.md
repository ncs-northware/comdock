# COMDOCK

COMDOCK is a web application that allows you to view simulated **fake** company informations, similar to what you would find in applications such as [NorthData](http://www.northdata.de) or the German Websites [unternehmensregister.de](http://www.unternehmensregister.de) for real informations.

## What you can do with this App

The app visualizes information about companies that could be published in different Bussiness Registers, such as:

- the German [Company Register](https://www.unternehmensregister.de/) 
- the German [DPMAregister](https://register.dpma.de/).
- the European Legal Entity Identifer Register (different providers, such as the [GLEIF Register](https://search.gleif.org/), the German [LEIReg](https://www.leireg.de/) or the [WM LEI-Portal](https://www.wm-leiportal.org/app/de/lei-suche))

The app collects and processes this data and then presents it in an easy-to-understand format inspired by the German App [NorthData](https://www.northdata.de/).

## DISCLAIMER

The resulting web application and its contents of this repository are in many parts very similar to the official websites and entries of the german company register. It is expressly pointed out that all contents of this website in live state and into this repository are entirely fictitious. Any similarities in company names or connections to real existing persons and companies are purely coincidental and do not correspond to reality.

The containing data of the website should be inserted exclusively through an external database. If you still find data into the code of this repository that does not seem to serve the basic structure of the website, please report by an [issue](https://github.com/ncs-northware/comdock/issues) into this repository. Even if you find parts of the code that do not seem to be intended for the public despite our previous review (such as access data or other backdoors), please [report](https://github.com/ncs-northware/comdock/issues) them as an issue to the repository owner. Thank you!


## About this project

This project uses [Payload CMS](https://payloadcms.com/) paired with a classic [Next.js](https://nextjs.org/) App.
To get the project up and running, rename the `example.env` to `.env` and update the informations if needed.

You can now run `pnpm install` and after it `pnpm start` to run the App in Production or `pnpm dev` for a Development Environment.

The App launches at `localhost:40090`. To fill the database and manage the App, navigate to `localhost:40090/admin` and start playing.
