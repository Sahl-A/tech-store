// import URL from './URL';

// Filter the products based on featured
export const featuredProducts = (data) => data.filter((item) => item.featured);

// Flatten the image url
export const flattenImageUrl = (data) => {
  return data.map((item) => {
    // Using Cloudinary
    // The check (item.image &&) is added when we added the propTypes in Product.js
    let image = item.image && item.image.url;

    // Local setup no deployment
    // let image = `${URL}${item.image.url}`;
    return { ...item, image };
  });
};
