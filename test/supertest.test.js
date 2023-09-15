import chai from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

const expect = chai.expect;
const requester = supertest('http://localhost:3000');

describe('Testing APIs', () => {
    describe('Testing the PRODUCTS endpoint', () => {
        let cookieName;
        let cookieValue;
        const mockProduct = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            code: faker.string.uuid(),
            price: faker.commerce.price({ min: 1000, max: 10000 }),
            thumbnail: faker.image.urlLoremFlickr({ category: 'food' }),
            stock: 10,
        };

        it('a GET to the endpoint /api/products should return all products', async () => {
            const response = await requester.get('/api/products');
            const { status, ok, _body } = response;
            expect(status).to.equal(200);
            expect(_body.message).to.be.equal("list of products");
            expect(_body.payload).to.be.an("array");
        });

        it('a POST to the endpoint /api/products should create a product', async () => {
            const responseSession = await requester.post('/auth/login').send({ email: "fersimizu@gmail.com", password: "1234" });
            const cookie = responseSession.headers['set-cookie'][0];
            cookieName = cookie.split('=')[0];
            cookieValue = cookie.split('=')[1];

            const response = await requester.post('/api/products').set('Cookie', [`${cookieName}=${cookieValue}`]).send(mockProduct);
            const { status, ok, _body } = response;
            mockProduct._id = _body.payload._id
            expect(status).to.equal(201);
            expect(_body.msg).to.be.equal("Product created");
            expect(_body.payload).to.be.an("object");
        });

        it('a GET to the endpoint /api/products/:pid should return the product with id==pid', async () => {
            const response = await requester.get('/api/products/' + mockProduct._id);
            const { status, ok, _body } = response;
            expect(status).to.equal(200);
            expect(_body.msg).to.be.equal("Product found");
            expect(_body.payload).to.be.an("object");
            expect(_body.payload._id).to.be.equal(mockProduct._id);
        });
    });

    describe('Testing the CART endpoint', () => {
        let mockCart;

        it('a POST to the endpoint /api/carts should create a cart', async () => {
            const response = await requester.post('/api/carts');
            const { status, ok, _body } = response;
            mockCart = _body.payload
            expect(status).to.equal(201);
            expect(_body.msg).to.be.equal("cart created");
            expect(_body.payload).to.ok;
        });
        it('a DELETE to the endpoint /api/carts/:cid should empty the cart with id==cid', async () => {
            const response = await requester.delete('/api/carts/' + mockCart._id);
            const { status, ok, _body } = response;
            expect(status).to.equal(200);
            expect(_body.msg).to.be.equal("The cart is now empty");
            expect(_body.payload).to.ok;
        });
    })

    describe('Testing the SESSION endpoint', () => {
        let cookieName;
        let cookieValue;
        const mockUser = {
            firstName: 'Maximo',
            lastName: 'Lorenzo',
            email: faker.internet.email(),
            password: '123',
        };

        it('a POST to the endpoint /auth/register should register a new user', async () => {
            const response = await requester.post('/auth/register').send(mockUser)
            const cookie = response.headers['set-cookie'][0]
            cookieName = cookie.split('=')[0];
            cookieValue = cookie.split('=')[1];
            expect(cookieName).to.be.ok;
            expect(cookieValue).to.be.ok;
        });

        it('a POST to the endpoint /auth/login should log in the user', async () => {
            const response = await requester.post('/auth/login').send(
                {
                    email: mockUser.email,
                    password: mockUser.password
                }
            )
            const cookie = response.headers['set-cookie'][0]
            cookieName = cookie.split('=')[0];
            cookieValue = cookie.split('=')[1];
            expect(cookieName).to.be.ok;
            expect(cookieValue).to.be.ok;
        });
    })


})
