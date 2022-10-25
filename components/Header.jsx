/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { BiMenuAltLeft } from "react-icons/bi"
import { ImLocation } from "react-icons/im"
import { FiSearch, FiHeart } from "react-icons/fi"
import { BsBag } from "react-icons/bs"
import GithubDropdown from "./GithubDropdown"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Menu from "./Menu"
import Bag from "./Bag"
import Headroom from "react-headroom"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useStateContext } from "../context/StateContext"

const items = [
  {
    title: "men",
    links: [
      {
        title: "shoes",
        links: [
          { title: "all men's shoes" },
          { title: "sneakers" },
          { title: "running" },
          { title: "running" },
        ],
      },
    ],
  },
]
const Header = () => {
  const { totalQuantities } = useStateContext()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showBag, setShowBag] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const { data: session } = useSession()

  const ref = useRef()
  useOnClickOutside(ref, () => setOpenSearch(false))
  return (
    <Headroom>
      <header className=" dark:bg-neutral-900 bg-white">
        <nav className="px-4 max-w-7xl mx-auto xl:px-0 flex gap-3 iphone:gap-5 items-center h-[70px] md:h-[90px] justify-between">
          <div className="flex items-center gap-3 iphone:gap-6 md:hidden">
            <div className="md:hidden">
              <BiMenuAltLeft onClick={() => setOpen(true)} size={30} />
              <Menu open={open} setOpen={setOpen} />
            </div>
            <div className="flex flex-1 md:hidden">
              <ImLocation className="" size={22} />
            </div>
          </div>
          {/* logo */}
          <Link href={`/`}>
            <a className=" w-full sm:max-w-sm md:max-w-fit flex translate-x-7 md:translate-x-4 xl:translate-x-0 justify-center xl:ml-0 ">
              <img
                src="/logo.png"
                className="w-14 md:w-20 dark:invert"
                alt=""
              />
            </a>
          </Link>
          <ul className="md:flex flex-1 hidden text-sm xl:text-base uppercase tracking-widest">
            <li className="font-bold opacity-90">
              <Link href={`/men`}>
                <a
                  href=""
                  className={`${
                    router.asPath === "/men" && "bg-neutral-200"
                  } px-4 py-1 rounded`}
                >
                  Men
                </a>
              </Link>
            </li>
            <li className="font-bold opacity-90">
              <Link href={`/women`}>
                <a
                  href=""
                  className={`${
                    router.asPath === "/women" && "bg-neutral-200"
                  } px-4 py-1 rounded`}
                >
                  Women
                </a>
              </Link>
            </li>
            <li className="font-bold opacity-90">
              <Link href={`/kids`}>
                <a
                  href=""
                  className={`${
                    router.asPath === "/kids" && "bg-neutral-200"
                  } px-4 py-1 rounded`}
                >
                  Kids
                </a>
              </Link>
            </li>
            <li className="opacity-70">
              <Link href={`/gifts`}>
                <a
                  href=""
                  className={`${
                    router.asPath === "/gifts" && "bg-neutral-200"
                  } px-4 py-1 rounded`}
                >
                  Gifts
                </a>
              </Link>
            </li>
            <li className="opacity-70 hidden xl:block">
              <Link href={`/sale`}>
                <a
                  href=""
                  className={`${
                    router.asPath === "/sale" && "bg-neutral-200"
                  } px-4 py-1 rounded`}
                >
                  Sale
                </a>
              </Link>
            </li>
            <li className="opacity-70">
              <Link href={`/stripe-life`}>
                <a
                  href=""
                  className={`${
                    router.asPath === "/stripe-life" && "bg-neutral-200"
                  } px-4 py-1 rounded`}
                >
                  Stripe Life
                </a>
              </Link>
            </li>
          </ul>
          <div className="hidden lg:flex relative">
            <input
              type="search"
              placeholder="Search"
              className="py-2 px-4 translate-x-4 dark:bg-neutral-800 dark:border-none dark:text-white rounded-full border "
            />
            <FiSearch
              size={24}
              className="absolute right-0 top-1/2 -translate-y-1/2 "
            />
          </div>
          <div className="h-full flex items-center lg:hidden ">
            <FiSearch onClick={() => setOpenSearch(true)} size={24} />
            <div
              ref={ref}
              className={` absolute opacity-0 right-0 left-0 pointer-events-none bg-white dark:bg-neutral-900 px-4 flex items-center h-[70px] top-0 md:h-[90px] ${
                openSearch && "opacity-100 pointer-events-auto"
              } transition-opacity  duration-300 z-10`}
            >
              <input
                type="search"
                placeholder="Search"
                className="py-2 px-12 rounded-full w-full dark:bg-neutral-800 border"
              />
              <FiSearch size={22} className="absolute left-7 opacity-60" />
              <XMarkIcon
                onClick={() => setOpenSearch(false)}
                className="h-7 w-7 absolute right-6 opacity-60"
                aria-hidden="true"
              />
            </div>
          </div>
          <GithubDropdown />
          {session && <FiHeart className="hidden lg:block" size={23} />}
          <div className="relative">
            <BsBag
              onClick={() => setShowBag(true)}
              size={23}
              className="flex-shrink-0"
            />
            <div className="absolute text-xs rounded-full w-4 h-4 bg-red-500 text-white font-bold grid place-items-center -translate-y-2 -translate-x-1">{totalQuantities}</div>
            <Bag open={showBag} setOpen={setShowBag} />
          </div>
        </nav>
      </header>
    </Headroom>
  )
}

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener("mousedown", listener)
      document.addEventListener("touchstart", listener)

      return () => {
        document.removeEventListener("mousedown", listener)
        document.removeEventListener("touchstart", listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

export default Header
