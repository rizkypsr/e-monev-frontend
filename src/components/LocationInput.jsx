import { Dialog, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import React, { Fragment } from 'react';
import Location from '../views/shared/Location/Location';

const LocationInput = ({
  name,
  label,
  register,
  setValue,
  disabled,
  error,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    register(name, {
      required: 'Lokasi kegiatan wajib dipilih',
    });
  }, [register, name]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLocationSelect = (data) => {
    setLocation(data);
    setValue(name, JSON.stringify(data));

    closeModal();
  };

  return (
    <div className="text-sm">
      <div className="bg-white">
        <div
          onClick={openModal}
          className="flex flex-grow border cursor-pointer justify-between border-dark-gray rounded-lg px-4 py-3 leading-4 text-dark-gray capitalize items-center space-x-3"
        >
          <div className="truncate">
            {location !== null ? location?.display_name : label}
          </div>
          <ChevronRightIcon className="w-3 h-3" />
        </div>
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
                <Dialog.Panel className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] w-full max-w-7xl h-[45rem] transform rounded-2xl bg-white overflow-y-auto p-6 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-6 flex items-center justify-between"
                  >
                    <div>{label}</div>
                  </Dialog.Title>

                  <Location onSelectMap={handleLocationSelect} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default LocationInput;
