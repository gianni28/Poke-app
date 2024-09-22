import React from "react";
import './index.css'; 

const Paginated = ({ page, setPage, total }) => {
    const handlePrevious = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < total) {
            setPage(page + 1);
        }
    };

    return (
        <div className="pagination">
            <button className="pagination-btn" onClick={handlePrevious} disabled={page === 0}>
                &larr; Previous
            </button>
            <span className="pagination-info">
                Page {page + 1} of {Math.ceil(total)}
            </span>
            <button className="pagination-btn" onClick={handleNext} disabled={page >= total - 1}>
                Next &rarr;
            </button>
        </div>
    );
};

export default Paginated;
