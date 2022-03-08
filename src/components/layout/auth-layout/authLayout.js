import PageContainer from "../page-container";
import PearLogo from "../../../assets/images/pearLogo.svg";
import classes from "./authLayout.module.css";
import PearLogoPattern from "../../../assets/images/pearLogoPattern.svg";

function AuthLayout(props) {
  return (
    <div>
      <PageContainer>
        <div className={classes.formSidebar}>
            {props.children}
        </div>
        <div className={classes.authScreen} style={{ 
      backgroundImage: `url(${PearLogoPattern})` 
    }}>
            <img src={PearLogo} alt="logo"/>
        </div>
      </PageContainer>
    </div>
  );
}

export default AuthLayout;
