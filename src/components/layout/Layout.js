import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div className="layoutContainer">
      <MainNavigation />
      <div className="wrapper">
        <main className={classes.main}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
