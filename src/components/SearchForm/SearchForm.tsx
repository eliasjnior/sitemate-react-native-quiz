import { useState } from "react";
import {
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

import { useQuery } from "react-query";

import searchNewsService, {
  SearchNewsResult
} from "../../services/search-news";
import { Article } from "../../types/news";
import ArticleContent from "../ArticleContent/ArticleContent";
import ArticlePreview from "../ArticlePreview/ArticlePreview";

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("Apple");
  const [fromDate, setFromDate] = useState(new Date());

  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isFetching, data, isError, error, refetch } = useQuery<
    SearchNewsResult,
    Error,
    SearchNewsResult
  >(["search", searchTerm, fromDate], () =>
    searchNewsService({
      searchTerm,
      fromDate
    })
  );

  const onSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal visible={isModalOpen}>
        <SafeAreaView>
          <ScrollView>
            {selectedArticle && <ArticleContent article={selectedArticle} />}
            <TouchableOpacity
              onPress={onCloseModal}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "black",
                margin: 10
              }}
            >
              <Text>Close article</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <ScrollView
        contentContainerStyle={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        {isError && <Text>{error.message}</Text>}
        {isFetching && <Text>Loading...</Text>}
        {data &&
          data.articles.map((article) => (
            <ArticlePreview
              key={article.title + article.publishedAt.toISOString()}
              article={article}
              onPress={() => onSelectArticle(article)}
            />
          ))}
      </ScrollView>
    </>
  );
};

export default SearchForm;
