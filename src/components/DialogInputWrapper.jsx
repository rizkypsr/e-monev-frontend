import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/solid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dialog, DialogContent, DialogTrigger } from './DialogContent';
import SelectInputModal from './SelectInputModal';
import List from './List';
import ErrorPage from '../views/ErrorPage';

const DialogInputWrapper = ({
  label,
  selectedItem,
  trailingIcon,
  onFetching,
  onSelect,
  onDelete,
  error,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({
    items: [],
    hasMore: true,
    totalPages: 0,
    currentPage: 1,
  });
  const [networkError, setNetworkError] = useState('');

  const authHeader = useRef(useAuthHeader());

  useEffect(() => {
    async function fetchData(page) {
      try {
        const res = await onFetching(authHeader.current, {
          limit: 15,
          page,
        });

        setData((prevData) => ({
          ...prevData,
          items: [...prevData.items, ...res.result],
          totalPages: res.pages,
        }));
      } catch (err) {
        setNetworkError(err.message);
      }
    }

    fetchData(data.currentPage);
  }, [authHeader, data.currentPage, onFetching]);

  const handleSelect = (item) => {
    onSelect(item);
    setOpenDialog(false);
  };

  const loadMoreData = async () => {
    setData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <div className="relative">
        <DialogTrigger className="w-full">
          <SelectInputModal
            selectedValue={selectedItem ?? ''}
            label={`--- Pilih ${label} ---`}
            error={error}
          />
        </DialogTrigger>
        {trailingIcon && (
          <TrashIcon
            className="h-4 w-4 text-red-500 absolute top-2.5 -right-6 cursor-pointer"
            onClick={onDelete}
          />
        )}
      </div>

      <DialogContent className="h-5/6" title={`Pilih ${label}`}>
        {networkError ? (
          <ErrorPage errorMessage={networkError} />
        ) : (
          <>
            <div className="relative my-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </div>
              <input
                type="search"
                id="search"
                className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
                placeholder="Pencarian"
              />
            </div>
            <InfiniteScroll
              dataLength={data.items.length}
              next={loadMoreData}
              hasMore={data.hasMore}
              height={500}
            >
              <List data={data.items} onSelectValue={handleSelect} />
            </InfiniteScroll>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

DialogInputWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  selectedItem: PropTypes.string,
  trailingIcon: PropTypes.bool,
  onFetching: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  error: PropTypes.string,
};

DialogInputWrapper.defaultProps = {
  selectedItem: '',
  trailingIcon: false,
  error: '',
  onSelect: null,
  onDelete: null,
};

export default DialogInputWrapper;
