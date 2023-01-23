import { useMemo } from "react";

import { formatDistanceToNow } from "date-fns";
import { Box, Heading, Text } from "native-base";
import sanitizeHtml from "sanitize-html";

import { Article } from "../../types/news";

type ArticleContentProps = {
  article: Article;
};

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const formattedDate = useMemo(
    () => formatDistanceToNow(article.publishedAt),
    [article.publishedAt]
  );

  const sanitizedContent = useMemo(
    () => sanitizeHtml(article.content),
    [article.content]
  );

  return (
    <Box m={6}>
      <Heading size="md" mb={2}>
        {article.title}
      </Heading>
      <Text fontSize="xs" color="gray.500">
        {formattedDate} ago
      </Text>
      <Text mt={4}>{sanitizedContent}</Text>
    </Box>
  );
};

export default ArticleContent;
