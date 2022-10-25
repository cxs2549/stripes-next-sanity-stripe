export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        auto: true,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "category" },
            // etc
          ],
        },
      ],
    },
  ],
}
