import { Link } from "react-router-dom";

function LinkButton({ onClick, to, text }) {
    const styles = "mt-5 text-2xl bg-mist-900 text-amber-50 px-3 py-1.5 rounded-full hover:bg-mist-500 transition-colors duration-300 ease-in inline-block";
    if (to) {
        return (
            <Link className={styles} to={to}>
                {text}
            </Link>
        );
    }

    return (
        <button className={styles} onClick={onClick}>
            {text}
        </button>
    );
}

export default LinkButton;