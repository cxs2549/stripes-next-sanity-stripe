import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"

import { AiFillCaretDown, AiOutlineUser } from "react-icons/ai"
import { useSession, signIn, signOut } from "next-auth/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Example() {
  const { data: session } = useSession()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center py-2 text-sm font-medium  items-center">
          <AiOutlineUser size={24} />
          <AiFillCaretDown size={12} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-48 origin-top-right rounded-md overflow-hidden bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={session ? () => signOut() : () => signIn()}
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 dark:bg-neutral-600 text-gray-900 dark:text-neutral-200"
                      : "text-gray-700 dark:text-gray-100",
                    "block px-4 py-2 text-sm focus:outline-none"
                  )}
                >
                  {session ? "Sign out" : "Sign in"}
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 dark:bg-neutral-600 text-gray-900 dark:text-neutral-200"
                      : "text-gray-700 dark:text-gray-100",
                    "block px-4 py-2 pb-3 text-sm"
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
