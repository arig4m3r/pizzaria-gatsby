const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            name
            picture
            value_b
            value_p
            value_m
            value_f
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  // Create blog post pages.
  const pizzas = result.data.allMdx.nodes;

  // you'll call `createPage` for each result
  pizzas.forEach((node) => {
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: `/pizzas/${node.frontmatter.slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: path.resolve("./src/templates/pizza-details.js"),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};
