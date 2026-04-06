import Layout from "@/components/basics/Layout";
import DetailPage from "@/components/pagetypes/DetailPage";
import { ConnectionFailFullSite } from "@/components/errors/ConnectionFailFullSite";
import { useEffect } from "react";
import { fetcher, germanDate } from "@/helpers/helpScripts";
import style from "@/layout/LEIReports.module.sass";
import Link from "next/link";
import Alert from "@/components/basics/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

const LEIDetail = ({ item, network }) => {
  useEffect(() => {
    if (!item || !network) {
      setTimeout(() => {
        window.location.reload();
      }, 120000);
    }
  }, [item, network]);

  if (!item || !network) {
    return <ConnectionFailFullSite />;
  }

  const year = new Date().getFullYear();
  const auto_last_renewal = new Date(item.attributes.first_registration);
  auto_last_renewal.setFullYear(year);
  const auto_next_renewal = new Date(item.attributes.first_registration);
  auto_next_renewal.setFullYear(year + 1);

  return (
    <Layout siteTitle={"LEI " + item.attributes.identifier}>
      <DetailPage
        title={"Legal Entitiy Identifier " + item.attributes.identifier}
        contentType="lei"
        noBreadcrumb="true"
      >
        <section id="leireg" className="detailSection">
          <h4 className="mb-3 sectionLabel">Legal Entitiy Identifier</h4>
          <div className={style.leiDetail}>
            <div className={style.leiDetailTitle}>LEI</div>
            <div className={style.leiDetailData}>
              {item.attributes.identifier}
            </div>
          </div>
          {item.attributes.lei_status ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>LEI Status</div>
              <div className={style.leiDetailData}>
                {item.attributes.lei_status}
              </div>
            </div>
          ) : (
            ""
          )}
          {item.attributes.lou ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>LEI Vergabestelle</div>
              <div className={style.leiDetailData}>{item.attributes.lou}</div>
            </div>
          ) : (
            ""
          )}
          {item.attributes.first_registration ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Erstvergabe</div>
              <div className={style.leiDetailData}>
                {germanDate(item.attributes.first_registration)}
              </div>
            </div>
          ) : (
            ""
          )}
          {item.attributes.auto_renew == true ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Letzte Verlängerung</div>
              <div className={style.leiDetailData}>
                {germanDate(auto_last_renewal)}
              </div>
            </div>
          ) : item.attributes.auto_renew !== true &&
            item.attributes.last_renewal !== null ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Letzte Verlängerung</div>
              <div className={style.leiDetailData}>
                {germanDate(item.attributes.last_renewal)}
              </div>
            </div>
          ) : (
            ""
          )}
          {item.attributes.auto_renew == true ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Nächste Verlängerung</div>
              <div className={style.leiDetailData}>
                {germanDate(auto_next_renewal)}
              </div>
            </div>
          ) : (
            ""
          )}
        </section>

        <section id="companyreg" className="detailSection">
          <h4 className="mb-3 sectionLabel">Unternehmensdaten</h4>
          {item.attributes.company.data !== null ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Firmenname</div>
              <div className={style.leiDetailData}>
                <Link
                  className="inlineLink"
                  href={
                    "/companies/" +
                    item.attributes.company.data.attributes.pageslug
                  }
                >
                  {item.attributes.company.data.attributes.company_name}
                </Link>
              </div>
            </div>
          ) : (
            <Alert theme="warning">
              Mit diesem Legal Entitiy Identifier ist kein Unternehmen
              verbunden.
            </Alert>
          )}
          {item.attributes.company.data !== null &&
          item.attributes.company.data.attributes.legal_form !== null ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Rechtsform</div>
              <div className={style.leiDetailData}>
                {item.attributes.company.data.attributes.legal_form}
              </div>
            </div>
          ) : (
            ""
          )}
          {item.attributes.company.data !== null &&
          item.attributes.company.data.attributes.hr_court !== null ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Registergericht</div>
              <div className={style.leiDetailData}>
                {item.attributes.company.data.attributes.hr_court}
              </div>
            </div>
          ) : (
            ""
          )}
          {item.attributes.company.data !== null &&
          item.attributes.company.data.attributes.hr_number !== null ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Registernummer</div>
              <div className={style.leiDetailData}>
                {item.attributes.company.data.attributes.hr_dept +
                  " " +
                  item.attributes.company.data.attributes.hr_number}
              </div>
            </div>
          ) : (
            ""
          )}
          {item.attributes.company.data !== null &&
          item.attributes.company.data.attributes.status !== null ? (
            <div className={style.leiDetail}>
              <div className={style.leiDetailTitle}>Status</div>
              <div className={style.leiDetailData}>
                {item.attributes.company.data.attributes.status}
              </div>
            </div>
          ) : (
            ""
          )}
        </section>
        <section id="mainbranch" className="detailSection">
          <h4 className="mb-3 sectionLabel">
            Juristischer Sitz / Hauptniederlassung
          </h4>
          {item.attributes.company.data.attributes.main_branch.data !== null ? (
            <>
              <div className={style.leiDetail}>
                <div className={style.leiDetailTitle}>Straße, Hausnummer</div>
                <div className={style.leiDetailData}>
                  {item.attributes.company.data.attributes.main_branch.data
                    .attributes.street +
                    " " +
                    item.attributes.company.data.attributes.main_branch.data
                      .attributes.place_number}
                </div>
              </div>
              <div className={style.leiDetail}>
                <div className={style.leiDetailTitle}>PLZ, Ort</div>
                <div className={style.leiDetailData}>
                  {item.attributes.company.data.attributes.main_branch.data
                    .attributes.zip +
                    " " +
                    item.attributes.company.data.attributes.main_branch.data
                      .attributes.city}
                </div>
              </div>
            </>
          ) : (
            <Alert theme="warning">
              Es ist keine Hauptniederlassung hinterlegt.
            </Alert>
          )}
        </section>
        {network.length !== 0 ? (
          <section id="leinetwork" className="detailSection">
            <h4 className="mb-3 sectionLabel">Netzwerk</h4>
            {network.map((relation) =>
              relation.attributes.childCompany.data.attributes.pageslug !=
              item.attributes.company.data.attributes.pageslug ? (
                <Link
                  href={
                    relation.attributes.childCompany.data.attributes.lei
                      .data !== null
                      ? "/lei/" +
                        relation.attributes.childCompany.data.attributes.lei
                          .data.attributes.identifier
                      : "/companies/" +
                        relation.attributes.childCompany.data.attributes
                          .pageslug
                  }
                >
                  <div
                    className={`${style.networkItem} my-4 rounded-lg`}
                    key={relation.id}
                  >
                    <div
                      className={` ${style.listIcon} flex-none rounded-l-lg`}
                    >
                      <FontAwesomeIcon icon={faBuilding} size="lg" />
                    </div>
                    <div className={`${style.listContent} flex-auto`}>
                      <p
                        className={`${style.summary} items-center inline-flex`}
                      >
                        <span>
                          {
                            relation.attributes.childCompany.data.attributes
                              .company_name
                          }
                        </span>
                        <span className={`badge ${style.StatusBadge}`}>
                          Tochtergesellschaft
                        </span>
                      </p>
                      {relation.attributes.childCompany.data.attributes.lei
                        .data !== null ? (
                        <p className={`${style.meta}`}>
                          {
                            relation.attributes.childCompany.data.attributes.lei
                              .data.attributes.identifier
                          }
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
              ) : relation.attributes.parentCompany.data !== null &&
                relation.attributes.parentCompany.data?.attributes.pageslug !=
                  item.attributes.company.data.attributes.pageslug ? (
                <Link
                  href={
                    relation.attributes.parentCompany.data?.attributes.lei
                      .data !== null
                      ? "/lei/" +
                        relation.attributes.parentCompany.data?.attributes.lei
                          .data.attributes.identifier
                      : "/companies/" +
                        relation.attributes.parentCompany.data.attributes
                          .pageslug
                  }
                >
                  <div
                    className={`${style.networkItem} my-4 rounded-lg`}
                    key={relation.id}
                  >
                    <div
                      className={` ${style.listIcon} flex-none rounded-l-lg`}
                    >
                      <div className={style.faIcon}>
                        <FontAwesomeIcon icon={faBuilding} />
                      </div>
                    </div>
                    <div className={`${style.listContent} flex-auto`}>
                      <p
                        className={`${style.summary} items-center inline-flex`}
                      >
                        <span>
                          {
                            relation.attributes.parentCompany.data?.attributes
                              .company_name
                          }
                        </span>
                        <span className={`badge ${style.StatusBadge}`}>
                          Muttergesellschaft
                        </span>
                      </p>
                      {relation.attributes.parentCompany.data?.attributes.lei
                        .data !== null ? (
                        <p className={`${style.meta}`}>
                          {
                            relation.attributes.parentCompany.data?.attributes
                              .lei.data.attributes.identifier
                          }
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                ""
              )
            )}
          </section>
        ) : (
          ""
        )}

        {item.attributes.leiHistory.length > 0 ? (
          <section id="leiHistory" className="detailSection">
            <h4 className="mb-3 sectionLabel">LEI Historie</h4>

            {item.attributes.leiHistory.map((leievent) => (
              <div className={style.leiEvent} key={leievent.id}>
                <div className={style.date}>{germanDate(leievent.date)}</div>
                <div className={`${style.comment}`}>{leievent.details}</div>
              </div>
            ))}
          </section>
        ) : (
          ""
        )}
      </DetailPage>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { leiPageslug } = params;
  try {
    const contentResponse = await fetcher(
      `slugify/slugs/lei/${leiPageslug}`,
      "populate[company][fields][0]=company_name&populate[company][fields][1]=legal_form&populate[company][fields][2]=hr_number&populate[company][fields][3]=hr_dept&populate[company][fields][4]=hr_court&populate[company][fields][5]=status&populate[company][fields][6]=pageslug&populate[company][populate]=main_branch&populate[company][populate]=branches&populate=leiHistory"
    );
    const networkResponse = await fetcher(
      "networks",
      `filters[$or][0][childCompany][lei][identifier][$eq]=${leiPageslug}&filters[$or][1][parentCompany][lei][identifier][$eq]=${leiPageslug}&filters[leiParent][$eq]=true&fields[0]=leiParent&populate[childCompany][fields][0]=company_name&populate[childCompany][fields][2]=pageslug&populate[childCompany][populate][lei][fields][0]=identifier&populate[parentCompany][fields][0]=company_name&populate[parentCompany][fields][1]=pageslug&populate[parentCompany][populate][lei][fields][0]=identifier`
    );
    return {
      props: {
        item: contentResponse.data,
        network: networkResponse.data,
      },
    };
  } catch (error) {
    return {
      props: { item: null, network: null },
    };
  }
}

export default LEIDetail;
