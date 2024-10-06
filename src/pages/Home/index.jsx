import React from 'react';

import {
  Card,
  Page,
} from '@/components/elements';

import { links } from './data';
import { i18n } from './i18n';
import styles from './styles.module.css';

export default function Home({ setPage }) {
    const userData = localStorage.getItem("userData") || {}
    return (
        <Page name={i18n.title} back={false}>
            {userData["1571128517445"] == "10361" || true ? (
                <div className={styles.container}>
                    {links.map((page) => (
                        <Card page={page} key={page.link} />
                    ))}
                </div>
            ) : (
                <p className="message text-red-600">{i18n.forbidden}</p>
            )}
        </Page>
        // <div className={styles.container}>
        //     {pages.map((page) => (
        //         <Card page={page} setPage={setPage} key={page.name} />
        //     ))}
        // </div>
    )
}
