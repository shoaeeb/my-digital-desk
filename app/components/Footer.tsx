import { LogoSvg } from "../constants/constants";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerContainer}>
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <LogoSvg size={"30px"} />
            <h4>My Digital Desk</h4>
          </div>
          <p>
            Simple Tools For Complex Mind. Organize your
            <span> digital life</span>
          </p>
        </div>
        <div className={styles.rightSection}>
          <table>
            <th>Product</th>
            <th>Company</th>
            <th>Support</th>

            <tr>
              <td>Features</td>
              <td>About</td>
              <td>Help Center</td>
            </tr>
            <tr>
              <td>Pricing</td>
              <td>Blog</td>
              <td>Privacy</td>
            </tr>
            <tr>
              <td>Testimonials</td>
              <td>Careers</td>
              <td>Terms</td>
            </tr>
          </table>
        </div>
      </div>
      <p className={styles.rights}>
        {" "}
        &copy; {new Date().getFullYear()}{" "}
        <span className={styles.text}>All Rights Reserved</span>{" "}
      </p>
    </div>
  );
};

export default Footer;
