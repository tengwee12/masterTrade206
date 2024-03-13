import { View, TextInput, Pressable, Text, Modal } from "react-native";
import { useState, useEffect } from "react";
import PlumberFilterItem from "../components/PlumberFilterItem";

export default function FilterPage({ route }) {
  const { searchBar, plumberList } = route.params;
  const [search, setSearch] = useState(searchBar || "");
  const [plumberData, setPlumberData] = useState(plumberList);
  const [filteredList, setFilteredList] = useState([]);
  const [filterByLicense, setFilterByLicense] = useState(false);
  const [filterByPriceModalVisible, setFilterByPriceModalVisible] = useState(false);

  const filterPlumbers = () => {
    let filterResults = plumberData;

    if (search) {
      filterResults = filterResults.filter((plumber) =>
        plumber.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterByLicense) {
      filterResults = filterResults?.filter((plumber) => plumber.license);
    }

    console.log("filtered:", filterResults);
    setFilteredList(filterResults);
  };

  useEffect(() => {
    filterPlumbers();
  }, []);

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-32 bg-brandPurple"></View>
      <TextInput
        className="bg-white m-3 p-4 rounded"
        onChangeText={setSearch}
        value={search}
        placeholder="Search"
        onKeyPress={filterPlumbers}
      />
      <View className="flex flex-row">
        <Pressable
          className={`${filterByLicense ? "bg-green" : "bg-white"} p-3 rounded`}
          onPress={() => {
            filterPlumbers();
            setFilterByLicense((filterByLicense) => !filterByLicense);
          }}
        >
          <Text>License</Text>
        </Pressable>
        <Pressable className="bg-white p-3 rounded" onPress={() => setFilterByPriceModalVisible(true)}>
          <Text>Complex Filter</Text>
        </Pressable>
        <Modal
            visible={filterByPriceModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"

        >
        </Modal>
      </View>
      <View className="px-3">
        {filteredList.map((p) => (
          <PlumberFilterItem key={p.id} plumber={p} />
        ))}
      </View>
    </View>
  );
}
