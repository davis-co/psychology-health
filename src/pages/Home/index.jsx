import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { PageCard, Page } from "react-elements-davis";
import { links } from "./data";
import { i18n } from "./i18n";

export default function Home({ setPage }) {
  const navigate = useNavigate();
  //const userData = localStorage.getItem("userData") || {};
  //   return (
  //     <Page name={"صفحه اصلی"} back={false}>
  //       {userData["1571128517445"] == "10361" || true ? (
  //         <div className={classNames("router-page")}>
  //           {links.map((page) => (
  //             <PageCard page={page} key={page.link} />
  //           ))}
  //         </div>
  //       ) : (
  //         <p className="message text-red-600">{i18n.forbidden}</p>
  //       )}
  //     </Page>
  //   );
  return <Page router routes={links} navigate={navigate} />;
}
