import React from 'react';
import { Link } from 'react-router';

import MdMailOutline from 'react-icons/lib/md/mail-outline';
import TiHome from 'react-icons/lib/ti/home';
import MdNotificationsNone from 'react-icons/lib/md/notifications-none';
import TiSocialTwitter from 'react-icons/lib/ti/social-twitter';

import styles from './Header.css';

function Header() {
  return (
    <header className={styles.header}>

      <nav role="navigation" className={styles.navigation}>
        <Link to="/" className={styles.link}>
          <strong><TiHome className={styles.icon} /> Inicio</strong>
        </Link>
        <Link to="/" className={styles.link}>
          <strong><MdNotificationsNone className={styles.icon} /> Notificaciones</strong>
        </Link>
        <Link to="/" className={styles.link}>
          <strong><MdMailOutline className={styles.icon} /> Mensajes </strong>
        </Link>
          <TiSocialTwitter className={styles.twitterIcon} />
      </nav>
    </header>
  );
}

export default Header;
