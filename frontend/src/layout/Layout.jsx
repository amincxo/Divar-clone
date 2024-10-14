import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from "./Layout.module.css"

function Layout({children}) {
  return (
    <>
        <Header />
        <main className={styles.main} >
            {children}
        </main>
        <Footer />
    </>
  )
}

export default Layout