import type { HydratedDocument, Query } from "mongoose";
``;
export default class APIFilters<T> {
  public query: Query<HydratedDocument<T>[], HydratedDocument<T>>;
  private queryString: any;

  constructor(
    query: Query<HydratedDocument<T>[], HydratedDocument<T>>,
    queryString: any,
  ) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    let queryStringCopy = { ...this.queryString };
    const excludedFields = ["sort", "page"];
    excludedFields.forEach((field) => delete queryStringCopy[field]);

    // mora da se doda $ znak
    queryStringCopy = JSON.stringify(queryStringCopy);
    queryStringCopy = JSON.parse(
      queryStringCopy.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (match: string) => `$${match}`,
      ),
    );

    // sad mutiraj queryString
    this.query = this.query.find(queryStringCopy);

    return this;
  }
  sort() {
    if (!this.queryString.sort) {
      return this;
    }
    // treba da se sortira
    const sortBy = this.queryString.sort || "price";
    this.query = this.query.sort(sortBy);

    return this;
  }
  pagination() {
    const numberOfDataPerPage = 10;
    const { page } = this.queryString;
    const skip = (page - 1) * numberOfDataPerPage;

    if (!page) {
      return this;
    }

    this.query = this.query.skip(skip).limit(numberOfDataPerPage);

    return this;
  }
}
