// libraries
import React from 'react';
import Fade from 'react-reveal/Fade';

// styles
import styles from './styles.module.sass';

// components
import PageLoading from '@/components/common/PageLoading';

const index = ({ isConnected, pageLoading, profile }) => {
  return (
    <Fade duration={1000}>
      <div className={styles.call_sync}>
        {pageLoading && !profile ? (
          <div className={styles.loading}>
            <PageLoading />
          </div>
        ) : (
          <>
            <h3>Synchronize with your Google Calendar</h3>
            <div className={styles.calendar}>
              <img src='/img/google-calendar.svg' alt='' />
              <a
                href={
                  !isConnected
                    ? `https://cal.lynq.app/?uid=${profile && profile.id}`
                    : `https://cal.lynq.app/disconnect?uid=${
                        profile && profile.id
                      }`
                }
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </a>
            </div>
            <span className={styles.btm_txt}>
              Appointments made in Lynq should be edited in Lynq; The system
              will not recognize changes made in outside calendars. Events
              synced into Lynq from outside calendars must be edited in the
              outside calendar ; they cannot be edited in Lynq.
            </span>
          </>
        )}
      </div>
    </Fade>
  );
};

export default index;
