import { useMemo } from "react";
import { Text, View } from "react-native";

import { format } from "date-fns";
import sanitizeHtml from "sanitize-html";

import { Article } from "../../types/news";

type ArticleContentProps = {
  article: Article;
};

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const formattedDate = useMemo(
    () => format(article.publishedAt, "yyyy-MM-dd"),
    [article.publishedAt]
  );

  const sanitizedContent = useMemo(
    () => sanitizeHtml(article.content),
    [article.content]
  );

  return (
    <View>
      <Text style={{ fontSize: 20 }}>{article.title}</Text>
      <Text style={{ color: "gray" }}>Published at: {formattedDate}</Text>
      <Text style={{ fontSize: 12 }}>{sanitizedContent}</Text>
    </View>
  );
};

export default ArticleContent;
