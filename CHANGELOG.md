# COMDOCK

## 2.0.1

### Patch Changes

- edecf60: Das Projekt nutzt jetzt die Changesets CLI. Damit können changesets angelegt werden und neue Package Versionen vorbereitet werden. Der Workflow Changesets Auto Release erstellt außerdem mit allen Änderungen zur neuen Version und bereitet das Changelog und das Package auf die neue Version vor. Darüber hinaus prüft der GitHub Bot von Changesets bei jedem Pull Request, ob ein Changeset vorhanden ist.
- 03fa822: Der `beforeChange` Hook in Collection `hr-publications` wurde verbessert, sodass der Inhalt von `summary` jetzt sicherer generiert wird.


## 2.0.0

### All new COMDOCK powered by Payload

Das COMDOCK nutzt jetzt Payload CMS als Backend. Das Frontend der App ist in die Payload-Installation integriert.
Es wird eine neue Datenstruktur und ein modernerer Frontend-Code verwendet.