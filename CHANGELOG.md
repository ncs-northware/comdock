# COMDOCK

## 2.1.0

### Minor Changes

- 16ae3fd: All shadcn/ui Components are migrated to use `@base-ui/react`, `radix-ui` is removed. As part of the migration all shadcn Components are updated to use current Nova Style.

### Patch Changes

- feat: Add workflow for TypeScript Syntax Checks by @onissen
- fix: The changesets config is migrated to work with @changesets/cli v3 by @onissen
- Various non-major dependency updates
- Bump typescript from 6.0.3 to 7.0.2 by @dependabot
- Bump jsdom from 29.1.1 to 30.0.1 by @dependabot
- Bump postcss from 8.4.31 to 8.5.25 by @dependabot
- Bump @changesets/cli from 2.31.1 to 3.0.0 by @dependabot

## 2.0.2

### Patch Changes

**Multiple Dependency Updates, some fixes and linting**

- chore: update changelog by @onissen in https://github.com/ncs-northware/comdock/pull/419
- feat: recreate issue template for security reports in YAML by @onissen in https://github.com/ncs-northware/comdock/pull/420
- [dependabot](deps-dev): Bump @types/node from 25.9.1 to 26.1.0 by @dependabot[bot] in https://github.com/ncs-northware/comdock/pull/431
- [dependabot](deps): Bump graphql from 16.14.0 to 17.0.2 by @dependabot[bot] in https://github.com/ncs-northware/comdock/pull/430
- [dependabot](deps): Bump the non-major group across 1 directory with 26 updates by @dependabot[bot] in https://github.com/ncs-northware/comdock/pull/433
- fix: Remove type declaration for @payloadcms/next/css by @onissen in https://github.com/ncs-northware/comdock/pull/434

## 2.0.1

### Patch Changes

- edecf60: Das Projekt nutzt jetzt die Changesets CLI. Damit können changesets angelegt werden und neue Package Versionen vorbereitet werden. Der Workflow Changesets Auto Release erstellt außerdem mit allen Änderungen zur neuen Version und bereitet das Changelog und das Package auf die neue Version vor. Darüber hinaus prüft der GitHub Bot von Changesets bei jedem Pull Request, ob ein Changeset vorhanden ist.
- 03fa822: Der `beforeChange` Hook in Collection `hr-publications` wurde verbessert, sodass der Inhalt von `summary` jetzt sicherer generiert wird.

## 2.0.0

### All new COMDOCK powered by Payload

Das COMDOCK nutzt jetzt Payload CMS als Backend. Das Frontend der App ist in die Payload-Installation integriert.
Es wird eine neue Datenstruktur und ein modernerer Frontend-Code verwendet.
