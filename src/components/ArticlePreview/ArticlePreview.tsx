import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

import { format } from "date-fns";
import { Box, Heading, Text } from "native-base";
import sanitizeHtml from "sanitize-html";

import { Article } from "../../types/news";

type ArticlePreviewProps = {
  article: Article;
  onPress: () => void;
};

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  article,
  onPress
}) => {
  const formattedDate = useMemo(
    () => format(article.publishedAt, "yyyy-MM-dd"),
    [article.publishedAt]
  );

  const sanitizedDescription = useMemo(
    () =>
      sanitizeHtml(article.description, {
        allowedTags: []
      }),
    [article.description]
  );

  return (
    <Box
      borderColor="coolGray.200"
      borderWidth={1}
      marginX={6}
      marginY={2}
      padding={6}
      borderRadius={5}
    >
      <TouchableOpacity onPress={onPress}>
        <Heading size="md">{article.title}</Heading>
        <Text fontSize="xs" color="gray.500">
          Published at: {formattedDate}
        </Text>
        <Text fontWeight="400">{sanitizedDescription}</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default ArticlePreview;
