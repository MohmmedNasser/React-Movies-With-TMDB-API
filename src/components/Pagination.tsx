import { Button } from "./ui/button";

interface PaginationProps {
    activePage: number;
    totalPages: number;
    setActivePage: (number: number) => void;
}

const Pagination = ({
    activePage,
    totalPages,
    setActivePage,
}: PaginationProps) => {
    const handlePrev = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };

    const handleNext = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (activePage < totalPages) {
            setActivePage(activePage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={activePage === 1}
                >
                    Prev
                </Button>
                <Button
                    variant="outline"
                    onClick={handleNext}
                    disabled={activePage === totalPages}
                >
                    Next
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <p>{activePage}</p>
                <p>of</p>
                <p>{totalPages}</p>
            </div>
        </div>
    );
};

export default Pagination;
