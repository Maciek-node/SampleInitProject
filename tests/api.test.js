import pkg from "pactum";
const { spec } = pkg;
import { expect } from "chai";
import { baseUrl, userID, userName, secretPassword } from "../helpers/data.js";

let token;
const isbn = "9781449325862";

describe("Api tests", () => {
  it.skip("first test", async () => {
    const response = await spec().get(`${baseUrl}/BookStore/v1/Books`);
    expect(response.body.books[0].title).to.eql("Git Pocket Guide");
    expect(response.statusCode).to.eql(200);

    //sprawdz czy ksiazka You dnot know JS ma odpowiedniego autor
    // expect(response.books).
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
  });

  it.skip("Create account", async () => {
    const response = await spec().post(`${baseUrl}/Account/v1/User`).withBody({
      userName: userName,
      password: secretPassword,
    });
    expect(response.statusCode).to.eql(201);
  });

  it("Generate token", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/GenerateToken`)
      .withBody({
        userName: userName,
        password: secretPassword,
      });
    expect(response.statusCode).to.eql(200);
    token = response.body.token;
  });

  it.skip("Authorized test", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/Authorized`)
      .withBody({
        userName: userName,
        password: secretPassword,
      });
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.eql(true);
  });

  it.skip("Get my books", async () => {
    const response = await spec()
      .post(`${baseUrl}/BookStore/v1/Books?ISBN=${isbn}`)
      .withBearerToken(token);
    expect(response.statusCode).to.eql(201);
    expect(response.body.books.isbn).to.eql(isbn);
  });

  it("Get Add Books", async () => {
    const response = await spec()
      .post(`${baseUrl}/BookStore/v1/Books`)
      .withBearerToken(token)
      .withBody({
        userId: userID,
        collectionOfIsbns: [
          {
            isbn: isbn,
          },
        ],
      });
    expect(response.statusCode).to.eql(201);
    expect(response.body.books[0].isbn).to.eql(isbn);
  });

  it("Get User id", async () => {
    const response = await spec()
      .get(`${baseUrl}/Account/v1/User/${userID}`)
      .withBearerToken(token);
    expect(response.statusCode).to.eql(200);
    expect(response.body.username).to.eql(userName);
    expect(response.body.books[0].isbn).to.eql(isbn);
  });

  it("Check that user added Book", async () => {
    const response = await spec()
      .get(`${baseUrl}/Account/v1/User/${userID}`)
      .withBearerToken(token);
    expect(response.statusCode).to.eql(200);
    expect(response.body.username).to.eql(userName);
    expect(response.body.books[0].isbn).to.eql(isbn);
  });

  it("Remove added books from user", async () => {
    const response = await spec()
      .delete(`${baseUrl}/BookStore/v1/Book`)
      .withBearerToken(token)
      .withBody({
        isbn: isbn,
        userId: userID,
      });
    expect(response.statusCode).to.eql(204);
  });

  it("Get Add Books", async () => {
    const response = await spec()
      .post(`${baseUrl}/BookStore/v1/Books`)
      .withBearerToken(token)
      .withBody({
        userId: userID,
        collectionOfIsbns: [
          {
            isbn: isbn,
          },
        ],
      });
    expect(response.statusCode).to.eql(201);
    expect(response.body.books[0].isbn).to.eql(isbn);
  });

  it("Remove added books from user", async () => {
    const response = await spec()
      .delete(`${baseUrl}/BookStore/v1/Books?UserId=${userID}`)
      .withBearerToken(token)
      .withBody();
    expect(response.statusCode).to.eql(204);
  });
});
