import App from "../App";
import Header from "./Header";
import Footer from "./Footer";
function AppLayout({ children }) {
  return (
    <>
      <Header  name="Rahul" />
      {children}
      <Footer />
    </>
  );
}
export default AppLayout;
