/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import React from "react"
import { client, urlFor } from "../lib/client"
import Container from "../components/Container"

const Products = ({ products, slug }) => {
  return (
    <Container>
      <div className="px-4 xl:px-0 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold uppercase pt-4 pb-5 tracking-wider">
          {slug}
        </h2>
        <div className="flex overflow-x-auto w-full gap-2 no-scrollbar snap-mandatory snap-x pb-12">
          {products.map((product, i) => (
            <Link href={`/product/${product.slug}`} key={i}>
              <div
                key={i}
                className="snap-start flex-1 group min-w-[250px] cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={urlFor(product.image)}
                    alt=""
                    className="rounded-lg"
                  />
                  <div className="absolute transition-transform duration-200 cursor-pointer group-hover:-translate-y-2 left-2 px-1 text-xs font-medium dark:bg-neutral-800 dark:text-white bg-white bottom-0">
                    <span>${product.price}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium font-mono">
                    {product.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* stripe life banner */}
        <div className=" border-t py-12 lg:flex gap-8 xl:justify-center">
          <h2 className="text-4xl font-extrabold tracking-tighter xl:max-w-xl">
            Join Stripe Life for exclusive access to major weekly sales
          </h2>
          <div>
            <p className="mt-4 lg:mt-3 mb-8 lg:max-w-xl">
              Stripe Life takes your shoe addiction to the next level with
              coupon codes that will make your head spin. Join now and get 15%
              off your next purchase.
            </p>
            <button className="button-52">
              Sign up for free{" "}
              <span className="text-3xl -translate-y-0.5">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == 'category'].slug.current`

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: {
      slug: product,
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const slug2 = slug.charAt(0).toUpperCase() + slug.slice(1)
  const query = `*["${slug2}" in category[]->title]{_id, 'image': image.asset._ref, name, price, 'slug': slug.current}`
  const products = await client.fetch(query)

  return {
    props: { products, slug },
  }
}

export default Products
