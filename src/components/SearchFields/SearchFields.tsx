import { Box, Button, Input } from "native-base";
import { Controller, useForm } from "react-hook-form";

type SearchFieldsProps = {
  onSearch: (data: SearchFormData) => void;
};

export type SearchFormData = {
  searchTerm: string;
  sortBy: "relevancy" | "popularity" | "publishedAt";
  fromDate?: Date;
  pageSize: number;
  page: number;
};

const SearchFields: React.FC<SearchFieldsProps> = ({ onSearch }) => {
  const { control, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      searchTerm: "",
      sortBy: "relevancy",
      pageSize: 10,
      page: 1
    }
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data);
  };

  return (
    <Box margin={6}>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            size="xl"
            placeholder="Type the term you want to search"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="searchTerm"
      />
      <Button onPress={handleSubmit(onSubmit)} marginTop={3}>
        Search
      </Button>
    </Box>
  );
};

export default SearchFields;
