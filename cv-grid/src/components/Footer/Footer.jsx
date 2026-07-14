import { Link } from "react-router-dom";
import { footerContent, footerNavigation } from "../../data/navigationData";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
        <div>
            <strong>{footerContent.brand}</strong>
            <p>{footerContent.tagline}</p>
        </div>
        <nav aria-label="Footer navigation">
            {footerNavigation.map(({ label, to }) => (
            <Link key={to} to={to}>
                {label}
            </Link>
            ))}
        </nav>
        </footer>
    );
}

export default Footer;
