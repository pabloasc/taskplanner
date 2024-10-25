'use client';

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface ToastProps {
  show: boolean;
  message: string;
}

export function Toast({ show, message }: ToastProps) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 shadow-lg border border-green-100 dark:border-green-800 flex items-center space-x-2">
          <CheckCircleIcon className="h-5 w-5 text-green-400 dark:text-green-300" />
          <p className="text-sm font-medium text-green-800 dark:text-green-100">{message}</p>
        </div>
      </div>
    </Transition>
  );
}