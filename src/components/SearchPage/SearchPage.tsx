import { useState } from "react";
import { Modal, RefreshControl, SafeAreaView, ScrollView } from "react-native";

import { Box, Button, Text } from "native-base";
import { useQuery } from "react-query";

import searchNewsService, {
  SearchNewsResult
} from "../../services/search-news";
import { Article } from "../../types/news";
import ArticleContent from "../ArticleContent/ArticleContent";
import ArticlePreview from "../ArticlePreview/ArticlePreview";
import LoadingStack from "../LoadingStack/LoadingStack";
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
          <Button m={6} onPress={onCloseModal}>
            Close article
          </Button>
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
        {isError && (
          <Box mx={6}>
            <Text color="red.500">{error.message}</Text>
          </Box>
        )}
        {isFetching && <LoadingStack />}
        {data && data.articles.length === 0 && (
          <Box mx={6}>
            <Text textAlign="center">Sorry, no results found</Text>
          </Box>
        )}
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
