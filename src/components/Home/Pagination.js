import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({
    recipesPerPage,
    totalRecipes,
    paginate,
    scrollToTop,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    const changePage = (number) => {
        scrollToTop();
        setCurrentPage(number);
        paginate(number);
    };

    return (
        <div className="pagination">
            {pageNumbers.map((number) => (
                <Link
                    to="#"
                    onClick={() => changePage(number)}
                    className={`page-link ${
                        currentPage === number ? 'active' : ''
                    }`}
                >
                    {number}
                </Link>
            ))}
        </div>
    );
};

export default Pagination;
