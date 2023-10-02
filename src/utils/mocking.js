import { faker } from '@faker-js/faker';

export const createMockProducts = (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            price: faker.commerce.price({ min: 1000, max: 10000 }),
            thumbnail: faker.image.urlLoremFlickr({ category: 'food' }),
            code: faker.string.uuid(),
            stock: faker.commerce.price({ min: 0, max: 20, dec: 0 }),
        });
    }
    return res.json({ products })
}