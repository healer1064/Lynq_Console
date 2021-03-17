import "../styles/main.sass";

import { ProfileProvider } from "../context/profile";

function MyApp({ Component, pageProps }) {
  return (
    <ProfileProvider>
      <Component {...pageProps} />;
    </ProfileProvider>
  );
}

export default MyApp;
