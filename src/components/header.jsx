import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad } from '@fortawesome/free-solid-svg-icons';

import styles from './header.css';

export const Header = () => (
  <header className={styles.root}>
    <h1>
      <div>
        <FontAwesomeIcon icon={faRoad} size="2x" />
      </div>

      <div>React Electron Boilerplate</div>
    </h1>

    <p>by Joseph Morse</p>
  </header>
);
