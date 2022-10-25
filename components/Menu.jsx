/* eslint-disable @next/next/no-img-element */
import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import {IoMdClose} from 'react-icons/io'

function MyDialog({ open, setOpen }) {
  const router = useRouter()
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => setOpen(false)} className="md:hidden">
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 z-40" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 -translate-x-full "
          enterTo="opacity-100 translate-x-0 "
          leave="ease-in duration-200"
          leaveFrom="opacity-100  translate-x-0"
          leaveTo="opacity-0 -translate-x-full "
        >
          <div className="fixed inset-0 h-full z-50 overflow-y-auto bg-transparent">
            <Dialog.Panel className={`bg-white dark:bg-neutral-900 h-full max-w-sm`}>
              <div className="absolute left-6 top-4">
                <IoMdClose size={30} onClick={() => setOpen(false)} />
              </div>
              <div className="flex justify-center items-center h-[70px]">
                <img src="/logo.png" className="w-14 dark:invert" alt="" />
              </div>
              <ul className="border-b">
                <li className="hover:bg-neutral-200 py-4 px-7 font-bold text-lg uppercase tracking-wider">
                  <Link href={`/men`}>
                    <a onClick={() => setOpen(false)} href="" className="w-full block focus:outline-none">Men</a>
                  </Link>
                </li>
                <li className=" py-4 hover:bg-neutral-200 px-7 font-bold text-lg uppercase tracking-wider">
                <Link href={`/women`}>
                    <a onClick={() => setOpen(false)} href="" className="w-full block">Women</a>
                  </Link>
                </li>
                <li className=" py-4 hover:bg-neutral-200 px-7 font-bold text-lg uppercase tracking-wider">
                <Link href={`/kids`}>
                    <a onClick={() => setOpen(false)} href="" className="w-full block">Kids</a>
                  </Link>
                </li>
                <li className=" hover:bg-neutral-200">
                  <Link href={`/gifts`}>
                    <a
                      href=""
                      className={`${
                        router.asPath === "/gifts" && "bg-neutral-200"
                      } py-4 px-7 tracking-wider block rounded uppercase text-lg opacity-70`}
                    >
                      Gifts
                    </a>
                  </Link>
                </li>
                <li className=" hover:bg-neutral-200">
                  <Link href={`/sale`}>
                    <a
                      href=""
                      className={`${
                        router.asPath === "/sale" && "bg-neutral-200"
                      } py-4 px-7 tracking-wider block rounded uppercase text-lg opacity-70`}
                    >
                      sale
                    </a>
                  </Link>
                </li>
                <li className=" hover:bg-neutral-200">
                  <Link href={`/stripe-life`}>
                    <a
                      href=""
                      className={`${
                        router.asPath === "/stripe-life" && "bg-neutral-200"
                      } py-4 px-7 tracking-wider block rounded uppercase text-lg opacity-70`}
                    >
                      stripe life
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="px-8 py-4 cursor-pointer hover:bg-neutral-200">My Account</li>
                <li className="px-8 py-4 cursor-pointer hover:bg-neutral-200">Exchanges & Returns</li>
                <li className="px-8 py-4 cursor-pointer hover:bg-neutral-200">Order Tracker</li>
                <li className="px-8 py-4 cursor-pointer hover:bg-neutral-200">Gift Cards</li>
                <li className="px-8 py-4 cursor-pointer hover:bg-neutral-200">Store Locator</li>
                <li className="px-8 py-4 cursor-pointer hover:bg-neutral-200">Mobile Apps</li>
              </ul>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
export default MyDialog
