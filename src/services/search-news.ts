import { format } from "date-fns";

import { Article } from "../types/news";
import api from "./api";

type SearchNewsApiResultArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type SearchNewsApiResultSuccess = {
  status: "ok";
  totalResults: number;
  articles: SearchNewsApiResultArticle[];
};

type SearchNewsApiResultError = {
  status: "error";
  code: string;
  message: string;
};

type SearchNewsParams = {
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  fromDate: Date;
  searchTerm: string;
  pageSize?: number;
  page?: number;
};

export type SearchNewsResult = {
  totalResults: number;
  articles: Article[];
  page: number;
  pageSize: number;
};

const searchNewsService = async ({
  sortBy = "relevancy",
  fromDate,
  searchTerm,
  pageSize = 10,
  page = 1,
}: SearchNewsParams): Promise<SearchNewsResult> => {
  if (pageSize < 1) {
    throw new Error("Invalid page size");
  }

  if (page < 1) {
    throw new Error("Invalid page number");
  }

  if (!searchTerm) {
    throw new Error("Invalid search term");
  }

  const { data } = await api.get<
    SearchNewsApiResultSuccess | SearchNewsApiResultError
  >("/everything", {
    params: {
      sortBy,
      from: format(fromDate, "yyyy-MM-dd"),
      q: searchTerm,
      pageSize,
      page,
    },
  });

  if (data.status === "error") {
    throw new Error(data.message);
  }

  return {
    totalResults: data.totalResults,
    articles: data.articles.map((article) => ({
      ...article,
      publishedAt: new Date(article.publishedAt),
    })),
    page,
    pageSize,
  };
};

export default searchNewsService;
