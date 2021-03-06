//All imports
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TextInput,
  Alert,
  Keyboard,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';

//All States
const StartScreen = ({ navigation, route }) => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrc, setDicountPrc] = useState('');
  const [savedAmount, setSavedAmount] = useState('0.00');
  const [finalPrice, setFinalPrice] = useState('0.00');
  const [calError, setCalError] = useState('');
  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    calculateDiscount();
  });
//Method/Function for calculating Discount
  const calculateDiscount = () => {
    if (discountPrc <= 100 && discountPrc >= 0 && originalPrice >= 0) {
      var saved = (originalPrice * discountPrc) / 100;
      var final_Price = originalPrice - saved;
      setSavedAmount(saved.toFixed(2));
      setFinalPrice(final_Price.toFixed(2));
      setCalError('');
    } else if (discountPrc > 100) {
      setCalError('Discount Cannot be greater than 100%');
    } else if (originalPrice < 0 || discountPrc < 0) {
      setCalError("Original Price or Discount Price can't be 0");
    }
  };
//Method/Function for Saving Result
  const saveResult = () => {
    var newResult = {
      originalData: originalPrice,
      discountData: discountPrc,
      finalPriceData: finalPrice,
    };

    setHistory((oldHistory) => [...oldHistory, newResult]);

    setOriginalPrice('');
    setDicountPrc('');
    setFinalPrice('');
  };

//Method/Function for Viewing History
  const viewHistory = () => {
    setModalVisible(true);
  };
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="History"
        color="coral"
        onPress={() =>
          navigation.navigate('History', {
            HistoryList: history,
            HistoryFunction: setHistory,
          })
        }
      />
    ),
  });


//Main Screen
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTexts}> Discount Calulator </Text>
        </View>
      </View>

      <View style={styles.mainView}>
        <TextInput
          keyboardType={'number-pad'}
          value={originalPrice}
          onChangeText={(orgPrice) => setOriginalPrice(orgPrice)}
          style={styles.textFields}
          placeholder={'$ Price'}
        />
        <View style={{ paddingTop: 10 }} />
        <TextInput
          keyboardType={'number-pad'}
          value={discountPrc}
          onChangeText={(discountPercentage) =>
            setDicountPrc(discountPercentage)
          }
          style={styles.textFields}
          placeholder={'% Discount'}
        />
        <View style={{ paddingTop: 20 }} />
        <TouchableOpacity
          onPress={() => calculateDiscount()}
          style={styles.calcBtn}>
          <Text style={styles.calcBtnText}>Calculate</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }} />
        <Text style={{ fontSize: 15, color: 'red' }}>{calError}</Text>
        <View style={{ paddingTop: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.Fprice}> New Price </Text>

          <Text style={styles.Fprice}>Saved money</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.finalPriceText}>{finalPrice}</Text>
          <Text style={[styles.finalPriceText]}> {savedAmount}</Text>
        </View>
        <View style={{ paddingTop: 15 }} />
        <TouchableOpacity onPress={() => saveResult()} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Data</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }} />
        <TouchableOpacity
          onPress={() => viewHistory()}
          style={styles.historyBtn}>
          <Text style={styles.historyBtnText}>View History</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            window.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeading}>Discount History</Text>
              <Text style={styles.firstIndexHistoryText}>
                Actual Price ~ Discount % ~ Discount Price
              </Text>
              <FlatList
                data={history}
                renderItem={({ item }) => {
                  return <Text style={styles.listTextItem}>{item}</Text>;
                }}
                keyExtractor={(index) => {
                  return index;
                }}
              />

              <TouchableOpacity
                style={{ ...styles.closeHistory, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const HistoryScreen = ({ navigation, route }) => {
  const HistoryList = route.params.HistoryList;
  const HistoryFunction = route.params.HistoryFunction;
  const [historyScreenList, setHisScreenList] = useState(HistoryList);

//Method/Function for Clearing History
  const clear = () => {
    Alert.alert(
      'Are you sure!',
      'This will clear all saved history. Do you want to continue?',
      [
        {
          text: 'Yes',
          onPress: () => {
            setHisScreenList([]);
            navigation.setParams(HistoryFunction([]));
          },
        },
        { text: 'No', onPress: () => {} },
      ]
    );
  };

  navigation.setOptions({
    headerRight: () => (
      <Button title="Clear" color="coral" onPress={() => clear()} />
    ),
  });

  const del = (itemIndex) => {
    let tempList = HistoryList.filter((data, index) => index !== itemIndex);
    navigation.setParams(HistoryFunction(tempList));
    setHisScreenList(tempList);
  };
//Data Table with Data Cells
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Index</DataTable.Title>
        <DataTable.Title>Original</DataTable.Title>
        <DataTable.Title>Discount %</DataTable.Title>
        <DataTable.Title numeric>Final Price</DataTable.Title>
        <DataTable.Title></DataTable.Title>
      </DataTable.Header>
      {historyScreenList.map((item, index) => {
        return (
          <DataTable.Row>
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell>{item.originalData}</DataTable.Cell>
            <DataTable.Cell>{item.discountData}</DataTable.Cell>
            <DataTable.Cell>{item.finalPriceData}</DataTable.Cell>
            <DataTable.Cell numeric>
              <Pressable
                onPress={() => del(index)}
                style={{
                  backgroundColor: 'coral',
                  borderRadius: 5,
                  width: 20,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white' }}>X</Text>
              </Pressable>
            </DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};
//Method/Function for Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Start'}
        screenOptions={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: 'green',
          },
        }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// All the styles
const styles = StyleSheet.create({
  header: {
    width: 230,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTexts: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    letterSpacing: 4,

    paddingLeft: 110,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeHistory: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    width: 100,
    height: 30,
    elevation: 2,
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  firstIndexHistoryText: {
    fontSize: 18,
  },

  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textFields: {
    width: '80%',
    borderColor: 'green',
    borderBottomEndRadius: 100,
    borderBottomWidth: 10,
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 20,
    color: 'orange',
    padding: 20,
    marginBottom: 10,
  },
  calcBtn: {
    height: 40,
    width: 120,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    elevation: 2,
  },
  calcBtnText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  Fprice: {
    fontSize: 18,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  finalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingHorizontal: 51,
  },
  saveBtn: {
    height: 35,
    width: 120,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  saveBtnText: {
    fontSize: 22,
    color: 'black',
    backgroundColor: 'white',
    fontWeight: 'bold',
  },

  historyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyBtnText: {
    fontSize: 18,
    color: '#566573',
  },
  listTextItem: {
    fontSize: 18,
  },
});

export default App;
