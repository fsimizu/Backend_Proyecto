import Assert from "assert";
import chai from "chai";
import { UserModel } from '../src/dao/factory.js';
import session from 'supertest-session'

const assert = Assert.strict;
const userModel = new UserModel();
const expect = chai.expect;
const testSession = session(app);

//GRUPO DE TESTS. DESCRIPCION GENERAL.
describe("Testing the User model", () => {

    it("should return all the users", async () => {
        const users = await userModel.getUsers();
        expect(Array.isArray(users)).to.be.ok;
        expect(users).to.be.an("array");
    });

    it("should create a user", async () => {
        const newUser = {
            firstName: "Pepe",
            lastName: "Perez",
            email: "pepe@perez.com",
            password: "@1At3@",
        };
        const usuarioCreado = await userModel.createUsers(newUser);
        expect(usuarioCreado._id).to.be.ok;
    });

    it("should delete the user created", async () => {
        const email = "pepe@perez.com";
        const { _id } = await userModel.getUserByEmail(email);
        const user = await userModel.deleteUsers({ _id })
        expect(user).to.be.an("object");
    });
})