import { Dialog, Transition } from '@headlessui/react';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ThreeDot from './ThreeDot';

const DropdownDialog = ({
  name,
  label,
  data,
  value,
  //   maxWidth = 'max-w-md',
  onChange,
  onChangeV2,
  onDelete,
  error,
  children,
  onBottom,
  hasNextPage,
  isFetchingNextPage,
  enableSearch = false,
  searchValue,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      onBottom();
    }
  }, [inView]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onHandleSelect = (newValue) => {
    if (onChange) onChange(name, newValue);

    onChangeV2(name, newValue);
    closeModal();
  };

  return (
    <div className="text-sm w-full">
      <div className={`bg-white ${onDelete && 'flex items-center space-x-3'}`}>
        <div
          onClick={openModal}
          className="flex flex-grow border cursor-pointer justify-between border-dark-gray rounded-lg px-4 py-3 leading-4 text-dark-gray capitalize items-center space-x-3"
        >
          <div>{value?.title || value?.name || `--- ${label} ---`}</div>
          <ChevronDownIcon className="w-3 h-3" />
        </div>

        {onDelete && (
          <TrashIcon
            className="h-4 w-4 text-red-500 top-2.5 -right-6 cursor-pointer"
            onClick={onDelete}
          />
        )}
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] w-full max-w-md h-[40rem] transform rounded-2xl bg-white overflow-y-auto p-6 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-6 flex items-center justify-between"
                  >
                    <div>{label}</div>
                    <div>{children}</div>
                  </Dialog.Title>

                  {enableSearch && (
                    <div className="mb-6">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Cari..."
                        value={searchValue}
                        onChange={(e) => onSearch(e.target.value)}
                      />
                    </div>
                  )}

                  {data?.pages?.map((page, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      {page?.data?.result
                        ? page.data.result.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => onHandleSelect(item)}
                              className="cursor-pointer w-full py-3 text-left border-b border-[#E0E0E0] capitalize"
                            >
                              {item.title || item.name}
                            </div>
                          ))
                        : page.data.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => onHandleSelect(item)}
                              className="cursor-pointer w-full py-3 text-left border-b border-[#E0E0E0] capitalize"
                            >
                              {item.title || item.name}
                            </div>
                          ))}
                    </div>
                  ))}
                  <div ref={ref} className="mt-6 flex justify-center">
                    {isFetchingNextPage ? (
                      'Loading...'
                    ) : hasNextPage ? (
                      'Loading...'
                    ) : (
                      <ThreeDot />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DropdownDialog;
