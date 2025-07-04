import { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSearchParams } from 'react-router-dom';

type Props = {
  page: number;
  totalPage: number;
};
const PageContainer: React.FC<Props> = ({ page, totalPage }) => {
  const [currentPage, setPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPageArray = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handleIncrement = () => {
    if (currentPage < totalPage) {
      setPage((prev) => prev + 1);
      setSearchParams({ page: (currentPage + 1).toString() });
    }
  };
  const handleDecrement = () => {
    if (currentPage > 1) {
      setPage((prev) => prev - 1);
      setSearchParams({ page: (currentPage - 1).toString() });
    }
  };

  const handleSetPage = (n: number) => {
    setPage(n);
    setSearchParams({ page: n.toString() });
  };

  const pageQuery = searchParams.get('page');
  useEffect(() => {
    if (pageQuery) {
      const p = parseInt(pageQuery, 10);
      setPage(p);
    }
  }, [pageQuery]);

  return (
    <Wrapper>
      <button className='prev-btn' onClick={handleDecrement}>
        Prev
      </button>

      <div className='btn-container'>
        {totalPageArray.map((n) => {
          return (
            <button
              onClick={() => handleSetPage(n)}
              key={n}
              className={`page-btn btn ${currentPage === n ? 'active' : ''}`}
            >
              {' '}
              {n}{' '}
            </button>
          );
        })}
      </div>

      <button className='prev-btn' onClick={handleIncrement}>
        Next
      </button>
    </Wrapper>
  );
};
export default PageContainer;
