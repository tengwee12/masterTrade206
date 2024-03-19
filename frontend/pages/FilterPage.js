import { View, TextInput, Pressable, Text, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GestureRecognizer from "react-native-swipe-gestures";
import Slider from "@react-native-community/slider";
import { useState, useEffect } from "react";
import PlumberFilterItem from "../components/PlumberFilterItem";
import PurpleButton from "../components/PurpleButton";

export default function FilterPage({ route }) {
  const { searchBar, plumberList } = route.params;
  const [search, setSearch] = useState(searchBar || "");
  const [plumberData, setPlumberData] = useState(plumberList);
  const [filteredList, setFilteredList] = useState([]);
  const [filterByLicense, setFilterByLicense] = useState(false);
  const [filterByRatingModalVisible, setFilterByRatingModalVisible] =
    useState(false);
  const [minRating, setMinRating] = useState(0);
  const [filterByServiceModalVisible, setFilterByServiceModalVisible] =
    useState("");
  const [filterByService, setFilterByService] = useState("");

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

    if (minRating > 0) {
      filterResults = filterResults?.filter(
        (plumber) => plumber.averageRating >= minRating
      );
    }

    if (filterByService.length > 0) {
      filterResults = filterResults?.filter((plumber) =>
        plumber.services.some((service) =>
          service.name.toLowerCase().includes(filterByService.toLowerCase())
        )
      );
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
      <View className="flex flex-row px-3">
        <Pressable
          className={`${
            filterByLicense ? "border border-white" : "bg-white"
          } p-3 rounded`}
          onPress={() => {
            filterPlumbers();
            setFilterByLicense((filterByLicense) => !filterByLicense);
          }}
        >
          <Text className={filterByLicense ? "text-white" : ""}>License</Text>
        </Pressable>
        <Pressable
          className={`${
            minRating > 0 ? "border border-white" : "bg-white"
          } p-3 rounded ml-3`}
          onPress={() => setFilterByRatingModalVisible(true)}
        >
          <Text className={minRating > 0 ? "text-white" : ""}>
            {minRating > 0 ? `Rating >${minRating.toFixed(1)}` : "Min Rating"}
          </Text>
        </Pressable>

        <Pressable
          className={`${
            filterByService.length > 0 ? "border border-white" : "bg-white"
          } p-3 rounded ml-3`}
          onPress={() => setFilterByServiceModalVisible(true)}
        >
          <Text className={filterByService.length > 0 ? "text-white" : ""}>
            {filterByService.length > 0 ? filterByService : "Service"}
          </Text>
        </Pressable>

        <Pressable
          className="bg-white p-3 rounded ml-3"
          onPress={() => {
            setFilterByLicense(false);
            setFilterByService("");
            setMinRating(0);
          }}
        >
          <Text>Reset</Text>
        </Pressable>

        <GestureRecognizer
          onSwipeDown={() => setFilterByServiceModalVisible(false)}
        >
          <Modal
            visible={filterByServiceModalVisible}
            animationType="slide"
            transparent={true}
          >
            <View className="absolute bottom-0 bg-white w-screen p-5 drop-shadow-lg">
              <Text className="text-lg font-bold">Filter By Service:</Text>
              <Picker
                selectedValue={filterByService}
                onValueChange={(itemValue) => setFilterByService(itemValue)}
              >
                <Picker.Item label="Sink" value="Sink" />
                <Picker.Item label="Toilet" value="Toilet" />
                <Picker.Item label="Heater" value="Heater" />
                <Picker.Item label="Pipe" value="Pipe" />
              </Picker>
              <PurpleButton
                text="Apply"
                onPress={() => {
                  setFilterByServiceModalVisible(false);
                  filterPlumbers();
                }}
              />
            </View>
          </Modal>
        </GestureRecognizer>

        <GestureRecognizer
          onSwipeDown={() => setFilterByRatingModalVisible(false)}
        >
          <Modal
            visible={filterByRatingModalVisible}
            animationType="slide"
            transparent={true}
          >
            <View className="absolute bottom-0 bg-white w-screen p-5 drop-shadow-lg">
              <Text className="text-lg font-bold">Minimum Rating:</Text>
              <Text>{minRating.toFixed(1)}</Text>
              <Slider
                minimumValue={0}
                lowerLimit={0}
                maximumValue={5}
                upperLimit={5}
                step={0.1}
                value={minRating}
                onValueChange={setMinRating}
              />
              <PurpleButton
                text="Apply"
                onPress={() => {
                  setFilterByRatingModalVisible(false);
                  filterPlumbers();
                }}
              />
            </View>
          </Modal>
        </GestureRecognizer>
      </View>
      <View className="px-3 mt-8">
        {filteredList.map((p) => (
          <PlumberFilterItem key={p.id} plumber={p} />
        ))}
      </View>
    </View>
  );
}
