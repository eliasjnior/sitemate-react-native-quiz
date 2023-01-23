import { Button, TextInput, View } from "react-native";

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
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchFormData>({
    defaultValues: {
      searchTerm: "",
      sortBy: "relevancy",
      pageSize: 10,
      page: 1
    }
  });

  const onSubmit = (data: SearchFormData) => {
    console.log(data);
    onSearch(data);
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="searchTerm"
      />
      <Button title="Search" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default SearchFields;
