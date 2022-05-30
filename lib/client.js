import sanityClient  from "@sanity/client"
import  imageUrlBuilder  from "@sanity/image-url"


export const client = sanityClient({
    projectId: 'l4xh27rl',
    dataset:'production',
    apiVersion:'2022-05-29',
    useCdn:true,
    token:'sk8mIkAi3XIx1KTr4ZdZKqx59A7nJfHRbmrp2YVcijZ7LwCuKp3VjonfwimkmKZWpWDpJcQ8y9WihQ71ra1qjeoz6FTkjdwVvAwHqOwP0yi30bwTiK9tEubENE831Y2tAa7phy0H5RJ7b73RjgfK4ujFkj6uyplh8rwCm8fzPqa4BYklI9Zt', 
});


const builder = imageUrlBuilder(client);

export const urlFor = (source)=> builder.image(source);