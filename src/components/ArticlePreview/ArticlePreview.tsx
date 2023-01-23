import React, { useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";

import { format } from "date-fns";
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
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 20 }}>{article.title}</Text>
      <Text style={{ color: "gray" }}>Published at: {formattedDate}</Text>
      <Text style={{ fontSize: 12 }}>{sanitizedDescription}</Text>
    </TouchableOpacity>
  );
};

export default ArticlePreview;
