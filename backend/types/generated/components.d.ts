import type { Schema, Attribute } from '@strapi/strapi';

export interface PersonNetworkNetzwerkDerPerson extends Schema.Component {
  collectionName: 'components_person_network_netzwerk_der_people';
  info: {
    displayName: 'Netzwerk der Person';
    description: '';
  };
  attributes: {
    company: Attribute.Relation<
      'person-network.netzwerk-der-person',
      'oneToOne',
      'api::company.company'
    >;
    since: Attribute.Date & Attribute.Required;
    upto: Attribute.Date;
    connection_type: Attribute.Enumeration<
      [
        'Gesch\u00E4ftsf\u00FChrer',
        'Gesellschafter',
        'CEO',
        'COO',
        'Einzelprokura',
        'Gesamtprokura',
        'Filialprokura',
        'Andere Vertretungsbefugnis'
      ]
    >;
    hr_public: Attribute.Relation<
      'person-network.netzwerk-der-person',
      'oneToOne',
      'api::hr-public.hr-public'
    >;
  };
}

export interface RelatedDocsRelatedDocs extends Schema.Component {
  collectionName: 'components_related_docs_related_docs';
  info: {
    displayName: 'relatedDocs';
    description: '';
  };
  attributes: {
    document: Attribute.Media<'images' | 'files'> & Attribute.Required;
    type: Attribute.Enumeration<
      ['Unterschriftsnachweis', 'Apostille', 'Beglaubigung', 'Zertifizierung']
    > &
      Attribute.Required;
  };
}

export interface NetworkCompaniesVerbundeneUnternehmen
  extends Schema.Component {
  collectionName: 'components_network_companies_verbundene_unternehmen';
  info: {
    displayName: 'Verbundene Unternehmen';
    description: '';
  };
  attributes: {
    connected_company: Attribute.Relation<
      'network-companies.verbundene-unternehmen',
      'oneToOne',
      'api::company.company'
    >;
    connection_type: Attribute.Enumeration<
      ['Beteiligung', 'Komplement\u00E4r']
    > &
      Attribute.Required;
    since: Attribute.Date;
    upto: Attribute.Date;
    hr_public: Attribute.Relation<
      'network-companies.verbundene-unternehmen',
      'oneToOne',
      'api::hr-public.hr-public'
    >;
  };
}

export interface NetworkPersonsVerbundenePersonen extends Schema.Component {
  collectionName: 'components_network_persons_verbundene_personens';
  info: {
    displayName: 'Verbundene Personen';
    description: '';
  };
  attributes: {
    connected_person: Attribute.Relation<
      'network-persons.verbundene-personen',
      'oneToOne',
      'api::person.person'
    >;
    connection_type: Attribute.Enumeration<
      [
        'Gesch\u00E4ftsf\u00FChrer',
        'Gesellschafter',
        'CEO',
        'COO',
        'Einzelprokura',
        'Gesamtprokura',
        'Filialprokura',
        'Andere Vertretungsbefugnis'
      ]
    > &
      Attribute.Required;
    since: Attribute.Date;
    upto: Attribute.Date;
    hr_public: Attribute.Relation<
      'network-persons.verbundene-personen',
      'oneToOne',
      'api::hr-public.hr-public'
    >;
  };
}

export interface LeiHistoryLeiHistory extends Schema.Component {
  collectionName: 'components_lei_history_lei_histories';
  info: {
    displayName: 'lei-history';
  };
  attributes: {
    date: Attribute.Date;
    details: Attribute.RichText & Attribute.Required;
  };
}

export interface CompaniesFurtherNamesVorherigeNamen extends Schema.Component {
  collectionName: 'components_companies_further_names_vorherige_namen';
  info: {
    displayName: 'Vorherige Namen';
  };
  attributes: {
    further_cname: Attribute.String & Attribute.Required;
    name_upto: Attribute.Date;
  };
}

export interface ExternalsExternals extends Schema.Component {
  collectionName: 'components_externals_externals';
  info: {
    displayName: 'externals';
    description: '';
  };
  attributes: {
    connected_external: Attribute.Relation<
      'externals.externals',
      'oneToOne',
      'api::external-shareholder.external-shareholder'
    >;
    connection_type: Attribute.Enumeration<
      ['Komplement\u00E4r', 'Beteiligung', 'Gesellschafter']
    > &
      Attribute.Required;
    since: Attribute.Date & Attribute.Required;
    upto: Attribute.Date;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'person-network.netzwerk-der-person': PersonNetworkNetzwerkDerPerson;
      'related-docs.related-docs': RelatedDocsRelatedDocs;
      'network-companies.verbundene-unternehmen': NetworkCompaniesVerbundeneUnternehmen;
      'network-persons.verbundene-personen': NetworkPersonsVerbundenePersonen;
      'lei-history.lei-history': LeiHistoryLeiHistory;
      'companies-further-names.vorherige-namen': CompaniesFurtherNamesVorherigeNamen;
      'externals.externals': ExternalsExternals;
    }
  }
}
