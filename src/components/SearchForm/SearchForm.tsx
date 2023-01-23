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
import SearchFields, { SearchFormData } from "../SearchFields/SearchFields";

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>();

  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isFetching, data, isError, error, refetch } = useQuery<
    SearchNewsResult,
    Error,
    SearchNewsResult
  >(
    ["search", formData],
    () =>
      searchNewsService({
        searchTerm: formData.searchTerm,
        fromDate: formData.fromDate,
        sortBy: formData.sortBy,
        pageSize: formData.pageSize,
        page: formData.page
      }),
    {
      enabled: !!formData
    }
  );

  const shouldShowLoadingIndicator = isFetching && !isLoading;

  const onSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSearch = (searchFormData: SearchFormData) => {
    setFormData(searchFormData);
  };

  return (
    <>
      <Modal visible={isModalOpen}>
        <SafeAreaView style={{ flex: 1 }}>
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
          <ScrollView style={{ flex: 1 }}>
            {selectedArticle && <ArticleContent article={selectedArticle} />}
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <SearchFields onSearch={onSearch} />
      <ScrollView
        contentContainerStyle={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl
            refreshing={shouldShowLoadingIndicator}
            onRefresh={refetch}
          />
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
