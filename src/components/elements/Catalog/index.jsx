import React from "react"
import styles from "./styles.module.css"
import { elements } from "./data.jsx"
import { Navbar, ProjectName } from ".."

export default function Catalog() {
    return (
        <>
            <Navbar />
            <ProjectName name="سوابق پزشکی و دارویی" />
            <main className={styles.main}>
                {elements?.map((element, i) => (
                    <section className={styles.element} key={element.name + i}>
                        <h2 className={styles.elementName}>{element.name}</h2>
                        <div className={styles.elementTypes}>
                            {element.list.map((_, i) => (
                                <div
                                    className={styles.elementType}
                                    key={"type" + i}
                                >
                                    <h3>{_.type}</h3>
                                    {_.element}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </>
    )
}
