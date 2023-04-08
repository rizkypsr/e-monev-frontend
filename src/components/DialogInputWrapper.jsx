import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dialog, DialogContent, DialogTrigger } from './DialogContent';
import SelectInputModal from './SelectInputModal';
import List from './List';
import ErrorPage from '../views/ErrorPage';

export default function DialogInputWrapper({
  name,
  label,
  onFetching,
  onSelect,
  error,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({
    items: [],
    selectedItem: {},
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

  const handleSelect = (item, propName) => {
    setData((prevData) => ({
      ...prevData,
      selectedItem: {
        value: item.id,
        label: item.title,
      },
    }));
    onSelect(item, propName);
    setOpenDialog(false);
  };

  const loadMoreData = async () => {
    setData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  return (
    <div className="mb-3">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="w-full">
          <SelectInputModal
            selectedValue={data.selectedItem.label}
            label={`--- Pilih ${label} ---`}
            error={error}
          />
        </DialogTrigger>

        <DialogContent title={`Pilih ${label}`}>
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
                <List
                  name={name}
                  data={data.items}
                  onSelectValue={handleSelect}
                />
              </InfiniteScroll>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

DialogInputWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onFetching: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  error: PropTypes.string,
};

DialogInputWrapper.defaultProps = {
  error: '',
};
