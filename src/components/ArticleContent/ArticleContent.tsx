import { useMemo } from "react";
import { Text, View } from "react-native";

import { format, formatDistanceToNow } from "date-fns";
import { WebView } from "react-native-webview";
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
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20 }}>{article.title}</Text>
      <Text style={{ color: "gray" }}>{formattedDate} ago</Text>
      <View style={{ backgroundColor: "yellow", flex: 1 }} />
      <Text>{sanitizedContent}</Text>
    </View>
  );
};

export default ArticleContent;
