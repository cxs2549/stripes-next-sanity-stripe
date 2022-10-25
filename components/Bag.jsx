/* eslint-disable @next/next/no-img-element */
import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useStateContext } from "../context/StateContext"
import { urlFor } from "../lib/client"
import { IoMdClose } from "react-icons/io"
import toast from 'react-hot-toast'
import getStripe from '../lib/getStripe'
function MyDialog({ open, setOpen }) {
  const { cartItems, onRemove, totalPrice } = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    })

    if (response.statusCode === 500) return

    const data = await response.json()
    console.log(data)
    toast.loading("Redirecting...")

    stripe.redirectToCheckout({ sessionId: data.id })
  }
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => setOpen(false)}>
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
          enterFrom="opacity-0  translate-x-full"
          enterTo="opacity-100  translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100  translate-x-0"
          leaveTo="opacity-0  translate-x-full"
        >
          <div className="fixed right-0 bottom-0 top-0 overflow-y-auto min-w-[340px] z-50">
            <Dialog.Panel className={`bg-white dark:bg-neutral-900 px-4  h-full max-w-sm`}>
              <Dialog.Title
                className={` h-[70px] flex items-center justify-between mb-8`}
              >
                <h2 className="text-3xl font-extrabold tracking-tighter">
                  Your bag {cartItems.length < 1 && "is empty."}
                </h2>
                <IoMdClose onClick={() => setOpen(false)} size={24} />
              </Dialog.Title>

              <div className="flex flex-col gap-3">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 border-b dark:border-neutral-700 pb-5">
                    <img
                      src={urlFor(item.image)}
                      alt="image"
                      className="w-28 rounded-lg"
                    />
                    <div className="flex justify-between w-full gap-8">
                      <div className=" flex flex-col justify-between">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-200">
                          Size XS
                        </p>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-200">Qty 1</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <p className="font-medium">${item.price}.00</p>
                        <button
                          onClick={() => onRemove(item)}
                          className="text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
            <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-base font-medium mb-5">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200 dark:divide-neutral-600">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="">Subtotal</dt>
                    <dd className="font-medium">${totalPrice}.00</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="">Shipping</dt>
                    <dd className="font-medium">$5.00</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="">Tax</dt>
                    <dd className="font-medium">$8.32</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-medium ">Order total</dt>
                    <dd className="text-base font-medium ">${totalPrice + 5 + 8.32}</dd>
                  </div>
                </dl>
              </div>
            <div className="mt-10">
              <button
                onClick={handleCheckout}
                type="submit"
                className="w-full bg-indigo-600 dark:bg-white dark:text-black border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout with Stripe
              </button>
            </div>
            <div className="mt-6 text-sm text-center ">
              <p>
                or{' '}
                <a href="#" className=" font-medium hover:text-indigo-500">
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
            </div>

          </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
export default MyDialog
