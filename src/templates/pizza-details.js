import { graphql } from "gatsby";
import React from "react";

export default function pizzaDetails({ data }) {
  const { slug, name, description, picture } = data.mdx.frontmatter;
  return (
    <div>
      <h1>Nome: {name}</h1>
      <h1>Descrição: {description}</h1>
      <img src={picture} />
    </div>
  );
}

export const query = graphql`
  query PizzaPage($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        slug
        name
        picture
        value_b
        value_p
        value_m
        value_f
        description
      }
    }
  }
`;
