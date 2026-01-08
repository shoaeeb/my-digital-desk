import Image from "next/image";
import styles from "./review.module.css";
import { IoStarSharp } from "react-icons/io5";

// review 1 picture
//https://lh3.googleusercontent.com/aida-public/AB6AXuCiG6atZUkoThXEPNMImKLByv3x14tcYLz0NCYMNhqJMlKz-zvWZ5wmFVfuQe5ZLdSxFg4jBTqjIcfCvraiUDhYbIAv-2iDk8jVrGehoodwx6y2vemmBfmfdkeXoK5vdtiKGipoKnqDF-ojLGdRukfclrXFRkkbZ0Q0QI1cK0Cqmq-CHdtTVzrdMTfu7Hm04PvqcJ-ZhHQcZIyUslqY3ndbB0MnhXKk6-2DElRq9-XwALvTGT38OuAIF6_8-NfJ8HnXtFsazzUhd6rv
//review 2 picture
//https://lh3.googleusercontent.com/aida-public/AB6AXuAkwx42KvsSP0nL8eOmthpQGMgtSyfw_yrL2kMBrxQHpHcUMoOfcXhO5enjxHi9pdHQm4UtU6FSkyHiS4xZfmesM0OAalE5T8gi9AHWHQ4ufwSgviKsr1BQwWRF0OsC-yGOJ9NWdjdGebt6Gi-D9D1we5U6JhVF8oRUqJCCI_BSiOM7LlKtIEQqtkTpmXmICD1QMN0QWfaqhqByQrNkTOt3ukXVrJEI-oPxR21wnZGaV8VtTiYvAHGbG7lnA-TPzPdZaElcbsehy8sW
//review 3 picture
//https://lh3.googleusercontent.com/aida-public/AB6AXuCH-TL9uj7eCGe7bkU53hPGjzNzbHDPyHYLm52W6L8Uce_s5938SwmFZZsMMnCnTGuodsCTu9Kqq-xiZqTFJaXFz2VmnuP62tq3ZS_8XsCASqXhIuyJmbfJanAY8eZGdSyqAMTKVe70uhgBU_vVEIlgZNtkv_PKJuS_id-8VIlxAJqgiNCM--RMn4EKJu0tJsM1bOb4Gqu9e0bx51geYM4eKEGQUaY_X6xmfgl0tTqw2JfnEI4yMTO9ALn2-iWL0sdJS20Y7_wcAiAA
const ReviewSection = () => {
  return (
    <div className={styles.reviewSection}>
      <div className={styles.topSection}>
        <h2>
          Loved By Productivity,<span>Enthusiasts</span>
        </h2>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.review}>
          <div className={styles.header}>
            <Image
              className={styles.profilePic}
              alt="review 1 profile picture"
              height={100}
              width={100}
              src={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCiG6atZUkoThXEPNMImKLByv3x14tcYLz0NCYMNhqJMlKz-zvWZ5wmFVfuQe5ZLdSxFg4jBTqjIcfCvraiUDhYbIAv-2iDk8jVrGehoodwx6y2vemmBfmfdkeXoK5vdtiKGipoKnqDF-ojLGdRukfclrXFRkkbZ0Q0QI1cK0Cqmq-CHdtTVzrdMTfu7Hm04PvqcJ-ZhHQcZIyUslqY3ndbB0MnhXKk6-2DElRq9-XwALvTGT38OuAIF6_8-NfJ8HnXtFsazzUhd6rv"
              }
            />
            <div className={styles.info}>
              <h5>Sarah J.</h5>
              <p>Creative Director</p>
            </div>
          </div>
          <div className={styles.comment}>
            <p>
              "Finally a notes app that doesn't feel cluttered. I love"
              <span> the simplicity and how fast i can find my ideas."</span>
            </p>
          </div>
          <ReviewStars />
        </div>
        <div className={styles.review}>
          <div className={styles.header}>
            <Image
              className={styles.profilePic}
              alt="review 2 profile picture"
              height={100}
              width={100}
              src={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAkwx42KvsSP0nL8eOmthpQGMgtSyfw_yrL2kMBrxQHpHcUMoOfcXhO5enjxHi9pdHQm4UtU6FSkyHiS4xZfmesM0OAalE5T8gi9AHWHQ4ufwSgviKsr1BQwWRF0OsC-yGOJ9NWdjdGebt6Gi-D9D1we5U6JhVF8oRUqJCCI_BSiOM7LlKtIEQqtkTpmXmICD1QMN0QWfaqhqByQrNkTOt3ukXVrJEI-oPxR21wnZGaV8VtTiYvAHGbG7lnA-TPzPdZaElcbsehy8sW"
              }
            />
            <div className={styles.info}>
              <h5>Mark T.</h5>
              <p>Freelancer</p>
            </div>
          </div>
          <div className={styles.comment}>
            <p>
              "The Categories feature changed how i manage my
              <span>
                freelance projects. It's the perfect balance of features
              </span>
              <span>and clean design"</span>
            </p>
          </div>
          <ReviewStars />
        </div>
        <div className={styles.review}>
          <div className={styles.header}>
            <Image
              className={styles.profilePic}
              alt="review 3 profile picture"
              height={100}
              width={100}
              src={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCH-TL9uj7eCGe7bkU53hPGjzNzbHDPyHYLm52W6L8Uce_s5938SwmFZZsMMnCnTGuodsCTu9Kqq-xiZqTFJaXFz2VmnuP62tq3ZS_8XsCASqXhIuyJmbfJanAY8eZGdSyqAMTKVe70uhgBU_vVEIlgZNtkv_PKJuS_id-8VIlxAJqgiNCM--RMn4EKJu0tJsM1bOb4Gqu9e0bx51geYM4eKEGQUaY_X6xmfgl0tTqw2JfnEI4yMTO9ALn2-iWL0sdJS20Y7_wcAiAA"
              }
            />
            <div className={styles.info}>
              <h5>Elena R.</h5>
              <p>Writer</p>
            </div>
          </div>
          <div className={styles.comment}>
            <p>
              "Clean,fast and exactly what i needed for my daily
              <span>journaling. The focus mode is a game changer for</span>
              <span>me"</span>
            </p>
          </div>
          <ReviewStars />
        </div>
      </div>
    </div>
  );
};

const ReviewStars = () => {
  const numberOfStars = 5;
  return (
    <div className={styles.stars}>
      {Array.from({ length: numberOfStars }, (_, index) => (
        <IoStarSharp className={styles.starIcon} key={index} />
      ))}
    </div>
  );
};
export default ReviewSection;
